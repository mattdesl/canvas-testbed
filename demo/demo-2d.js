var testbed = require('../index.js');

var time = 0;

function render(context, width, height, dt) {
	time += dt*0.01;

	context.clearRect(0, 0, width, height);
	context.fillRect(time, 0, 25, 25);
}

function start(context, width, height) {
	console.log("2D #canvas element added...");
	console.log(context.canvas);
}

testbed(render, {
    canvas: document.createElement("canvas"),
    onReady: start,
    onResize: function(width, height) {
        console.log("resizing", width, height);
    }
});