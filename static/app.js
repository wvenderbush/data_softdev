var bar = document.getElementById('scroll');
var dis = document.getElementById('display');
var ns = 'http://www.w3.org/2000/svg';
var countries = [];
var numLoaded = 0;
console.log(codeList);
var collides = function(x, y, r) {
    x += r;
    y += r; // center of circle
    console.log(countries.length)
    for (var i = 0; i < countries.length; i++) {
        ball = countries[i][0];
        // if (ball.getAttribute('x'))
        //     continue;
	    ro = parseFloat(ball.getAttribute('width')) / 2;
	    xo = parseFloat(ball.getAttribute('x')) + ro;
	    yo = parseFloat(ball.getAttribute('y')) + ro;
	    if(Math.pow(xo - x, 2) + Math.pow(yo - y, 2) <= Math.pow(ro + r, 2)) {
	        return true;
        }
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
    for (var i = 0; i < countries.length; i++) {
        im = countries[i][0];
        b = countries[i][1];
        r = parseFloat(im.getAttribute('width')) / 2;
        br = parseFloat(b.getAttribute('r'));
        maxx = 1400 - 2 * br;
        maxy = 615 - 2 * br;
		var x = 0;
		var y = 0;
        tries = 5000;
        do {
           x = Math.floor(Math.random() * (maxx));
           y = Math.floor(Math.random() * (maxy));
           tries--;
           console.log(tries);
        } while(collides(x, y, br) && tries > 0);
        im.setAttribute('x', x);
		im.setAttribute('y', y);

	b.setAttribute('cx', x + r);
	b.setAttribute('cy', y + r);
	b.setAttribute('stroke', 'black');
	dis.appendChild(b);
	dis.appendChild(im);

        
    }
}

for (var i = 0; i < codeList.length; i++) {
    country(codeList[i], 2000);
}
