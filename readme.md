# canvas testbed

#### deprecation warning

This module is bloated and a little too magical. Instead, some of the following are recommended:

- [canvas-fit-loop](https://www.npmjs.com/package/canvas-fit-loop)
- [2d-context](https://www.npmjs.com/package/2d-context)
- [webgl-context](https://www.npmjs.com/package/webgl-context)

---

For visual apps, this is a simple module to get your demos and prototypes up and running. Ideal for use with Beefy. When the [DOM content is ready](https://www.npmjs.org/package/domready), it does the following:

- Clear the body margins to zero
- Set the body overflow to hidden
- Adds a canvas element to the body (tag ID: 'canvas')
- Listen for window resizes and set the canvas to the new size
- Provides a minimal render loop that also gives you delta time

It also includes a [requestAnimationFrame polyfill](https://www.npmjs.org/package/raf.js)

# api


```js
testbed( [onRender], [onStart], [options] )
testbed( [onRender], [options] )
```

Example:
```js
var test = require('canvas-testbed');

//called every frame
function render(context, width, height) {
	context.clearRect(0, 0, width, height);
	context.fillRect(250, 150, 200, 100);
}

//setup the testbed
test(render, {
	once: true
});
```

See the `demo` folder for a couple other examples.

All parameters are optional. Without a `render` function the requestAnimationFrame will not be fired.

# options

More may be added later, like unified touch/mouse handling for simple interactive demos, or simple scaling for retina screens. For now:

- `context` a string, "2d" or "webgl"
- `contextAttributes` the attributes to be passed when creating the context
- `once` only fire the render frame once, and then again when the window is resized (to avoid the canvas clearing completely)
- `ignoreResize` to ignore resize events; by default this is false, and the canvas is scaled to the window size
- `onResize` a callback for after the canvas has been resized; will not be called if the resize event is ignored
- `width`, `height` to specifiy an explicit width or height of the canvas. if either is specified, the resize events will be ignored.

You can also pass any of the options of [canvas-app](https://www.npmjs.org/package/canvas-app), which this module builds on. 

# testing with beefy

First install beefy:

```npm i beefy -g```

Then run the demo:

```beefy demo/demo-2d.js --live```

And open up `localhost:9966` in your browser. 