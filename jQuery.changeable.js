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
            // Pass any event
            editBehaviour: 'dblclick',
            // Pass a helper text
            helperText: 'Double-click to edit',
            // Pass a classname that will be displayed on edit
            notifierClass: null,
            // Saves the field on enter (doesn't push to server)
            saveOnEnter: true
        };
        var options = $.extend(defaults, overrides);

        return this.filter('input').each(function() {
            $this = $(this);

            // Wrap around helper elements
            $this.wrap('<div class="changable-container" />').after(
            $('<div class="field-value" />').html($this.attr('value')).attr('title', options.helperText)).wrap('<div class="field-input" />');

            // Set styles and display
            $changeableContainer = $this.parent().parent();
            $changeableContainer.css('display', 'inline').children('div').css('display', 'inline');
            $changeableContainer.children('div.field-value').css('cursor', 'pointer');
            $changeableContainer.children('div.field-input').hide();

            // Visual feedback
            $changeableContainer.children('div.field-value').hover(function() {
                $(this).css('background-color', '#dddddd');
            }, function() {
                $(this).css('background-color', 'inherit');
            });

            // Editing text
            $changeableContainer.children('div.field-value').bind(options.editBehaviour, function() {
                $input = $(this).parent().children('div.field-input').show().children('input');
                $input.focus();
                $(this).hide();
            });

            // Saving text (blur)
            $changeableContainer.find('input').blur(function() {
                $fieldValue = $(this).parent().siblings('div.field-value');
                $fieldValue.html(this.value);
                $fieldValue.show();
                $(this).parent().hide();
            });

            // Notify user
            if (options.notifierClass !== null) {
                $changeableContainer.find('input').blur(function() {
                    if ($(this).attr('data-saved-value') != $(this).val()) {
                        $('.' + options.notifierClass).show();
                    }
                });

                $('.' + options.notifierClass).hide();
            }

            // Pressing enter to save
            if (options.saveOnEnter === true) {
                $changeableContainer.find('input').keydown(function(e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        $(this).blur();
                    }
                });
            }

            // Preserving value / restoring
            // Saving the value
            $changeableContainer.children('div.field-value').bind(options.editBehaviour, function() {
                $input = $(this).parent().children('div.field-input').show().children('input');
                $input.attr('data-saved-value', $input.val());
            });

            // Pressing escape to cancel
            $changeableContainer.find('input').keyup(function(e) {
                if (e.keyCode == 27) {
                    $(this).attr('value', $(this).attr('data-saved-value'));
                    $(this).blur();
                }
            });
        });
    };
})(jQuery);