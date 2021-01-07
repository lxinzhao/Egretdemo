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
var Game = (function (_super) {
    __extends(Game, _super);
    /* private personTweenTime = 1000;*/
    /*	public  score = 0;
        private blockSourceNames: Array<string> = ["person-fs_png","person-lj_png","person-ldh_png"];
        private blockSourceNames2: Array<string> = ["person-fs-wet_png","person-lj-wet_png","person-ldh-wet_png"];*/
    function Game() {
        var _this = _super.call(this) || this;
        _this.tongNum = 0;
        _this.time = 30;
        _this.accelerator = 120;
        //人出现的速度
        _this.speed = 1;
        _this.count = 0;
        return _this;
    }
    Game.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Game.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    Game.prototype.init = function () {
        var _this = this;
        egret.startTick(this.update, this);
        //timer
        var s = setInterval(function () {
            if (_this.time > 0) {
                _this.time--;
                _this.timeDownTXT.text = _this.time.toString();
            }
            else {
                clearInterval(s);
            }
        }, 1000);
        this.stageHeight = this.stage.stageHeight;
        this.stageWidth = this.stage.stageWidth;
        this.height = this.stageHeight;
    };
    //控制人物出现的速度和游戏是否结束
    Game.prototype.update = function () {
        this.count++;
        if (this.count === Math.floor(this.accelerator / this.speed)) {
            this.peopleChange();
            this.count = 0;
            this.speed += 0.05;
        }
        //游戏是否结束
        if (this.time === 0) {
            egret.stopTick(this.update, this);
            this.parent.addChild(new gameOver());
            this.parent.removeChild(this);
        }
        return false;
    };
    Game.prototype.peopleChange = function () {
        var _this = this;
        //随机出现
        var ran = Math.floor(Math.random() * this.group.numChildren);
        var g = this.group.getChildAt(ran);
        var _loop_1 = function (i) {
            // 如果随机到的group中，没有人物image，那么就创建一个
            if (g.numChildren < 4) {
                if (ran === i) {
                    // 在三张人物图片中随机一张
                    var random_1 = Math.floor(Math.random() * 3);
                    //创建对应的人物图片
                    var img_1 = new egret.Bitmap(RES.getRes(GameUtil.peopleEnemy[random_1]));
                    // 随机到的这个group 设置为可显示 
                    this_1.group.getChildAt(i).visible = true;
                    g.addChild(img_1);
                    //给他遮罩
                    img_1.mask = g.getChildAt(0);
                    // 将人物图片放到遮罩图片下方，然后让其缓动到上方;它现在就刚好在遮罩的下方贴着遮罩
                    img_1.y = img_1.y + img_1.height;
                    //给他一个缓动的动画
                    var tw_1 = egret.Tween.get(img_1).to({ y: img_1.y - img_1.height }, 1000)
                        .to({ y: img_1.y }, 800).call(function () {
                        //缓动结束，将遮罩的group隐藏 i
                        _this.group.getChildAt(i).visible = false;
                        //人物图片复位
                        g.getChildAt(1).visible = false;
                        g.getChildAt(2).visible = false;
                        //remove监听
                        //从gruop中移除人物的图片
                        g.removeChild(img_1);
                        //removeEventListener删除对象的时间 谁
                        img_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, function () { }, _this);
                    });
                    //人物的图片click处理
                    img_1.touchEnabled = true;
                    img_1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                        //暂停动画
                        tw_1.setPaused(true);
                        //防止多次点击
                        img_1.touchEnabled = false;
                        _this.tongNum++;
                        GameUtil.Constant.score++;
                        g.getChildAt(1).visible = true;
                        g.getChildAt(2).visible = true;
                        _this.tongNumTXT.text = _this.tongNum.toString();
                        //替换为对应的被浇水的图
                        img_1.texture = RES.getRes(GameUtil.peopleEnemyWet[random_1]);
                        //动画继续播放 200ms
                        setTimeout(function () {
                            tw_1.setPaused(false);
                        }, 200);
                    }, this_1);
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.group.numChildren; i++) {
            _loop_1(i);
        }
    };
    return Game;
}(eui.Component));
__reflect(Game.prototype, "Game", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Game.js.map