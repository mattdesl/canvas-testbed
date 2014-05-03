var testbed = require('../index.js');

var time = 0;

function render(gl, width, height, dt) {
	time += dt*0.01;
	
	gl.clearColor(0.5, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
}

function start(gl, width, height) {
	console.log("WebGL #canvas element added...");
	console.log(gl.canvas);
}

testbed(render, start, {
	context: "webgl",
	contextAttributes: {
		antialias: true
	}
});