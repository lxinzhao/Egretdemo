class lauchmain extends eui.Component implements eui.UIComponent {
	private tip: egret.TextField;
	private tips: egret.TextField;
	private tipss: egret.TextField;
	private stonenum: egret.TextField;
	private textfield: egret.TextField;
	//接收传回来的掉血值
	private insertRotate = [];
	private booldrt: eui.Label;
	private booldlt: eui.Label;
	private bloodVolume: number = 10000;
	private bloodVolumelt: number = 10000;
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	protected childrenCreated(): void {
		super.childrenCreated();
		this.init();
	}
	private init() {
		this.returnKey();
		this.createText();
		this.Loseorwin();
		this.addChild(new Mains())
		this.addChild(new Mainss())
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, () => {
			this.palyerRt();
			this.palyerLt();
		}, this)
	}
	//生成界面血量文本数值
	private text(t: any, X: number, Y: number, color: number, Size: number, te: string) {
		t = new egret.TextField();
		this.addChild(t);
		t.x = X;
		t.y = Y;
		t.textColor = color;
		t.textAlign = egret.HorizontalAlign.CENTER;
		t.size = 36;
		t.text = te;
	}
	//血量显示
	private createText() {
		//左边的血
		this.text(this.textfield, 12, 17, 0xffffff, 36, "血量剩余：");
		//右边的血
		this.text(this.textfield, 550, 17, 0xffffff, 36, ":血量剩余");
		/*this.updateLevel()*/
	}
	//判断输赢||强制归零
	private Loseorwin() {
		console.log(this.bloodVolumelt);
	}
	//传值调用随机掉血（右侧的血）
	private palyerRt() {
		//右边落下的的血
		this.tip = new egret.TextField();
		this.tip.x = 550;
		this.tip.y = 150;
		let random = (Math.floor(Math.random() * 1000)) * -1
		let bloodVolumes = this.bloodVolume += random;

		//存掉的血数值，把掉的血存到数组里 取值用数组长度-1
		/*this.insertRotate.push(bloodVolumes)
		let s: number = this.insertRotate[this.insertRotate.length - 1]*/
		/*this.text(this.textfield, 450, 17, 0xffffff, 36, s.toString());*/
		//搞了一手简单的；
		if (bloodVolumes <= 0) {
			alert("右边输了")
			bloodVolumes=0;
		}
		this.booldrt.text = bloodVolumes.toString();
		this.tip.text = random.toString();
		this.tip.textColor = 0xFF0000
		this.tip.size = 68
		egret.Tween.get(this.tip)
			.to({ y: 350 }, 800, egret.Ease.bounceOut)
			.to({ x: -1000, y: -1000 }, 20)
		this.addChild(this.tip);
	}
	//传值调用随机掉血（左侧的血）
	private palyerLt() {
		//左边落下的血
		this.tips = new egret.TextField();
		this.tips.x = 50;
		this.tips.y = 50;
		let random = (Math.floor(Math.random() * 1000)) * -1
		let bloodVolumes = this.bloodVolumelt += random;
		if (bloodVolumes <= 0) {
			bloodVolumes = 0;
			alert("左边输了")
		}
		this.tips.text = random.toString();
		this.tips.textColor = 0xFF0000
		this.tips.size = 68
		egret.Tween.get(this.tips)
			.to({ y: 200 }, 800, egret.Ease.bounceOut)
			.to({ x: -1000, y: -1000 }, 20)
		this.addChild(this.tips);
		/*this.text(this.textfield, 450, 17, 0xffffff, 36, s.toString());*/
		//搞了一手简单的；
		this.booldlt.text = bloodVolumes.toString();
	}

	//随机掉血
	private boolder(t: egret.TextField, X: number, Y: number, Tweeny: number) {
		t = new egret.TextField();
		t.x = X;
		t.y = Y;
		let random = (Math.floor(Math.random() * 1000)) * -1
		this.bloodVolume += random;
		if (this.bloodVolume <= 0) {
			alert("右边输了")
			//挂了就让血归0
			this.bloodVolume=0;
		}
		console.log(this.bloodVolume);
		//右边的血量显示
		this.booldrt.text = this.bloodVolume.toString();
		//下落的血数值
		t.text = random.toString();
		t.textColor = 0xFF0000
		t.size = 68
		egret.Tween.get(t)
			.to({ y: Tweeny }, 800, egret.Ease.bounceOut)
			.to({ x: -1000, y: -1000 }, 20)
		this.addChild(t);

	}
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
	private returnKey() {
		let father = this;
		keyCode.RegListener(function (n: number) {
			father.onkey(n);
		});
	}

	private onkey(nkey: number) {
		if (nkey === VK_A) {
			console.log("按下了A 并放出技能落岩")
			this.rock();
		}
		if (nkey === VK_B) {
			console.log("按下了B 并放出飞镖")
			this.kunai();
		}
		if (nkey === VK_C) {
			console.log("按下了C 并放出月读")
			this.moon();
		}
	}
	//生成技能的方法
	private skill(BBname: string, X, Y, W, H, time, Ty, Ea, TW, TH) {
		let stone = this.createBitmapByName(BBname);
		stone.x = X;
		stone.y = Y;
		stone.width = W;
		stone.height = H;
		egret.Tween.get(stone)
			.to({ y: Ty, width: TW, height: TH }, time, Ea)
			.to({ y: -2000 }, 20)
		this.addChild(stone);
	}
	//A技能的落石
	private rock() {
		this.skill("timg_png", 600, 0, 100, 200, 800, 300, egret.Ease.bounceOut, null, null)
		//调用的掉血方法
		this.boolder(this.stonenum, 580, 0, 300);
	}
	//B技能的飞镖
	private kunai() {
		let stone = this.createBitmapByName("kunai_png");
		stone.x = 200;
		stone.y = 420;
		stone.width = 100;
		stone.height = 20;
		egret.Tween.get(stone)
			.to({ x: 580 }, 500, egret.Ease.cubicIn)
			.to({ y: -2000 }, 20)
		this.addChild(stone);
		//调用的掉血方法
		this.boolder(this.stonenum, 580, 0, 300);
	}
	//C技能的月读
	private moon() {
		this.skill("eye_png", 50, 0, 200, 200, 500, 200, egret.Ease.circInOut, 400, 400)
		//调用的掉血方法
		this.tipss = new egret.TextField();
		this.tipss.x = 50;
		this.tipss.y = 50;
		let random = (Math.floor(Math.random() * 1000)) * -1
		let bloodVolumes = this.bloodVolumelt += random;
		if (bloodVolumes <= 0) {
			bloodVolumes = 0;
			alert("左边输了")
		}
		this.tipss.text = random.toString();
		this.tipss.textColor = 0xFF0000
		this.tipss.size = 68
		egret.Tween.get(this.tipss)
			.to({ y: 200 }, 800, egret.Ease.bounceOut)
			.to({ x: -1000, y: -1000 }, 20)
		this.addChild(this.tipss);
		/*this.text(this.textfield, 450, 17, 0xffffff, 36, s.toString());*/
		//搞了一手简单的；
		this.booldlt.text = bloodVolumes.toString();
	}
	/**
* 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
* Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
*/
	private createBitmapByName(name: string): egret.Bitmap {
		let result = new egret.Bitmap();
		let texture: egret.Texture = RES.getRes(name);
		result.texture = texture;
		return result;
	}
}

