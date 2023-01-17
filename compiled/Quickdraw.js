import { Vec2 } from "./Vec2.js";
export class Quickdraw {
    get pos() {
        return this._pos;
    }
    constructor(posX, posY, length) {
        this._pos = new Vec2(posX, posY);
        this.mobile = new Vec2(posX, posY + length);
        this.length = length;
        this.img = new Image();
        this.img.src = "assets/bd12.png";
    }
    draw(ctx) {
        let v = this.mobile.minus(this.pos);
        let angle = Math.atan2(v.y, v.x) - Math.PI / 2;
        let tx = this.pos.x;
        let ty = this.pos.y;
        let scale = this.length / 102;
        ctx.save();
        ctx.translate(tx, ty);
        ctx.rotate(angle);
        ctx.drawImage(this.img, -9 * scale, -6 * scale, this.img.width * scale, this.img.height * scale);
        // Reset transformations
        ctx.restore();
    }
}
//# sourceMappingURL=Quickdraw.js.map