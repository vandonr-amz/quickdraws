export class Vec2 {
    public readonly x: number;
    public readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    minus(other: Vec2): Vec2 {
        return new Vec2(this.x - other.x, this.y - other.y);
    }

    plus(other: Vec2): Vec2 {
        return new Vec2(this.x + other.x, this.y + other.y);
    }

    mult(factor: number): Vec2 {
        return new Vec2(this.x * factor, this.y * factor);
    }

    div(factor: number): Vec2 {
        return new Vec2(this.x / factor, this.y / factor);
    }

    len(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize(): Vec2 {
        let l = this.len();
        return new Vec2(this.x / l, this.y / l);
    }
}
