var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var width = c.width, height = c.height;
var belay = new Vec2(width / 2, height);

c.addEventListener("mousemove", function (e) {
    findxy('move', e)
}, false);

c.addEventListener("click", function (e) {
    findxy('click', e)
}, false);

var anchors = [];
var dest = new Vec2();
function findxy(res, e) {
    ctx.clearRect(0, 0, width, height);

    currX = e.clientX - c.offsetLeft;
    currY = e.clientY - c.offsetTop;
    dest = new Vec2(currX, currY);

    if (res == 'move') {
        let next = dest;
        for (let i = anchors.length - 1; i >= 0; i--) {
            let cur = anchors[i];
            let prev;
            if (i == 0) {
                prev = belay;
            } else {
                prev = anchors[i - 1].mobile;
            }

            var inter = circleLineInter(cur.pos, cur.length, prev, next);
            if (inter.length == 0) {
                let v1 = prev.minus(cur.mobile).normalize();
                let v2 = next.minus(cur.mobile).normalize();
                let resulting = v1.plus(v2);
                cur.mobile = cur.pos.plus(resulting.normalize().mult(cur.length));
            } else {
                if (inter.length != 2)
                    console.log("pb");
                if (inter[0].y > inter[1].y)
                    cur.mobile = inter[0];
                else
                    cur.mobile = inter[1];
            }

            next = cur.mobile;
        }
    } else if (res == 'click') {
        anchors.push(new Quickdraw(currX, currY, 30));
    }
    drawAll();
}

function drawAll() {
    drawRope();

    for (const a of anchors) {
        a.draw();
    }
}

let ropeImg = new Image();
ropeImg.src = "assets/rope.png";

function drawRope() {
    let end = dest;
    let textureOffset = 0;
    for (var i = anchors.length - 1; i >= -1; i--) {
        let next;
        if (i >= 0) {
            next = anchors[i].mobile;
        } else {
            next = belay;
        }

        let v = next.minus(end);
        let angle = Math.atan2(v.y, v.x);
        let len = v.len();

        ctx.translate(end.x, end.y);
        ctx.rotate(angle);
        ctx.drawImage(ropeImg,
            textureOffset, 0, // source rectangle coords
            len, ropeImg.height, // source rectangle w/h
            0, -ropeImg.height / 2, // position
            len, ropeImg.height / 2); // scale
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        textureOffset = (textureOffset + len) % 13;
        end = next;
    }
}
