export class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    minus(other) {
        return new Vec2(this.x - other.x, this.y - other.y);
    }
    plus(other) {
        return new Vec2(this.x + other.x, this.y + other.y);
    }
    mult(factor) {
        return new Vec2(this.x * factor, this.y * factor);
    }
    div(factor) {
        return new Vec2(this.x / factor, this.y / factor);
    }
    len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        let l = this.len();
        return new Vec2(this.x / l, this.y / l);
    }
}
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
//# sourceMappingURL=classes.js.map