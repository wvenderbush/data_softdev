
var bar = document.getElementById('scroll');
var dis = document.getElementById('display');
var ns = 'http://www.w3.org/2000/svg';
var countries = [];


var collides = function(x, y, r) {
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
        r = data.radius;
    	im.setAttribute('xlink:href', data.url);
    	im.setAttribute('width', 2 * r);
    	im.setAttribute('height', 2 * r);
        im.setAttribute('class', 'flag');
    	maxx = 1400 - 2 * r;
    	maxy = 615 - 2 * r;
        tries = 5000;
        do {
    	   x = Math.floor(Math.random() * (maxx));
    	   y = Math.floor(Math.random() * (maxy));
        } while(collides(x, y, r));
        im.setAttribute('x', x);
        im.setAttribute('y', y);
        countries.push(im);
        dis.appendChild(im);
    });
    return im;
}

country('PO', 1990);
country('US', 2000);
country('UK', 2010);
