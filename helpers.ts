import { Vec2 } from "./Vec2.js";

function sq(x: number): number {
    return x * x;
}

/**
 * Returns the point(s) of intersection of the segment p1 - p2 and the circle defined by center and radius
 */
export function circleLineInter(center: Vec2, radius: number, p1: Vec2, p2: Vec2): Vec2[] {
    // inspired from https://cscheng.info/2016/06/09/calculate-circle-line-intersection-with-javascript-and-p5js.html

    // line: y = m * x + n
    // m: slope
    let v = p1.minus(p2)
    let m = v.y / v.x;
    // n: y-intercept
    let n = p1.y - m * p1.x;

    // get a, b, c values
    let a = 1 + sq(m);
    let b = -center.x * 2 + (m * (n - center.y)) * 2;
    let c = sq(center.x) + sq(n - center.y) - sq(radius);

    // get discriminant
    let d = sq(b) - 4 * a * c;
    if (d >= 0) {
        let x1 = (-b - Math.sqrt(d)) / (2 * a);
        let x2 = (-b + Math.sqrt(d)) / (2 * a);

        let ans: Vec2[] = []
        if (isBetween(x1, p1.x, p2.x)) {
            // deduce y coord from line equation
            ans.push(new Vec2(x1, m * x1 + n))
        }
        if (isBetween(x2, p1.x, p2.x)) {
            ans.push(new Vec2(x2, m * x2 + n))
        }

        return ans;
    }
    // no intersection
    return [];
}

/** 
 * Returns whether x is between a and b. 
 * a and b don't need to be in any specific order. 
 */
function isBetween(x: number, a: number, b: number): boolean {
    // x is between a and b if their subtraction have opposite signs
    return (a - x) * (b - x) < 0
}