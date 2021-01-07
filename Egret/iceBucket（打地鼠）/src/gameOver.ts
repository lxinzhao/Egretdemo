class gameOver extends eui.Component implements  eui.UIComponent {
	private	btnPlayAgain:eui.Button;
	private scoreText:eui.Label;
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
	}
	private init()
	{
		this.height=this.stage.height;
		this.scoreText.text=GameUtil.Constant.score.toString();
		this.btnPlayAgain.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
        this.parent.addChild(new Game());
		GameUtil.Constant.score=0;
		//移除页应该放在最后 不然会报错
		this.parent.removeChild(this);		
		},this);
	}
}