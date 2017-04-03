var bar = document.getElementById('scroll');
var dis = document.getElementById('display');
var ns = 'http://www.w3.org/2000/svg';
var countries = [];


var collides = function() {
    r = parseInt(this.getAttribute('width')) / 2;
    x = parseInt(this.getAttribute('x')) + r;
    y = parseInt(this.getAttribute('y')) + r;
    for (ball in countries) {
	ro = parseInt(ball.getAttribute('width')) / 2;
	xo = parseInt(ball.getAttribute('x')) + ro;
	yo = parseInt(ball.getAttribute('y')) + ro;
	if(Math.pow(xo - x, 2) + Math.pow(yo - y, 2) <= Math.pow(ro - r, 2))
	    return true;
    }
    return false;
}

var country = function(c, y) {
    var im = document.createElementNS(ns, 'image');
    var r = -1;
    $.get('/data',{country:c, year:y}, function(data) {
	im.setAttribute('xlink:href', data.url);
	im.setAttribute('width', 2 * data.radius);
	im.setAttribute('height', 2 * data.radius);
	r = data.radius;
	maxx = 1400 - r;
	maxy = 615 - r;
	x = Math.floor(Math.random() * (maxx - r)) + r
	y = Math.floor(Math.random() * (maxy - r)) + r
    });
    


}

