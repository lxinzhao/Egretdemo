/**
* 游戏开始的界面
* GameStartPanel
*/
class GameStartPanel extends eui.Component implements eui.UIComponent {
	private stabutton: eui.Button;
	private superbutton: eui.Button;
	public static GAME_START_1: string = 'stabutton'
	public static GAME_START_2: string = 'superbutton'
	private logo: eui.Image;
	private stageHeight;
	private stageWidth;
	private gamePlayingPanel: GamePlayingPanel = new GamePlayingPanel;
	tartPanel: GameStartPanel

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
		this.stageHeight = this.stage.stageHeight;
		this.stageWidth = this.stage.stageWidth;
		this.height = this.stageHeight;
		this.width = this.stageWidth;
		this.logos();
		//按钮这些就直接放好位置了就不用再代码调整了 减轻工作量- -
		//简单的按钮
		this.stabutton.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.onTouchTap(1)
		}, this);
		this.stabutton.addEventListener(egret.TouchEvent.TOUCH_END, () => {
			this.buttonStates(this.stabutton)
		}, this);
		this.stabutton.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, () => {
			this.buttonStates(this.stabutton)
		}, this);
		//复杂的按钮
		this.superbutton.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.onTouchTap(2)
		}, this);
		this.superbutton.addEventListener(egret.TouchEvent.TOUCH_END, () => {
			this.buttonStates(this.superbutton);
		}, this);
		this.superbutton.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, () => {
			this.buttonStates(this.superbutton);
		}, this);

	}
	public onTouchTap(mode: number = 1) {
		//mode1:简单
		//mode2:疯狂
		if (mode === 1) {
			this.buttonState(this.stabutton);
			this.parent.addChildAt(this.gamePlayingPanel, 0);
			this.gamePlayingPanel.start(1)
			this.addChild(this.gamePlayingPanel)
		}
		else if (mode === 2) {
			this.buttonState(this.superbutton);
			this.parent.addChildAt(this.gamePlayingPanel, 1);
			this.gamePlayingPanel.start(2);
			//不能用new GamePlayingPanel()开始加了一个新的游戏界面所以,返回的时候会先到简单再到大厅
			this.addChild(this.gamePlayingPanel)
		}
	}
	//位移加的
	private buttonState(but: eui.Button) {
		but.x = but.x + 2;
		but.y = but.y + 2;
	}
	//位移减的
	private buttonStates(but: eui.Button) {
		but.x = but.x - 2;
		but.y = but.y - 2;
	}
	private logos() {
		//logo的动画,直接拖到画布上随便放个位置就行了
		this.logo.x = this.width / 2 - this.logo.width / 2
		this.logo.y = - this.logo.height;
		//egret.Ease.bounceOut让logo执行完动画后有一个回弹效果
		egret.Tween.get(this.logo).to({ y: 60 }, 800, egret.Ease.bounceOut)
	}

}