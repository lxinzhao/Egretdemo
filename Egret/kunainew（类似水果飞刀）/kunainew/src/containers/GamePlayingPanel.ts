class GamePlayingPanel extends eui.Component implements eui.UIComponent {
	private timber: eui.Image;
	private bg: eui.Image;
	private kunai: eui.Image;
	private modkunai: eui.Image;
	private kuaninum: eui.Label;
	//游戏结束的界面
	private endgroup: eui.Group;
	private rectbox: eui.Rect
	private resbutton: eui.Button;
	private stabutton: eui.Button;
	private stageHeight;
	private stageWidth;
	private timberInterval: number
	// 如果是负数则逆时针转动，数值越大速度越快
	private rotations: number = 3
	private isShooting: boolean = false
	private insertRotateNoAnimate: eui.Image[] = []
	// time interval的间隔，数值越小转的越快
	private rate: number = 35
	// 改变现有旋转速度
	private rateOffset: number = 0
	private layerNum: number
	private insertRotate: itemObj[] = []
	//关卡限定 默认手里干数量
	private kunaiNum = 9;
	protected kunaiW: number = 20
	protected kunaiH: number = 100
	//默认第一关
	private levels: eui.Label
	private level: number = 1
	//游戏开始点界面传过来的参数
	private mode: number = 0;
	//得分情况
	private Scores: eui.Label;
	private Scores0: eui.Label;
	private sco: number = 0;
	//关卡模式再传回给开始界面
	/*private tartPanel: GameStartPanel=new GameStartPanel;*/
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.start(this.mode);
		this.init();
	}
	//接受开始界面传过来的参数
	public start(mode: number) {
		// mode1：简单
		// mode2：疯狂
		if (this.mode === 1) {
			/*console.log("简单的按钮")*/
		}
		else if (mode === 2) {
			let bg = new egret.Bitmap()
			bg.texture = egret.Texture = RES.getRes("2_jpg");
			this.bg.texture = bg.texture;
			bg.x = 0
			bg.y = 0
			bg.width = 414;
			bg.height = 736;
			bg.alpha = 1;
			//木桩
			let timbers = new egret.Bitmap()
			timbers.texture = egret.Texture = RES.getRes("eye_png");
			this.timber.texture = timbers.texture;
			this.timber.width = 300;
			this.timber.height = 300;
			this.timber.anchorOffsetX = this.timber.width / 2
			this.timber.anchorOffsetY = this.timber.height / 2
			this.timber.x = this.width / 2
			this.timber.y = 230
		}
		this.mode = mode
		console.log(this.mode)
	}
	private init() {
		this.stageHeight = this.stage.stageHeight;
		this.stageWidth = this.stage.stageWidth;
		this.height = this.stageHeight;
		this.width = this.stageWidth;
		this.timber.width = 200
		this.timber.height = 200
		this.timber.anchorOffsetX = this.timber.width / 2
		this.timber.anchorOffsetY = this.timber.height / 2
		this.timber.x = this.width / 2
		this.timber.y = 230

		this.startAnimation();
		this.createKunai();
	}
	//播放木桩旋转动画 
	private startAnimation(): void {
		if (this.timberInterval) {
			clearInterval(this.timberInterval)
		}
		this.timber.rotation = 0;
		this.timberInterval = setInterval(() => {
			this.timber.rotation += this.rotations
			/*console.log(this.timber.rotation);*/
		}, this.rate - this.rateOffset)
	}

	//创建游戏区域
	private createClickable() {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shoot, this)
	}

	//关卡加强
	/**
	* 射击动作
	*/
	private shoot(e: egret.TouchEvent) {
		if (this.isShooting || this.kunaiNum < 0) return
		this.isShooting = true;
		this.kunaiNum -= 1;
		/*console.log(this.kunaiNum);*/
		this.updateKunaiNum();
		const func = (): void => {
			if (this.calcCollision(this.timber.rotation)) {
				//如果坐标集合里面有了插入重复的位置，弹飞手里干
				this.flickKunai();
			}
			else {
				//加载木屑的动画
				this.woodBits();
				//射中之后让木桩抖一下
				const timberX = this.timber.x
				const timberY = this.timber.y
				egret.Tween.get(this.timber)
					.to({ x: this.timber.x - 60, y: this.timber.y - 70 }, 20, egret.Ease.bounceInOut)
					.to({ x: timberX, y: timberY }, 20, egret.Ease.bounceInOut)
					.call(() => {
						//判断动画结束后进行游戏判断
						if (this.kunaiNum <= 0) {
							this.showNext();
						}
						else {
							this.resetKunai();
							let s = this.sco += 1
							this.updateScores(s);
						}
					}, this)
				this.kunai.alpha = 0;
				//为什么显示不出来 但是已经存在了,这个是因为this.addChildAt(kunai, 1)层级的原因
				this.createRotateKunai()

			}
		}

		//手里干的射出移动
		egret.Tween.get(this.kunai)
			.to({ y: 380 }, 150, egret.Ease.cubicIn)
			.call(func, this)
	}
	//游戏界面的手里干
	private createKunai() {
		this.kunai.width = this.kunaiW;
		this.kunai.height = this.kunaiH;
		this.kunai.x = this.stageWidth / 2 - 10;
		this.kunai.y = this.stageHeight - 170;
		this.addChild(this.kunai)
		this.createRandomKunai();
		this.createClickable();
	}
	//重新游戏界面的手里干
	private resetKunai() {
		this.kunai.width = this.kunaiW;
		this.kunai.height = this.kunaiH;
		this.kunai.rotation = 0;
		this.kunai.x = this.stageWidth / 2 - 10;
		this.kunai.y = this.stageHeight - 170;
		this.kunai.alpha = 1;

		this.isShooting = false;

	}
	//数据存储木桩上的手里干，有kunaiRotate则是随机生成的苦无
	private createRotateKunai(kunaiRotate?: number) {
		const rotate = typeof kunaiRotate === 'number' ? kunaiRotate : this.timber.rotation
		const range = []
		range.push(rotate - 10)
		range.push(rotate + 10)

		//生成木桩上的手里干
		let kunai = new egret.Bitmap()
		kunai.texture = egret.Texture = RES.getRes("kunai_png");
		kunai.anchorOffsetX = 5;
		kunai.anchorOffsetY = -52;
		kunai.x = this.stage.stageWidth / 2
		kunai.y = 230;
		kunai.width = this.kunaiW;
		kunai.height = this.kunaiH;
		kunai.alpha = 1;
		// 如果是用kunaiRotate做判断需要乘以-1;
		kunai.rotation = typeof kunaiRotate === 'number' ? -kunaiRotate : 0
		this.addChildAt(kunai, 1)
		const time: number = setInterval(() => {
			kunai.rotation += this.rotations
		}, this.rate - this.rateOffset)

		//动态存储每次手里干到达的位置木桩角度
		const obj = { id: this.timber.rotation, range, kunai, time }
		this.insertRotate.push(obj)
	}

	// 消除一定数量的苦无
	private removeRotateKunai(num: number = 3) {

	}
	//木屑
	private woodBits() {
		for (let i = 0; i < 4; i++) {
			let dou = new egret.Bitmap();
			dou.texture = egret.Texture = RES.getRes("dou_png");
			dou.width = 5
			dou.height = 5
			dou.x = this.stageWidth / 2 - 1
			dou.y = 290
			this.addChild(dou)
			let random = Math.floor(Math.random() * this.stageWidth * 2)
			random = Math.random() < .5 ? random * -1 : random
			egret.Tween.get(dou)
				.to({ x: random, y: this.stageHeight }, 500, egret.Ease.sineOut)
				.call(() => {
					this.removeChild(dou)
				})
		}
	}
	// 即将到达木桩的苦无与现存于木桩的苦无进行坐标比较
	private calcCollision = (rotate: number): boolean => {
		const {insertRotate} = this;
		//some 检索即将到达木桩的苦无与现存于木桩的苦无
		return insertRotate.some((item: itemObj): boolean => {
			return (rotate <= item.range[1] && rotate >= item.range[0])
		})
	}

	// 重复苦无的动画，游戏失败等等
	private flickKunai() {
		const func = (): void => {
			setTimeout(() => {
				this.showDialog()
			}, 500)
		}
		//手里干rotation转2圈 打飞动画
		egret.Tween.get(this.kunai)
			.to({ x: this.stageWidth + 100, y: this.stageHeight + 100, rotation: 720 }, 700, egret.Ease.bounceInOut)
			.call(func, this);
	}
	//游戏结束的弹框
	private showDialog() {
		//之前报黄色提示 是因为group名字写错了
		this.endgroup.visible = true;
		this.addChild(this.endgroup);
		this.resbutton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.resetGame, this);
		this.stabutton.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.addChild(new GameStartPanel())
			//注意清除本页面时候要加parent不然会报错,如果当前删除显示对象不在显示列表之中，所以加个if判断下
			if (this.parent) {
				this.parent.removeChild(this);
			}
		}, this)
	}
	//重新开始本局
	private resetGame() {
		this.kunaiNum = 9;
		this.cleanBitmap();
		this.updateKunaiNum();
		this.resetKunai();
		this.createClickable();
		//分数
		this.updateScores(0);
		this.endgroup.visible = false;
	}
	//清除现有所有的手里干
	private cleanBitmap() {
		this.insertRotate.forEach((item: itemObj) => {
			item.kunai.parent.removeChild(item.kunai)
		})
		this.insertRotate = [];
	}
	//更新剩余的手里干
	private updateKunaiNum() {
		this.kuaninum.text = this.kunaiNum.toString();
	}
	//下一关卡
	private showNext() {
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
		this.createRandomKunai()
	}
	/**
    * 每过一关改变关卡过关方式，并重新生成已在木桩上的苦无
    */
	private createRandomKunai() {
		if (this.level !== 1) {
			const random = Math.floor(Math.random() * this.level);
			//随机角度，然后传回给createRotateKunai生成木桩上的手里干
			for (let i = 1; i < random; i++) {
				let r = Math.floor(Math.random() * 180)
				r = Math.random() < .5 ? r * -1 : r
				this.createRotateKunai(r)
			}
		}
	}
	private updateScores(s: number) {
		this.Scores.text = s.toString();
		this.Scores0.text = s.toString();
	}
	//生成无动画的手里干,生成木桩上的手里干
	/*	private createRotateKunaiNoAnimate(rotate: number) {
			this.kunai.anchorOffsetX = 5;
			this.kunai.anchorOffsetY = -52;
			this.kunai.x = this.stageWidth / 2;
			this.kunai.y = 230;
			this.kunai.width = this.kunaiW;
			this.kunai.height = this.kunaiH;
			// 如果是用kunaiRotate做判断需要乘以-1
			this.kunai.rotation = - rotate
			this.addChildAt(this.kunai, 1)
	
			this.insertRotateNoAnimate.push(this.kunai)
		}*/
}

interface itemObj {
	id: number
	range: number[]
	kunai: egret.Bitmap
	time: number
}
