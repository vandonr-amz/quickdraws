import { circleLineInter } from "./helpers.js";
import { Vec2 } from "./Vec2.js";
export class GameState {
    constructor(belay) {
        this.anchors = [];
        this.ropeEnd = new Vec2(0, 0);
        this.rope = new Rope();
        this.belay = belay;
    }
    adjustPositions(endPos) {
        this.ropeEnd = endPos;
        let next = endPos;
        for (let i = this.anchors.length - 1; i >= 0; i--) {
            let cur = this.anchors[i];
            let prev;
            if (i == 0) {
                prev = this.belay;
            }
            else {
                prev = this.anchors[i - 1].mobile;
            }
            let inter = circleLineInter(cur.pos, cur.length, prev, next);
            if (inter.length == 0) {
                let v1 = prev.minus(cur.pos).normalize();
                let v2 = next.minus(cur.pos).normalize();
                let resulting = v1.plus(v2);
                cur.mobile = cur.pos.plus(resulting.normalize().mult(cur.length));
            }
            else {
                if (inter.length == 1 || inter[0].y > inter[1].y) {
                    cur.mobile = inter[0];
                }
                else {
                    cur.mobile = inter[1];
                }
            }
            next = cur.mobile;
        }
    }
    drawAll(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.rope.draw(ctx, this);
        for (const a of this.anchors) {
            a.draw(ctx);
        }
    }
}
class Rope {
    constructor() {
        this.ropeImg = new Image();
        this.ropeImg.src = "assets/rope.png";
    }
    draw(ctx, state) {
        let end = state.ropeEnd;
        let textureOffset = 0;
        for (let i = state.anchors.length - 1; i >= -1; i--) {
            let next;
            if (i >= 0) {
                next = state.anchors[i].mobile;
            }
            else {
                next = state.belay;
            }
            let v = next.minus(end);
            let angle = Math.atan2(v.y, v.x);
            let len = v.len();
            ctx.translate(end.x, end.y);
            ctx.rotate(angle);
            ctx.drawImage(this.ropeImg, textureOffset, 0, // source rectangle coords
            len, this.ropeImg.height, // source rectangle w/h
            0, -this.ropeImg.height / 2, // position
            len, this.ropeImg.height / 2); // scale
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            textureOffset = (textureOffset + len) % 13;
            end = next;
        }
    }
}
//# sourceMappingURL=GameState.js.map