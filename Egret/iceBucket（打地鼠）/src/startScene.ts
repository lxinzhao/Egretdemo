class startScene extends eui.Component implements  eui.UIComponent {
	public btn_Start:eui.Button;
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
     this.height=this.stage.stageHeight;
	 this.btn_Start.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
     this.parent.addChild(new Game());
	 this.parent.removeChild(this);
	 },this);
	}
	
}