var testbed = require('../index.js')({
    width: 256,
    height: 100,
    retina: false, //don't scale for retina displays

    onReady: function(context) {
        context.canvas.style.background = 'gray';
    }
});