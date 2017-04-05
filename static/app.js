var bar = document.getElementById('scroll');
var dis = document.getElementById('display');
var ns = 'http://www.w3.org/2000/svg';
var countries = [];
var numLoaded = 0;
console.log(codeList);
var collides = function(x, y, r, simple, idx) {
    collisions = []
    x += r;
    y += r; // center of circle
    var len;
    for (var i = idx + 1; i < countries.length; i++) {
        ball = countries[i][0];
        // if (ball.getAttribute('x'))
        //     continue;
	    ro = parseFloat(ball.getAttribute('width')) / 2;
	    xo = parseFloat(ball.getAttribute('x')) + ro;
	    yo = parseFloat(ball.getAttribute('y')) + ro;
	    if(Math.pow(xo - x, 2) + Math.pow(yo - y, 2) <= Math.pow(ro + r, 2)) {
            if(simple)
	           return true;
            collisions.push(countries[i]);
        }
    }
    if(simple)
        return false;
    return collisions
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
           x = Math.random() * (maxx);
           y = Math.random() * (maxy);
           tries--;
           console.log(tries);
        } while(collides(x, y, br, true, -1) && tries > 0);
        im.v = 500. / (30 + br)
        im.xv = Math.random() * im.v;
        im.yv = Math.pow(Math.pow(im.v, 2) - Math.pow(im.xv, 2), 0.5);
        im.xv = Math.random() < 0.5 ? -im.xv : im.xv
        im.yv = Math.random() < 0.5 ? -im.yv : im.yv
        im.setAttribute('x', x);
		im.setAttribute('y', y);

	b.setAttribute('cx', x + r);
	b.setAttribute('cy', y + r);
	b.setAttribute('stroke', 'black');
	dis.appendChild(b);
	dis.appendChild(im);

        
    }
    looper();
}

var looper = function() {
    var tick = function() {
        for (var i = 0; i < countries.length; i++) {
            // 1. check for collisions and update v's
            im = countries[i][0];
            b = countries[i][1];
            x = parseFloat(b.getAttribute('cx'));
            y = parseFloat(b.getAttribute('cy'));
            r = parseFloat(b.getAttribute('r'));
            others = collides(x, y, r, false, i);
            for (var j = 0; j < others.length; j++) {
                imO = others[i][0];
                bO = others[i][1];
                ox = parseFloat(bO.getAttribute('cx'));
                oy = parseFloat(bO.getAttribute('cy'));
                dist = Math.pow(Math.pow(ox - x, 2) + Math.pow(oy - y, 2), 0.5)
                oDirX = (ox - x) / dist;
                oDirY = (oy - y) / dist;
                imO.vx = oDirX * imO.v;
                imO.vy = oDirY * imO.v;
                im.vx = -oDirX * im.v;
                im.vy = -oDirY * im.v;
            }
            // 2. check collision with edge
            if(x >= 1400 - r || x < r) {
                im.vx = -im.vx;
            }
            if(y >= 615 - r || y < r) {
                im.vy = -im.vy;
            }
            // 3. move ims
            x += im.vx;
            y += im.vy;
            // 4. set attributes
            b.setAttribute('cx', x);
            b.setAttribute('cy', y);
            im.setAttribute('x', x - r);
            im.setAttribute('y', y - r);

        }
        id = window.requestAnimationFrame(tick);
    }
    tick();
}

for (var i = 0; i < codeList.length; i++) {
    country(codeList[i], 2000);
}
