/*!
 * jQuery Changeable Plugin
 * http://www.github.com/theodorton
 *
 * Copyright 2011, Theodor Tonum
 * Free for non-commercial use.
 */
(function($) {
    $.fn.changeable = function(overrides) {
        var defaults = {
            contentType: 'text', // Can be text, link, picture
            editBehaviour: 'dblclick', // Can be any event
            helperText: 'Double-click to edit',
            notifierClass: null,
            saveOnEnter: true
        };
        var options = $.extend(defaults, overrides);

        return this.filter('input').each(function() {
            $this = $(this);
            
            // Wrap around helper elements
            $this.wrap('<div class="changable-container" />')
                 .after(
                     $('<div class="field-value" />')
                     .html($this.attr('value'))
                     .attr('title', options.helperText)
                 )
                 .wrap('<div class="field-input" />'); 
            
            // Set styles and display
            $changableContainer = $this.parent().parent();
            $changableContainer.css('display', 'inline').children('div').css('display', 'inline');
            $changableContainer.children('div.field-value').css('cursor', 'pointer');
            $changableContainer.children('div.field-input').hide();
            
            // Visual feedback
            $changableContainer.children('div.field-value').hover(function(){
                $(this).css('background-color', '#dddddd');
            }, function(){
                $(this).css('background-color', '#ffffff');
            });
            
            // Editing text
            $changableContainer.children('div.field-value').bind(options.editBehaviour, function(){
                $input = $(this).parent().children('div.field-input').show().children('input');
                $input.focus();
                $(this).hide();
            });
            
            // Saving text (blur)
            $changableContainer.find('input').blur(function(){
                $fieldValue = $(this).parent().siblings('div.field-value');
                $fieldValue.html(this.value);
                $fieldValue.show();
                $(this).parent().hide();
            });
            
            // Notify user
            if (options.notifierClass !== null) {
                $changableContainer.find('input').blur(function(){
                    if ($(this).attr('data-saved-value') != $(this).val()) {
                        $('.' + options.notifierClass).show();
                    }
                });
                
                $('.' + options.notifierClass).hide();
            }
            
            // Pressing enter to save
            if (options.saveOnEnter === true) {
                $changableContainer.find('input').keyup(function(e){
                    if(e.keyCode == 13) { $(this).blur(); }
                });
            }
            
            // Preserving value / restoring
            
            // Saving the value
            $changableContainer.children('div.field-value').bind(options.editBehaviour, function(){
                $input = $(this).parent().children('div.field-input').show().children('input');
                $input.attr('data-saved-value', $input.val());
            });
                                                           
            // Pressing escape to cancel
            $changableContainer.find('input').keyup(function(e){
                if(e.keyCode == 27) {
                    $(this).attr('value', $(this).attr('data-saved-value'));
                    $(this).blur();
                }
            });
        });
    };
})(jQuery);