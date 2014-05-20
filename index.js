var domready = require('domready');
require('raf.js');

module.exports = function( render, start, options ) {
	domready(function() {
		//options were provided as the second argument,
		if (typeof start === "object" && start) {
			options = start;
			start = null;
		}

		options = options||{};

		document.body.style.margin = "0";
		document.body.style.overflow = "hidden";

		var canvas = document.createElement("canvas");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		canvas.setAttribute("id", "canvas");

		document.body.appendChild(canvas);

		var context,
			attribs = options.contextAttributes||{};
		if (options.context === "webgl" || options.context === "experimental-webgl") {
			try {
				context = (canvas.getContext('webgl', attribs) 
							|| canvas.getContext('experimental-webgl', attribs));
			} catch (e) {
				context = null;
			}
			if (!context) {
				throw "WebGL Context Not Supported -- try enabling it or using a different browser";
			}	
		} else {
			context = canvas.getContext(options.context||"2d", attribs);
		}

		var width = canvas.width,
			height = canvas.height;

		window.addEventListener("resize", function() {
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = width;
			canvas.height = height;
		});

		
		var then = Date.now();

		if (typeof start === "function") {
			start(context, width, height);
		}

		if (typeof render === "function") {
			function renderHandler() {
				var now = Date.now();
				var dt = (now-then);

				if (!options.once)
					requestAnimationFrame(renderHandler);
				
				render(context, width, height, dt);
				then = now;
			}
			requestAnimationFrame(renderHandler);
		}			
	});
}