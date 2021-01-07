class startmain extends eui.Component implements eui.UIComponent {
	private start: eui.Button;
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
		this.start.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
			this.addChild(new lauchmain());
		}, this);
		this.removeChild(this);
	}
}