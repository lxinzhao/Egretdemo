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
var startmain = (function (_super) {
    __extends(startmain, _super);
    function startmain() {
        return _super.call(this) || this;
    }
    startmain.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    startmain.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    startmain.prototype.init = function () {
        var _this = this;
        this.start.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            _this.addChild(new lauchmain());
        }, this);
        this.removeChild(this);
    };
    return startmain;
}(eui.Component));
__reflect(startmain.prototype, "startmain", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=startmain.js.map