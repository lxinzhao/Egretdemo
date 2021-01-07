class Mainss extends egret.DisplayObjectContainer {
    private _mcData: any;
    private _mcTexture: egret.Texture;
    private role: egret.MovieClip
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {
        this.load(this.initMovieClip);
    }

    public initMovieClip(): void {
        /*** 本示例关键代码段开始 ***/
        var mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
        //右边的怪
        this.role = new egret.MovieClip(mcDataFactory.generateMovieClipData("attack"));
        this.addChild(this.role);
        /*role.gotoAndPlay(1, 3);*/
        this.role.x = 600;
        this.role.y = 370;
        //这里是用户触摸事件，并在这个触摸事件中又加了一个事件的把上面的count传过来
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e: egret.TouchEvent): void {
            this.role.gotoAndPlay(1, 0);
            this.plarymov();
            //怪的移动动画
        }, this);
    }
    protected load(callback: Function): void {
        var self = this;
        var check = function () {
            callback.call(self)
        }
        ///获取位图
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;
            this._mcTexture = loader.data;
            check();
        }, this);
        //指定以位图纹理形式接收已下载的数据。
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        //获取位图
        var request = new egret.URLRequest("resource/assets/mc/bin.png");
        //加载 位图
        loader.load(request);

        //获取位图资源的josn文件
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;
            this._mcData = JSON.parse(loader.data);
            check();
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var request = new egret.URLRequest("resource/assets/mc/bin.json");
        loader.load(request);
    }
    private plarymov() {
        egret.Tween.get(this.role)
            .to({ x: this.role.x + 10, y: this.role.y - 5 }, 300, egret.Ease.bounceInOut)
            .to({ x: this.role.x, y: this.role.y }, 20, egret.Ease.bounceInOut)
    }
}
