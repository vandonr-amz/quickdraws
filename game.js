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
        
var anchors = new Quickdraw(belayX + 10, height/2, 30);
var source = new Vec2(belayX, belayY);
var dest = new Vec2();
function findxy(res, e) {
	ctx.clearRect(0, 0, width, height);
    
    currX = e.clientX - c.offsetLeft;
    currY = e.clientY - c.offsetTop;
    
    if (res == 'move') {
        let prev = source;
        dest = new Vec2(currX, currY);

        let v1 = prev.minus(anchor.mobile);
        let v2 = dest.minus(anchor.mobile);
        let resulting = v1.plus(v2);
        anchor.mobile = anchor.pos.plus(resulting.normalize().mult(anchor.length));

    } else if (res == 'click') {
        // nothing
    }
    drawSegments();
}

function drawSegments() {
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.strokeStyle = "purple";
    ctx.moveTo(belayX, belayY);
    ctx.lineTo(anchor.mobile.x, anchor.mobile.y);
    ctx.lineTo(dest.x, dest.y);
    ctx.stroke();

    anchor.draw();
}
