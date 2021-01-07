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
var GamePlayingPanel = (function (_super) {
    __extends(GamePlayingPanel, _super);
    //关卡模式再传回给开始界面
    /*private tartPanel: GameStartPanel=new GameStartPanel;*/
    function GamePlayingPanel() {
        var _this = _super.call(this) || this;
        // 如果是负数则逆时针转动，数值越大速度越快
        _this.rotations = 3;
        _this.isShooting = false;
        _this.insertRotateNoAnimate = [];
        // time interval的间隔，数值越小转的越快
        _this.rate = 35;
        // 改变现有旋转速度
        _this.rateOffset = 0;
        _this.insertRotate = [];
        //关卡限定 默认手里干数量
        _this.kunaiNum = 9;
        _this.kunaiW = 20;
        _this.kunaiH = 100;
        _this.level = 1;
        //游戏开始点界面传过来的参数
        _this.mode = 0;
        _this.sco = 0;
        // 即将到达木桩的苦无与现存于木桩的苦无进行坐标比较
        _this.calcCollision = function (rotate) {
            var insertRotate = _this.insertRotate;
            //some 检索即将到达木桩的苦无与现存于木桩的苦无
            return insertRotate.some(function (item) {
                return (rotate <= item.range[1] && rotate >= item.range[0]);
            });
        };
        return _this;
    }
    GamePlayingPanel.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GamePlayingPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.start(this.mode);
        this.init();
    };
    //接受开始界面传过来的参数
    GamePlayingPanel.prototype.start = function (mode) {
        // mode1：简单
        // mode2：疯狂
        if (this.mode === 1) {
            /*console.log("简单的按钮")*/
        }
        else if (mode === 2) {
            var bg = new egret.Bitmap();
            bg.texture = egret.Texture = RES.getRes("2_jpg");
            this.bg.texture = bg.texture;
            bg.x = 0;
            bg.y = 0;
            bg.width = 414;
            bg.height = 736;
            bg.alpha = 1;
            //木桩
            var timbers = new egret.Bitmap();
            timbers.texture = egret.Texture = RES.getRes("eye_png");
            this.timber.texture = timbers.texture;
            this.timber.width = 300;
            this.timber.height = 300;
            this.timber.anchorOffsetX = this.timber.width / 2;
            this.timber.anchorOffsetY = this.timber.height / 2;
            this.timber.x = this.width / 2;
            this.timber.y = 230;
        }
        this.mode = mode;
        console.log(this.mode);
    };
    GamePlayingPanel.prototype.init = function () {
        this.stageHeight = this.stage.stageHeight;
        this.stageWidth = this.stage.stageWidth;
        this.height = this.stageHeight;
        this.width = this.stageWidth;
        this.timber.width = 200;
        this.timber.height = 200;
        this.timber.anchorOffsetX = this.timber.width / 2;
        this.timber.anchorOffsetY = this.timber.height / 2;
        this.timber.x = this.width / 2;
        this.timber.y = 230;
        this.startAnimation();
        this.createKunai();
    };
    //播放木桩旋转动画 
    GamePlayingPanel.prototype.startAnimation = function () {
        var _this = this;
        if (this.timberInterval) {
            clearInterval(this.timberInterval);
        }
        this.timber.rotation = 0;
        this.timberInterval = setInterval(function () {
            _this.timber.rotation += _this.rotations;
            /*console.log(this.timber.rotation);*/
        }, this.rate - this.rateOffset);
    };
    //创建游戏区域
    GamePlayingPanel.prototype.createClickable = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shoot, this);
    };
    //关卡加强
    /**
    * 射击动作
    */
    GamePlayingPanel.prototype.shoot = function (e) {
        var _this = this;
        if (this.isShooting || this.kunaiNum < 0)
            return;
        this.isShooting = true;
        this.kunaiNum -= 1;
        /*console.log(this.kunaiNum);*/
        this.updateKunaiNum();
        var func = function () {
            if (_this.calcCollision(_this.timber.rotation)) {
                //如果坐标集合里面有了插入重复的位置，弹飞手里干
                _this.flickKunai();
            }
            else {
                //加载木屑的动画
                _this.woodBits();
                //射中之后让木桩抖一下
                var timberX = _this.timber.x;
                var timberY = _this.timber.y;
                egret.Tween.get(_this.timber)
                    .to({ x: _this.timber.x - 60, y: _this.timber.y - 70 }, 20, egret.Ease.bounceInOut)
                    .to({ x: timberX, y: timberY }, 20, egret.Ease.bounceInOut)
                    .call(function () {
                    //判断动画结束后进行游戏判断
                    if (_this.kunaiNum <= 0) {
                        _this.showNext();
                    }
                    else {
                        _this.resetKunai();
                        var s = _this.sco += 1;
                        _this.updateScores(s);
                    }
                }, _this);
                _this.kunai.alpha = 0;
                //为什么显示不出来 但是已经存在了,这个是因为this.addChildAt(kunai, 1)层级的原因
                _this.createRotateKunai();
            }
        };
        //手里干的射出移动
        egret.Tween.get(this.kunai)
            .to({ y: 380 }, 150, egret.Ease.cubicIn)
            .call(func, this);
    };
    //游戏界面的手里干
    GamePlayingPanel.prototype.createKunai = function () {
        this.kunai.width = this.kunaiW;
        this.kunai.height = this.kunaiH;
        this.kunai.x = this.stageWidth / 2 - 10;
        this.kunai.y = this.stageHeight - 170;
        this.addChild(this.kunai);
        this.createRandomKunai();
        this.createClickable();
    };
    //重新游戏界面的手里干
    GamePlayingPanel.prototype.resetKunai = function () {
        this.kunai.width = this.kunaiW;
        this.kunai.height = this.kunaiH;
        this.kunai.rotation = 0;
        this.kunai.x = this.stageWidth / 2 - 10;
        this.kunai.y = this.stageHeight - 170;
        this.kunai.alpha = 1;
        this.isShooting = false;
    };
    //数据存储木桩上的手里干，有kunaiRotate则是随机生成的苦无
    GamePlayingPanel.prototype.createRotateKunai = function (kunaiRotate) {
        var _this = this;
        var rotate = typeof kunaiRotate === 'number' ? kunaiRotate : this.timber.rotation;
        var range = [];
        range.push(rotate - 10);
        range.push(rotate + 10);
        //生成木桩上的手里干
        var kunai = new egret.Bitmap();
        kunai.texture = egret.Texture = RES.getRes("kunai_png");
        kunai.anchorOffsetX = 5;
        kunai.anchorOffsetY = -52;
        kunai.x = this.stage.stageWidth / 2;
        kunai.y = 230;
        kunai.width = this.kunaiW;
        kunai.height = this.kunaiH;
        kunai.alpha = 1;
        // 如果是用kunaiRotate做判断需要乘以-1;
        kunai.rotation = typeof kunaiRotate === 'number' ? -kunaiRotate : 0;
        this.addChildAt(kunai, 1);
        var time = setInterval(function () {
            kunai.rotation += _this.rotations;
        }, this.rate - this.rateOffset);
        //动态存储每次手里干到达的位置木桩角度
        var obj = { id: this.timber.rotation, range: range, kunai: kunai, time: time };
        this.insertRotate.push(obj);
    };
    // 消除一定数量的苦无
    GamePlayingPanel.prototype.removeRotateKunai = function (num) {
        if (num === void 0) { num = 3; }
    };
    //木屑
    GamePlayingPanel.prototype.woodBits = function () {
        var _this = this;
        var _loop_1 = function (i) {
            var dou = new egret.Bitmap();
            dou.texture = egret.Texture = RES.getRes("dou_png");
            dou.width = 5;
            dou.height = 5;
            dou.x = this_1.stageWidth / 2 - 1;
            dou.y = 290;
            this_1.addChild(dou);
            var random = Math.floor(Math.random() * this_1.stageWidth * 2);
            random = Math.random() < .5 ? random * -1 : random;
            egret.Tween.get(dou)
                .to({ x: random, y: this_1.stageHeight }, 500, egret.Ease.sineOut)
                .call(function () {
                _this.removeChild(dou);
            });
        };
        var this_1 = this;
        for (var i = 0; i < 4; i++) {
            _loop_1(i);
        }
    };
    // 重复苦无的动画，游戏失败等等
    GamePlayingPanel.prototype.flickKunai = function () {
        var _this = this;
        var func = function () {
            setTimeout(function () {
                _this.showDialog();
            }, 500);
        };
        //手里干rotation转2圈 打飞动画
        egret.Tween.get(this.kunai)
            .to({ x: this.stageWidth + 100, y: this.stageHeight + 100, rotation: 720 }, 700, egret.Ease.bounceInOut)
            .call(func, this);
    };
    //游戏结束的弹框
    GamePlayingPanel.prototype.showDialog = function () {
        var _this = this;
        //之前报黄色提示 是因为group名字写错了
        this.endgroup.visible = true;
        this.addChild(this.endgroup);
        this.resbutton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.resetGame, this);
        this.stabutton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.addChild(new GameStartPanel());
            //注意清除本页面时候要加parent不然会报错,如果当前删除显示对象不在显示列表之中，所以加个if判断下
            if (_this.parent) {
                _this.parent.removeChild(_this);
            }
        }, this);
    };
    //重新开始本局
    GamePlayingPanel.prototype.resetGame = function () {
        this.kunaiNum = 9;
        this.cleanBitmap();
        this.updateKunaiNum();
        this.resetKunai();
        this.createClickable();
        //分数
        this.updateScores(0);
        this.endgroup.visible = false;
    };
    //清除现有所有的手里干
    GamePlayingPanel.prototype.cleanBitmap = function () {
        this.insertRotate.forEach(function (item) {
            item.kunai.parent.removeChild(item.kunai);
        });
        this.insertRotate = [];
    };
    //更新剩余的手里干
    GamePlayingPanel.prototype.updateKunaiNum = function () {
        this.kuaninum.text = this.kunaiNum.toString();
    };
    //下一关卡
    GamePlayingPanel.prototype.showNext = function () {
        /*this.timber.alpha = 0;*/
        //关卡加1
        this.rotations += 1;
        this.level += 1;
        this.levels.text = this.level.toString();
        this.kunaiNum = 9 + Math.floor(this.level / 10 + 2);
        if (this.kunaiNum <= 0) {
            this.kunaiNum = 1;
        }
        this.cleanBitmap();
        this.updateKunaiNum();
        this.resetKunai();
        this.createClickable();
        this.createRandomKunai();
    };
    /**
    * 每过一关改变关卡过关方式，并重新生成已在木桩上的苦无
    */
    GamePlayingPanel.prototype.createRandomKunai = function () {
        if (this.level !== 1) {
            var random = Math.floor(Math.random() * this.level);
            //随机角度，然后传回给createRotateKunai生成木桩上的手里干
            for (var i = 1; i < random; i++) {
                var r = Math.floor(Math.random() * 180);
                r = Math.random() < .5 ? r * -1 : r;
                this.createRotateKunai(r);
            }
        }
    };
    GamePlayingPanel.prototype.updateScores = function (s) {
        this.Scores.text = s.toString();
        this.Scores0.text = s.toString();
    };
    return GamePlayingPanel;
}(eui.Component));
__reflect(GamePlayingPanel.prototype, "GamePlayingPanel", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=GamePlayingPanel.js.map