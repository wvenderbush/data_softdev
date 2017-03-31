var bar = document.getElementById('scroll');
var dis = document.getElementById('display');

var circleMask = function(x,y,r) {
    var mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("r", r);
    mask.appendChild(c);
    return mask;
}

