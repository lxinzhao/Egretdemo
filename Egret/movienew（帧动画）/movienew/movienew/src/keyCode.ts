document.onkeydown = function (event) {
	let e = event;//||window.event || arguments.callee.caller.arguments[0];
	if (e) {
		keyCode.OnGetKey(e.keyCode);
	}
}
/**
 * 键盘监听
 */
class keyCode {
	public static OnKey;
	/*public static m_nRegID: number = 0;*/
	public static RegListener(fun, id: number = 0): void {
		keyCode.OnKey = fun;
		/*this.m_nRegID = id;*/
	}
	public static UnRegListener(id: number): void {
		/*if(this.m_nRegID == id){	
			this.m_nRegID = 0;
		}*/
		keyCode.OnKey = null;
	}
	public static OnGetKey(nKey: number): void {
		if (keyCode.OnKey != null) {
			//替换浏览器传来的返回键
			if (nKey == 65) nKey = VK_A;
			if (nKey == 66) nKey = VK_B;
			if (nKey == 67) nKey = VK_C;
			if (nKey == 68) nKey = VK_D;
			if (nKey == 69) nKey = VK_E;
			if (nKey == 70) nKey = VK_F;
			keyCode.OnKey(nKey);
		}
	}
}