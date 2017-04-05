var bar = document.getElementById('scroll');
var dis = document.getElementById('display');
var ns = 'http://www.w3.org/2000/svg';
var readyToChange = true;
var countries = [];
var numLoaded = 0;
var id;
var yeartext = document.createElement('div');
yeartext.innerHTML = 'Year: 2000';
document.body.appendChild(yeartext);

console.log(codeList);
var collides = function(x, y, r, simple, idx) {
    collisions = []
    var len;
    for (var i = idx + 1; i < countries.length; i++) {
        ball = countries[i][0];
        // if (ball.getAttribute('x'))
        //     continue;
	    ro = parseFloat(ball.getAttribute('width')) / 2;
	    xo = parseFloat(ball.getAttribute('x')) + ro;
	    yo = parseFloat(ball.getAttribute('y')) + ro;
	    if(Math.pow(xo - x, 2) + Math.pow(yo - y, 2) <= Math.pow(Math.abs(ro) + Math.abs(r), 2)) {
            if(simple)
	           return true;
            collisions.push(countries[i]);
        }
    }
    if(simple)
        return false;
    return collisions;
}
var update = function(c, y) {
    $.get('/data', {country:c, year:y}, function(data) {
        for(var i = 0; i < countries.length; i++) {
            im = countries[i][0];
            if (im.getAttribute('xlink:href') === data.url) {
                r = data.radius * 8;
                if(r <= 0) {
                    im.setAttribute('visibility', 'hidden');
                    b.setAttribute('visibility', 'hidden');
                }
                else {
                    im.setAttribute('visibility', 'visible');
                    b.setAttribute('visibility', 'visible');
                }
                im.setAttribute('width', 2 * r);
                im.setAttribute('height', 2 * r);
                b = countries[i][1];
                b.setAttribute('r', r + 1);
            }
        }
    });
}
var country = function(c, y) {
    var im = document.createElementNS(ns, 'image');
    var b = document.createElementNS(ns, 'circle');
    var r = -1;
    $.get('/data',{country:c, year:y}, function(data) {
        pair = [];
        r = data.radius * 8;
        if(r <= 0) {
            im.setAttribute('visibility', 'hidden');
            b.setAttribute('visibility', 'hidden');
        }
        //im.href.baseVal = data.url;
        im.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', data.url);
    	im.setAttribute('width', 2 * r);
    	im.setAttribute('height', 2 * r);
        im.setAttribute('class', 'flag');
        im.setAttribute('preserveAspectRatio', 'none');
        im.setAttribute('mask', 'url(#flagMask)')
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
		x = Math.random() * (maxx);
        y = Math.random() * (maxy);
        tries = 5000;
        do {
           x = Math.random() * (maxx);
           y = Math.random() * (maxy);
           tries--;
           console.log(tries);
        } while(collides(x, y, br, true, -1) && tries > 0);
        v = 75. / (30 + br)
        im.setAttribute('v', v)
        xv = Math.random() * v;
        yv = Math.pow(Math.pow(v, 2) - Math.pow(xv, 2), 0.5);
        //im.createAttribute('xv');
        //im.createAttribute('yv');
        im.setAttribute('vx', Math.random() < 0.5 ? -xv : xv);
        im.setAttribute('vy', Math.random() < 0.5 ? -yv : yv);
        console.log(im.getAttribute('vx'));
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

var collideVels = function(m1, v1, m2, v2) {
    vf2 = 2*m1*v1 / (m1 + m2) - (m1 - m2) * v2 / (m1 + m2)
    vf1 = (m1 - m2) * v1 / (m1 + m2) + 2*m2*v2 / (m1 + m2)
    return [vf1, vf2]
}

var looper = function() {
    var tick = function() {
        for (var i = 0; i < countries.length; i++) {
            var im = countries[i][0];
            if(im.getAttribute('visibility') === 'hidden')
                continue;
            // 1. check for collisions and update v's
            
            var b = countries[i][1];
            var x = parseFloat(b.getAttribute('cx'));
            var y = parseFloat(b.getAttribute('cy'));
            var r = parseFloat(b.getAttribute('r'));
            var vx = parseFloat(im.getAttribute('vx'));
            var vy = parseFloat(im.getAttribute('vy'));
            var v = parseFloat(im.getAttribute('v'));
            var m = Math.pow(r, 2);
            others = collides(x, y, r, false, i);
            for (var j = 0; j < others.length; j++) {
                var imO = others[j][0];
                if(imO.getAttribute('visibility') === 'hidden')
                    continue;
                var bO = others[j][1];
                ox = parseFloat(bO.getAttribute('cx'));
                oy = parseFloat(bO.getAttribute('cy'));
                ovx = parseFloat(imO.getAttribute('vx'));
                ovy = parseFloat(imO.getAttribute('vy'));
                ov = parseFloat(imO.getAttribute('v'));
                or = parseFloat(bO.getAttribute('r'))
                om = Math.pow(or, 2); 
		x -= vx;
		y -= vy;
		ox -= ovx;
		oy -= ovy;     
                xs = collideVels(m, vx, om, ovx);
                ys = collideVels(m, vy, om, ovy);
                vx = xs[0];
                ovx = xs[1];
                vy = ys[0];
                ovy = ys[1];
                while (Math.pow(ox - x, 2) + Math.pow(oy - y, 2) <= Math.pow(Math.abs(r) + Math.abs(or), 2)) {
                    x += vx;
                    y += vy;
                    ox += ovx;
                    oy += ovy;
                }
                imO.setAttribute('vx', ovx);
                imO.setAttribute('vy', ovy);
                
            }
            
            // 3. move ims
            if(Math.abs(vx) < 1) {
                vx /= Math.abs(vx);
            }
            if(Math.abs(vy) < 1) {
                vy /= Math.abs(vy);
            }
            x += vx;
            y += vy;
            if(x >= 1400 - r) {
                vx = -Math.abs(vx);
                x += vx * 2;
            }
            if(x < r) {
                vx = Math.abs(vx);
                x += vx * 2;
            }
            if(y >= 615 - r) {
                vy = -Math.abs(vy);
                y += vy * 2;
            }
            if(y < r) {
                vy = Math.abs(vy);
                y += vy * 2;
            }
            
            
            // 4. set attributes
            // console.log(x);
            // console.log(y);
            // console.log(im.vx);
            // console.log(im.vy);
            b.setAttribute('cx', x - 1);
            b.setAttribute('cy', y - 1);
            im.setAttribute('x', x - r);
            im.setAttribute('y', y - r);
            im.setAttribute('vx', vx);
            im.setAttribute('vy', vy);
            // b.setAttribute('cx', x);
            // console.log(im.vx);
            // console.log(x);
            // b.setAttribute('cy', y);
            // im.setAttribute('x', x - r);
            // im.setAttribute('y', y - r);

        }
        id = window.requestAnimationFrame(tick);
    }
    readyToChange = true;
    tick();
}

for (var i = 0; i < codeList.length; i++) {
    country(codeList[i], 2000);
}
var minYear = 1995;
var maxYear = 2014;
var inc = 1400. / (maxYear - minYear + 1)
for (var year = minYear; year <= maxYear; year++) {
    r = document.createElementNS(ns, 'rect');
    r.setAttribute('x', (year - minYear) * inc);
    r.setAttribute('y', 0);
    r.setAttribute('width', inc);
    r.setAttribute('height', 75);
    r.setAttribute('year', year);
    r.setAttribute('fill', 'rgb(255,' + Math.floor(255 - 255 * (year - minYear) / (maxYear - minYear)).toString() + ',' + Math.floor(255 - 255 * (year - minYear) / (maxYear - minYear)).toString() + ')')
    r.addEventListener('mouseover', function(e) {
        for (var i = 0; i < codeList.length; i++) {
            update(codeList[i], this.getAttribute('year'));
        }
        yeartext.innerHTML = 'Year: ' + this.getAttribute('year')
    });
    console.log(r);
    bar.appendChild(r);
}