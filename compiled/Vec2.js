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
        if (l > 0)
            return new Vec2(this.x / l, this.y / l);
        return new Vec2(0, 0);
    }
}
//# sourceMappingURL=Vec2.js.map