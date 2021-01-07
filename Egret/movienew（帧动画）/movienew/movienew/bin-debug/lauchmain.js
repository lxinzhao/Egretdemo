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
var lauchmain = (function (_super) {
    __extends(lauchmain, _super);
    function lauchmain() {
        var _this = _super.call(this) || this;
        //接收传回来的掉血值
        _this.insertRotate = [];
        _this.bloodVolume = 10000;
        _this.bloodVolumelt = 10000;
        return _this;
    }
    lauchmain.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    lauchmain.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    lauchmain.prototype.init = function () {
        var _this = this;
        this.returnKey();
        this.createText();
        this.Loseorwin();
        this.addChild(new Mains());
        this.addChild(new Mainss());
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            _this.palyerRt();
            _this.palyerLt();
        }, this);
    };
    //生成界面血量文本数值
    lauchmain.prototype.text = function (t, X, Y, color, Size, te) {
        t = new egret.TextField();
        this.addChild(t);
        t.x = X;
        t.y = Y;
        t.textColor = color;
        t.textAlign = egret.HorizontalAlign.CENTER;
        t.size = 36;
        t.text = te;
    };
    //血量显示
    lauchmain.prototype.createText = function () {
        //左边的血
        this.text(this.textfield, 12, 17, 0xffffff, 36, "血量剩余：");
        //右边的血
        this.text(this.textfield, 550, 17, 0xffffff, 36, ":血量剩余");
        /*this.updateLevel()*/
    };
    //判断输赢||强制归零
    lauchmain.prototype.Loseorwin = function () {
        console.log(this.bloodVolumelt);
    };
    //传值调用随机掉血（右侧的血）
    lauchmain.prototype.palyerRt = function () {
        //右边落下的的血
        this.tip = new egret.TextField();
        this.tip.x = 550;
        this.tip.y = 150;
        var random = (Math.floor(Math.random() * 1000)) * -1;
        var bloodVolumes = this.bloodVolume += random;
        //存掉的血数值，把掉的血存到数组里 取值用数组长度-1
        /*this.insertRotate.push(bloodVolumes)
        let s: number = this.insertRotate[this.insertRotate.length - 1]*/
        /*this.text(this.textfield, 450, 17, 0xffffff, 36, s.toString());*/
        //搞了一手简单的；
        if (bloodVolumes <= 0) {
            alert("右边输了");
            bloodVolumes = 0;
        }
        this.booldrt.text = bloodVolumes.toString();
        this.tip.text = random.toString();
        this.tip.textColor = 0xFF0000;
        this.tip.size = 68;
        egret.Tween.get(this.tip)
            .to({ y: 350 }, 800, egret.Ease.bounceOut)
            .to({ x: -1000, y: -1000 }, 20);
        this.addChild(this.tip);
    };
    //传值调用随机掉血（左侧的血）
    lauchmain.prototype.palyerLt = function () {
        //左边落下的血
        this.tips = new egret.TextField();
        this.tips.x = 50;
        this.tips.y = 50;
        var random = (Math.floor(Math.random() * 1000)) * -1;
        var bloodVolumes = this.bloodVolumelt += random;
        if (bloodVolumes <= 0) {
            bloodVolumes = 0;
            alert("左边输了");
        }
        this.tips.text = random.toString();
        this.tips.textColor = 0xFF0000;
        this.tips.size = 68;
        egret.Tween.get(this.tips)
            .to({ y: 200 }, 800, egret.Ease.bounceOut)
            .to({ x: -1000, y: -1000 }, 20);
        this.addChild(this.tips);
        /*this.text(this.textfield, 450, 17, 0xffffff, 36, s.toString());*/
        //搞了一手简单的；
        this.booldlt.text = bloodVolumes.toString();
    };
    //随机掉血
    lauchmain.prototype.boolder = function (t, X, Y, Tweeny) {
        t = new egret.TextField();
        t.x = X;
        t.y = Y;
        var random = (Math.floor(Math.random() * 1000)) * -1;
        this.bloodVolume += random;
        if (this.bloodVolume <= 0) {
            alert("右边输了");
            //挂了就让血归0
            this.bloodVolume = 0;
        }
        console.log(this.bloodVolume);
        //右边的血量显示
        this.booldrt.text = this.bloodVolume.toString();
        //下落的血数值
        t.text = random.toString();
        t.textColor = 0xFF0000;
        t.size = 68;
        egret.Tween.get(t)
            .to({ y: Tweeny }, 800, egret.Ease.bounceOut)
            .to({ x: -1000, y: -1000 }, 20);
        this.addChild(t);
    };
    //键盘监听
    /*	private keyValue() {
            document.onkeydown = function (event) {
                var e = event || window.event || arguments.callee.caller.arguments[0];
                if (e && e.keyCode == VK_ESCAPE) { // 按 Esc
                    alert("按下了ESC")
                }
                if (e && e.keyCode == VK_SPACE) { // 按空格
                    alert("按下了空格")
                }
                if (e && e.keyCode == VK_RETURN) { // enter 键
                    alert("按下了enter")
                }
            };
        }*/
    //键盘监听都是JS的TS好像没有键盘监听事件 裂开了
    /*	private onkeydown(): void {
            document.addEventListener("keydown", function (event: any) {
                if (event.keyCode == VK_ESCAPE) {
                    alert("按下了ESC")
                }
            })
        }*/
    lauchmain.prototype.returnKey = function () {
        var father = this;
        keyCode.RegListener(function (n) {
            father.onkey(n);
        });
    };
    lauchmain.prototype.onkey = function (nkey) {
        if (nkey === VK_A) {
            console.log("按下了A 并放出技能落岩");
            this.rock();
        }
        if (nkey === VK_B) {
            console.log("按下了B 并放出飞镖");
            this.kunai();
        }
        if (nkey === VK_C) {
            console.log("按下了C 并放出月读");
            this.moon();
        }
    };
    //生成技能的方法
    lauchmain.prototype.skill = function (BBname, X, Y, W, H, time, Ty, Ea, TW, TH) {
        var stone = this.createBitmapByName(BBname);
        stone.x = X;
        stone.y = Y;
        stone.width = W;
        stone.height = H;
        egret.Tween.get(stone)
            .to({ y: Ty, width: TW, height: TH }, time, Ea)
            .to({ y: -2000 }, 20);
        this.addChild(stone);
    };
    //A技能的落石
    lauchmain.prototype.rock = function () {
        this.skill("timg_png", 600, 0, 100, 200, 800, 300, egret.Ease.bounceOut, null, null);
        //调用的掉血方法
        this.boolder(this.stonenum, 580, 0, 300);
    };
    //B技能的飞镖
    lauchmain.prototype.kunai = function () {
        var stone = this.createBitmapByName("kunai_png");
        stone.x = 200;
        stone.y = 420;
        stone.width = 100;
        stone.height = 20;
        egret.Tween.get(stone)
            .to({ x: 580 }, 500, egret.Ease.cubicIn)
            .to({ y: -2000 }, 20);
        this.addChild(stone);
        //调用的掉血方法
        this.boolder(this.stonenum, 580, 0, 300);
    };
    //C技能的月读
    lauchmain.prototype.moon = function () {
        this.skill("eye_png", 50, 0, 200, 200, 500, 200, egret.Ease.circInOut, 400, 400);
        //调用的掉血方法
        this.tipss = new egret.TextField();
        this.tipss.x = 50;
        this.tipss.y = 50;
        var random = (Math.floor(Math.random() * 1000)) * -1;
        var bloodVolumes = this.bloodVolumelt += random;
        if (bloodVolumes <= 0) {
            bloodVolumes = 0;
            alert("左边输了");
        }
        this.tipss.text = random.toString();
        this.tipss.textColor = 0xFF0000;
        this.tipss.size = 68;
        egret.Tween.get(this.tipss)
            .to({ y: 200 }, 800, egret.Ease.bounceOut)
            .to({ x: -1000, y: -1000 }, 20);
        this.addChild(this.tipss);
        /*this.text(this.textfield, 450, 17, 0xffffff, 36, s.toString());*/
        //搞了一手简单的；
        this.booldlt.text = bloodVolumes.toString();
    };
    /**
* 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
* Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
*/
    lauchmain.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return lauchmain;
}(eui.Component));
__reflect(lauchmain.prototype, "lauchmain", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=lauchmain.js.map