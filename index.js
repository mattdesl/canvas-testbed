var domready = require('domready');
require('raf.js');

var CanvasApp = require('canvas-app');

module.exports = function( render, start, options ) {
	domready(function() {
		//options were provided as the first argument, no render handler
		if (typeof render === "object" && render) {
			options = render;
			render = null;
			start = null;
		}
		//options were provided as the second argument
		else if (typeof start === "object" && start) {
			options = start;
			start = null;
		}
		//otherwise options were provided as the third argument...

		
		options = options||{};
		if (typeof options.onReady !== 'function')
			options.onReady = start;

		var runner = CanvasApp(render, options);

		runner.canvas.setAttribute("id", "canvas");
		document.body.appendChild(runner.canvas);
		document.body.style.margin = "0";
		document.body.style.overflow = "hidden";
		
		runner.start();
	});
};