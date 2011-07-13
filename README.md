# jQuery Changeable Plugin
Hide your form fields and make users edit by double-clicking a value label instead.


## Example #1

__HTML:__

```html
<form id="my-form">
  <input type="text" name="username" value="User name" />
</form>
```
__JAVASCRIPT:__

```javascript
$(document).ready(function(){
  $('form#my-form input').changeable();
});
```

## Example #2 (with options)

__HTML:__

```html
<form id="my-form">
  <input type="text" name="username" value="User name" class="changeable" />
  
  <div class="notify-on-save">
    <p>
      Looks like you've made som edits!
      <input type="submit" value="Click here to save">
    </p>
  </div>
</form>
```

__JAVASCRIPT:__

```javascript
$(document).ready(function(){
  $('.changeable').changeable({
    editBehaviour: 'click',
    helperText:    'Click to edit this field! Then click outside to save.',
    notifierClass: 'notify-on-save',
    saveOnEnter:   false
  });
});
```


## Options
### editBehaviour (default: 'dblclick')
Can be any event type (click, mouseover) that jQuery bind() handles.

### helperText (default: 'Doubleclick to edit.')
The text that will be displayed when the mouse hovers over the value.

### notifierClass (default: null)
A CSS class that will (initially be hidden) and showed when a user changes a field.

### saveOnEnter (default: true)
Saves the field when the user presses enter key, if set to false enter will not do anything.


## License
You may use this plugin for any non-commercial projects.

Please feel free to contact me if you want to use this in commercial projects.