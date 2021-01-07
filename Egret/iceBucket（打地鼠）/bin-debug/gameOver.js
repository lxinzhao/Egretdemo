var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var gameOver = (function (_super) {
    __extends(gameOver, _super);
    function gameOver() {
        return _super.call(this) || this;
    }
    gameOver.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    gameOver.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    gameOver.prototype.init = function () {
        var _this = this;
        this.height = this.stage.height;
        this.scoreText.text = GameUtil.Constant.score.toString();
        this.btnPlayAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.parent.addChild(new Game());
            GameUtil.Constant.score = 0;
            //移除页应该放在最后 不然会报错
            _this.parent.removeChild(_this);
        }, this);
    };
    return gameOver;
}(eui.Component));
__reflect(gameOver.prototype, "gameOver", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=gameOver.js.map