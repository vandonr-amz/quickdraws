var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var width = c.width, height = c.height;
var belayX = width/2, belayY = height;

c.addEventListener("mousemove", function (e) {
            findxy('move', e)
        }, false);
        
c.addEventListener("click", function (e) {
            findxy('click', e)
        }, false);
        
var anchors = [{x:belayX, y:belayY}];
function findxy(res, e) {
	ctx.clearRect(0, 0, width, height);
    
    currX = e.clientX - c.offsetLeft;
    currY = e.clientY - c.offsetTop;
    
    if (res == 'move') {
        let a = anchors[anchors.length-1];
        a.x = currX;
        a.y = currY;
    } else if (res == 'click') {
        anchors.push({x:currX, y:currY})
    	startX = currX;
    	startY = currY;
    }
    drawSegments();
}

function drawSegments() {
    ctx.beginPath();
    ctx.moveTo(belayX, belayY);
    for(const a of anchors) {
        ctx.lineTo(a.x, a.y);
    }
    ctx.stroke();
}

class Quickdraw {
    constructor(posX, posY, length) {
      this.posX = posX;
      this.posY = posY;
      this.length = length;
    }
  }