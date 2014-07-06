var testbed = require('../index.js');

//if you only need to draw the canvas once, and then again on resize (to avoid it being cleared)

function render(context, width, height) {
	context.clearRect(0, 0, width, height);
	context.fillRect(0, 0, 25, 25);
}

function start(context, width, height) {
	console.log("2D #canvas element added...");
	console.log(context.canvas);
}

testbed(render, start, {
    once: true
});