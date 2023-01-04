function sq(x) {
    return x * x;
}

function circleLineInter(center, radius, p1, p2) {
    // inspired from https://cscheng.info/2016/06/09/calculate-circle-line-intersection-with-javascript-and-p5js.html

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

        let ans = []
        // checking if both sides have opposite sign, i.e. if x1 is between p1 and p2
        if ((p1.x - x1) * (p2.x - x1) < 0) {
            // deduce y coord from line equation
            ans.push(new Vec2(x1, m * x1 + n))
        }
        if ((p1.x - x2) * (p2.x - x2) < 0) {
            ans.push(new Vec2(x2, m * x2 + n))
        }

        return ans;
    }
    // no intersection
    return [];
}