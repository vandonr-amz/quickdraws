function sq(x) {
    return x * x;
}

function circleLineInter(center, radius, p1, p2) {
    // line: y = m * x + n
    // m: slope
    let v = p1.minus(p2)
    let m = v.y / v.x;
    // n: y-intercept
    let n = p1.y - m * p1.x;

    // get a, b, c values
    var a = 1 + sq(m);
    var b = -center.x * 2 + (m * (n - center.y)) * 2;
    var c = sq(center.x) + sq(n - center.y) - sq(radius);

    // get discriminant
    var d = sq(b) - 4 * a * c;
    if (d >= 0) {
        let x1 = (-b - Math.sqrt(d)) / (2 * a);
        let x2 = (-b + Math.sqrt(d)) / (2 * a);

        if ((p1.x < x1 && p2.x < x1) || (p1.x > x2 && p2.x > x2)) {
            // intersection outside of segment
            return [];
        }

        return [
            // deduce y coord from line equation
            new Vec2(x1, m * x1 + n),
            new Vec2(x2, m * x2 + n),
        ];
    }
    // no intersection
    return [];
}