import { Vec2 } from "./Vec2.js";
import { Quickdraw } from "./Quickdraw.js";
import { GameState } from "./GameState.js";
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let width = c.width, height = c.height;
c.addEventListener("mousemove", function (e) {
    mouseEvent('move', e);
}, false);
c.addEventListener("click", function (e) {
    mouseEvent('click', e);
}, false);
let belay = new Vec2(width / 2, height);
let state = new GameState(belay);
function mouseEvent(res, e) {
    let currX = e.clientX - c.offsetLeft;
    let currY = e.clientY - c.offsetTop;
    let dest = new Vec2(currX, currY);
    if (res == 'move') {
        state.adjustPositions(dest);
    }
    else if (res == 'click') {
        state.anchors.push(new Quickdraw(currX, currY, 30));
        state.adjustPositions(dest);
    }
    state.drawAll(ctx);
}
//# sourceMappingURL=game.js.map