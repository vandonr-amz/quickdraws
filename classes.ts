

class Vec2 {
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

class Quickdraw {
    private _pos: Vec2;
    public get pos(): Vec2 {
        return this._pos;
    }
    public mobile: Vec2;
    public length: number;

    private img: HTMLImageElement;

    constructor(posX: number, posY: number, length: number) {
        this._pos = new Vec2(posX, posY);
        this.mobile = new Vec2(posX, posY + length);
        this.length = length;

        this.img = new Image();
        this.img.src = "assets/bd12.png";
    }

    draw(ctx: CanvasRenderingContext2D) {
        let v = this.mobile.minus(this.pos);
        let angle = Math.atan2(v.y, v.x) - Math.PI / 2;

        let tx = this.pos.x;
        let ty = this.pos.y;

        let scale = this.length / 102;

        ctx.translate(tx, ty);
        ctx.rotate(angle);
        ctx.drawImage(this.img, -9 * scale, -6 * scale, this.img.width * scale, this.img.height * scale);

        // Reset transformations
        ctx.rotate(-angle);
        ctx.translate(-tx, -ty);
    }
}
