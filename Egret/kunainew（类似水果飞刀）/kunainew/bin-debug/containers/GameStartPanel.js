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
/**
* 游戏开始的界面
* GameStartPanel
*/
var GameStartPanel = (function (_super) {
    __extends(GameStartPanel, _super);
    function GameStartPanel() {
        var _this = _super.call(this) || this;
        _this.gamePlayingPanel = new GamePlayingPanel;
        return _this;
    }
    GameStartPanel.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameStartPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    GameStartPanel.prototype.init = function () {
        var _this = this;
        this.stageHeight = this.stage.stageHeight;
        this.stageWidth = this.stage.stageWidth;
        this.height = this.stageHeight;
        this.width = this.stageWidth;
        this.logos();
        //按钮这些就直接放好位置了就不用再代码调整了 减轻工作量- -
        //简单的按钮
        this.stabutton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.onTouchTap(1);
        }, this);
        this.stabutton.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            _this.buttonStates(_this.stabutton);
        }, this);
        this.stabutton.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
            _this.buttonStates(_this.stabutton);
        }, this);
        //复杂的按钮
        this.superbutton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.onTouchTap(2);
        }, this);
        this.superbutton.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            _this.buttonStates(_this.superbutton);
        }, this);
        this.superbutton.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
            _this.buttonStates(_this.superbutton);
        }, this);
    };
    GameStartPanel.prototype.onTouchTap = function (mode) {
        if (mode === void 0) { mode = 1; }
        //mode1:简单
        //mode2:疯狂
        if (mode === 1) {
            this.buttonState(this.stabutton);
            this.parent.addChildAt(this.gamePlayingPanel, 0);
            this.gamePlayingPanel.start(1);
            this.addChild(this.gamePlayingPanel);
        }
        else if (mode === 2) {
            this.buttonState(this.superbutton);
            this.parent.addChildAt(this.gamePlayingPanel, 1);
            this.gamePlayingPanel.start(2);
            //不能用new GamePlayingPanel()开始加了一个新的游戏界面所以,返回的时候会先到简单再到大厅
            this.addChild(this.gamePlayingPanel);
        }
    };
    //位移加的
    GameStartPanel.prototype.buttonState = function (but) {
        but.x = but.x + 2;
        but.y = but.y + 2;
    };
    //位移减的
    GameStartPanel.prototype.buttonStates = function (but) {
        but.x = but.x - 2;
        but.y = but.y - 2;
    };
    GameStartPanel.prototype.logos = function () {
        //logo的动画,直接拖到画布上随便放个位置就行了
        this.logo.x = this.width / 2 - this.logo.width / 2;
        this.logo.y = -this.logo.height;
        //egret.Ease.bounceOut让logo执行完动画后有一个回弹效果
        egret.Tween.get(this.logo).to({ y: 60 }, 8000, egret.Ease.bounceOut);
    };
    GameStartPanel.GAME_START_1 = 'stabutton';
    GameStartPanel.GAME_START_2 = 'superbutton';
    return GameStartPanel;
}(eui.Component));
__reflect(GameStartPanel.prototype, "GameStartPanel", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=GameStartPanel.js.map