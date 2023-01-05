let c = document.getElementById("myCanvas") as HTMLCanvasElement;
let ctx = c.getContext("2d")!;

let width = c.width, height = c.height;
let belay = new Vec2(width / 2, height);

c.addEventListener("mousemove", function (e) {
    findxy('move', e)
}, false);

c.addEventListener("click", function (e) {
    findxy('click', e)
}, false);

let anchors: Quickdraw[] = [];
let dest: Vec2;
function findxy(res: string, e: MouseEvent) {
    ctx.clearRect(0, 0, width, height);

    let currX = e.clientX - c.offsetLeft;
    let currY = e.clientY - c.offsetTop;
    dest = new Vec2(currX, currY);

    if (res == 'move') {
        let next = dest;
        for (let i = anchors.length - 1; i >= 0; i--) {
            let cur = anchors[i];
            let prev: Vec2;
            if (i == 0) {
                prev = belay;
            } else {
                prev = anchors[i - 1].mobile;
            }

            let inter = circleLineInter(cur.pos, cur.length, prev, next);
            if (inter.length == 0) {
                let v1 = prev.minus(cur.pos).normalize();
                let v2 = next.minus(cur.pos).normalize();
                let resulting = v1.plus(v2);
                cur.mobile = cur.pos.plus(resulting.normalize().mult(cur.length));
            } else {
                if (inter.length == 1 || inter[0].y > inter[1].y) {
                    cur.mobile = inter[0];
                } else {
                    cur.mobile = inter[1];
                }
            }

            next = cur.mobile;
        }
    } else if (res == 'click') {
        anchors.push(new Quickdraw(currX, currY, 30));
    }
    drawAll();
}

function drawAll() {
    drawRope(ctx);

    for (const a of anchors) {
        a.draw(ctx);
    }
}

let ropeImg = new Image();
ropeImg.src = "assets/rope.png";

function drawRope(ctx: CanvasRenderingContext2D) {
    let end = dest;
    let textureOffset = 0;
    for (let i = anchors.length - 1; i >= -1; i--) {
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
