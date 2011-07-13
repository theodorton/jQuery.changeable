# jQuery Changeable Plugin
Hide your form fields and make users edit by double-clicking a value label instead.

## Example

```html
<form id="my-form">
  <input type="text" name="username" value="User name" />
</form>
```

```javascript
$('form#my-form input').changeable();
```

## Options
- __editBehaviour__: can be any event type (click, mouseover) that jQuery handles (default: dblclick)
- __helperText__: the text that will be displayed when the mouse hovers over the value (default: Doubleclick to edit.)
- __notifierClass__: a CSS class that will (initially be hidden) and showed when a user changes a field (default: null)
- __saveOnEnter__: saves the field when the user presses enter key, if set to false enter will not do anything (default: true)

## License
You may use this plugin for any non-commercial projects.

Please feel free to contact me if you want to use this in commercial projects.