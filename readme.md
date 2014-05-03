# canvas testbed

For visual apps, this is a simple module to get your demos and prototypes up and running. Ideal for use with Beefy. When the [DOM content is ready](https://www.npmjs.org/package/domready), it does the following:

- Shim in [requestAnimationFrame polyfill](https://www.npmjs.org/package/raf.js)
- Clear the body margins to zero
- Set the body overflow to hidden
- Adds a canvas element to the body
- The canvas element resizes to the window size
- Provides a minimal render loop that also gives you delta time

# api

```
var test = require('canvas-testbed');

//called every frame
function render(context, width, height) {
	context.clearRect(0, 0, width, height);
	context.fillRect(250, 150, 200, 100);
}

//setup the testbed
test( render );
```

# example

See the `demo` folder for a couple other examples.

All parameters are optional. Without a `render` function the requestAnimationFrame will not be fired.

# options

More may be added later, like unified touch/mouse handling for simple interactive demos. For now:

- `context` a string, "2d" or "webgl"
- `contextAttributes` the attributes to be passed when creating the context

# testing with beefy

First install beefy:

```npm i beefy -g```

Then run the demo:

```beefy demo/demo-2d.js --live```

And open up `localhost:9966` in your browser. 