var bar = document.getElementById('scroll');
var dis = document.getElementById('display');
var ns = 'http://www.w3.org/2000/svg';
var countries = [];


var collides = function(x, y, r) {
    for (ball in countries) {
	ro = parseInt(ball.width) / 2;
	xo = parseInt(ball.x) + ro;
	yo = parseInt(ball.y) + ro;
	if(Math.pow(xo - x, 2) + Math.pow(yo - y, 2) <= Math.pow(ro - r, 2))
	    return true;
    }
    return false;
}

var country = function(c, y) {
    var im = document.createElementNS(ns, 'image');
    var b = document.createElementNS(ns, 'circle');
    var r = -1;
    $.get('/data',{country:c, year:y}, function(data) {
        pair = [];
        r = data.radius * 8;
	console.log(r);
    	im.href.baseVal = data.url;
    	im.setAttribute('width', 2 * r);
    	im.setAttribute('height', 2 * r);
        im.setAttribute('class', 'flag');
        im.setAttribute('preserveAspectRatio', 'none');
        b.setAttribute('r', r + 3);
        countries.push([im, b]);
        dis.appendChild(b);
        dis.appendChild(im);
        
    });
    return im;
}

var placeBalls = function() {
    
    tries = 5000;
    for (c in countries) {
        im = countries[0];
        b = countries[1];
        maxx = 1400 - 2 * im.r;
        maxy = 615 - 2 * im.r;
        do {
           x = Math.floor(Math.random() * (maxx));
           y = Math.floor(Math.random() * (maxy));
           tries--;
        } while(collides(x, y, im.r) && tries > 0);
        im.x.baseVal = x;
        im.y.baseVal = y;
        
        b.cx.baseVal = x + b.r;
        b.cy.baseVal = y + b.r;
        b.stroke.baseVal = 'black';
        
    }
}

country('PL', 2000);
country('US', 2001);
country('GB', 2000);
setTimeout(placeBalls, 100);