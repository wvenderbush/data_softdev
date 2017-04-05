var bar = document.getElementById('scroll');
var dis = document.getElementById('display');
var ns = 'http://www.w3.org/2000/svg';
var countries = [];
var numLoaded = 0;
console.log(codeList);
var collides = function(x, y, r) {
    for (var i = 0; i < countries.length; i++) {
	ball = countries[i][0]
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
        b.setAttribute('r', r + 1);
        countries.push([im, b]);
        numLoaded += 1;
        placeBalls();
    });
    return im;
}

var placeBalls = function() {
    if(numLoaded < codeList.length) {
        console.log(numLoaded);
        return;
    }
    tries = 5000;
    for (var i = 0; i < countries.length; i++) {
        im = countries[i][0];
        b = countries[i][1];
        r = parseFloat(im.getAttribute('width')) / 2;
        br = b.getAttribute('r');
        maxx = 1400 - 2 * br;
        maxy = 615 - 2 * br;
		var x = 0;
		var y = 0;
        do {
           x = Math.floor(Math.random() * (maxx));
           y = Math.floor(Math.random() * (maxy));
           tries--;
        } while(collides(x, y, br) && tries > 0);
   	 	console.log(x);
    	console.log(y);
        im.setAttribute('x', x);
		im.setAttribute('y', y);

	b.setAttribute('cx', parseFloat(x) + r);
	b.setAttribute('cy', parseFloat(y) + r);
	b.setAttribute('stroke', 'black');
	dis.appendChild(b);
	dis.appendChild(im);

        
    }
}

for (var i = 0; i < codeList.length; i++) {
    country(codeList[i], 2000);
}
