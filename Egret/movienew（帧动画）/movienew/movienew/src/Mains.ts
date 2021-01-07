 class Mains extends egret.DisplayObjectContainer {
    private _mcData: any;
    private _mcTexture: egret.Texture;
    private tip: egret.TextField
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

    }
    private onAddToStage(event: egret.Event) {
        this.load(this.initMovieClip);
    }

    private initMovieClip(): void {
        /*** 本示例关键代码段开始 ***/
        var mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
        //左边的怪
        var role: egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData("attack1"));
        this.addChild(role);
        //第一次窗体加载成功后人物的帧动画,暂时不需要这个东西
        /*role.gotoAndPlay(1, 3);*/
        role.x = -150;
        role.y = 150;
        //这里是用户触摸事件，并在这个触摸事件中又加了一个事件的把上面的count传过来
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e: egret.TouchEvent): void {
             role.gotoAndPlay(1, 0);
            //怪的移动动画
            egret.Tween.get(role)
                .to({ x: role.x + 320 }, 300, egret.Ease.bounceInOut)
                .to({ x: role.x = -150, y: role.y = 150 }, 300, egret.Ease.bounceInOut)
        }, this)
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
        var request = new egret.URLRequest("resource/assets/mc/binleft.png");
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
        var request = new egret.URLRequest("resource/assets/mc/binleft.json");
        loader.load(request);
    }
}
