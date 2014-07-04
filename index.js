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

		options.retina = typeof options.retina === "boolean" ? options.retina : true;
		
		document.body.style.margin = "0";
		document.body.style.overflow = "hidden";

		var hasWidth = typeof options.width === "number", 
			hasHeight = typeof options.height === "number";
		
		//if either width or height is specified, don't auto-resize to the window...
		if (hasWidth || hasHeight) 
			options.ignoreResize = true;
		
		options.width = hasWidth ? options.width : window.innerWidth;
		options.height = hasHeight ? options.height : window.innerHeight;

		var DPR  = options.retina ? (window.devicePixelRatio||1) : 1; 

		var canvas = document.createElement("canvas");
		canvas.width = options.width * DPR;
		canvas.height = options.height * DPR;
		canvas.setAttribute("id", "canvas");

        if (options.retina) {
        	canvas.style.width = options.width + 'px';
            canvas.style.height = options.height + 'px';
        }

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


		var width = options.width,
			height = options.height;
		
		function resize() {
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = width * DPR;
			canvas.height = height * DPR;

	        if (options.retina) {
	        	canvas.style.width = width + 'px';
	            canvas.style.height = height + 'px';
	        }

			if (options.once)
				requestAnimationFrame(renderHandler);
			if (typeof options.onResize === "function")
				options.onResize(width, height);
		}

		if (!options.ignoreResize) {
			window.addEventListener("resize", function() {
				resize();
			});

			window.addEventListener("orientationchange", function() {
				resize();
			});
		}
		
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
				
				context.save();
				context.scale(DPR, DPR);
				render(context, width, height, dt);

				context.restore();
				then = now;
			}
			requestAnimationFrame(renderHandler);
		}			
	});
}