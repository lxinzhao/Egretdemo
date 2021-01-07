var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
document.onkeydown = function (event) {
    var e = event; //||window.event || arguments.callee.caller.arguments[0];
    if (e) {
        keyCode.OnGetKey(e.keyCode);
    }
};
/**
 * 键盘监听
 */
var keyCode = (function () {
    function keyCode() {
    }
    /*public static m_nRegID: number = 0;*/
    keyCode.RegListener = function (fun, id) {
        if (id === void 0) { id = 0; }
        keyCode.OnKey = fun;
        /*this.m_nRegID = id;*/
    };
    keyCode.UnRegListener = function (id) {
        /*if(this.m_nRegID == id){
            this.m_nRegID = 0;
        }*/
        keyCode.OnKey = null;
    };
    keyCode.OnGetKey = function (nKey) {
        if (keyCode.OnKey != null) {
            //替换浏览器传来的返回键
            if (nKey == 65)
                nKey = VK_A;
            if (nKey == 66)
                nKey = VK_B;
            if (nKey == 67)
                nKey = VK_C;
            if (nKey == 68)
                nKey = VK_D;
            if (nKey == 69)
                nKey = VK_E;
            if (nKey == 70)
                nKey = VK_F;
            keyCode.OnKey(nKey);
        }
    };
    return keyCode;
}());
__reflect(keyCode.prototype, "keyCode");
//# sourceMappingURL=keyCode.js.map