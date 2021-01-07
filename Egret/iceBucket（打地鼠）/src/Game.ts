class Game extends eui.Component implements  eui.UIComponent {
   //定义用到的东西
    private stageHeight;
   	private stageWidth;
	private group: eui.Group;
	private tongNumTXT: eui.Label;
	public tongNum = 0;

    public timeDownTXT:eui.Label;
	private time=30;
    private accelerator=120;
   /* private personTweenTime = 1000;*/

/*	public  score = 0;
    private blockSourceNames: Array<string> = ["person-fs_png","person-lj_png","person-ldh_png"];
    private blockSourceNames2: Array<string> = ["person-fs-wet_png","person-lj-wet_png","person-ldh-wet_png"];*/
   
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
		egret.startTick(this.update, this);
		//timer
		let s=setInterval(()=>{
			if(this.time>0)
			{
				this.time--;
				this.timeDownTXT.text=this.time.toString();				
			}
			else
			{
				clearInterval(s);
			}
		},1000)
		this.stageHeight=this.stage.stageHeight;
		this.stageWidth=this.stage.stageWidth;
		this.height=this.stageHeight;
	}
	//人出现的速度
	private speed=1;
	private count=0;
	//控制人物出现的速度和游戏是否结束
	private update()
	{
		this.count++;
		if(this.count===Math.floor(this.accelerator/this.speed))
		{
              this.peopleChange();
			  this.count=0;
			  this.speed+=0.05;

		}
		//游戏是否结束
		if(this.time===0)
		{
          egret.stopTick(this.update,this);
		 this.parent.addChild(new gameOver());
		 this.parent.removeChild(this);
		}
     return false;
	}
	private	peopleChange()
	{
     //随机出现
	    let ran=Math.floor(Math.random()*this.group.numChildren);
	 	let g: eui.Group = <eui.Group>this.group.getChildAt(ran);
		for(let i=0;i<this.group.numChildren;i++)
		{
          // 如果随机到的group中，没有人物image，那么就创建一个
		  if(g.numChildren<4)
		  {
               if(ran===i)
			   {
				     // 在三张人物图片中随机一张
				  let random = Math.floor(Math.random() * 3);
				   //创建对应的人物图片
				  let img:egret.Bitmap=new egret.Bitmap(RES.getRes(GameUtil.peopleEnemy[random]));               
				  // 随机到的这个group 设置为可显示 
				  this.group.getChildAt(i).visible = true;
				
				g.addChild(img);
			    //给他遮罩
                img.mask=g.getChildAt(0);
				// 将人物图片放到遮罩图片下方，然后让其缓动到上方;它现在就刚好在遮罩的下方贴着遮罩
				img.y=img.y+img.height;
				//给他一个缓动的动画
				let tw=egret.Tween.get(img).to({y:img.y-img.height},1000)
				//再让它回去到初始的位置刚好在遮罩的下方贴着遮罩
				.to({y:img.y},800).call(()=>{
					//缓动结束，将遮罩的group隐藏 i
					this.group.getChildAt(i).visible=false;
					//人物图片复位
					g.getChildAt(1).visible=false;
					g.getChildAt(2).visible=false;
					//remove监听
					//从gruop中移除人物的图片
					g.removeChild(img);
					//removeEventListener删除对象的时间 谁
					img.removeEventListener(egret.TouchEvent.TOUCH_TAP,()=>{},this);
				});
				//人物的图片click处理
				img.touchEnabled=true;
				img.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
					//暂停动画
					tw.setPaused(true);
					//防止多次点击
					img.touchEnabled=false;
					this.tongNum++;
					GameUtil.Constant.score++;
					g.getChildAt(1).visible=true;
					g.getChildAt(2).visible=true;
					this.tongNumTXT.text=this.tongNum.toString();
					//替换为对应的被浇水的图
					img.texture=RES.getRes(GameUtil.peopleEnemyWet[random]);
					//动画继续播放 200ms
					setTimeout(()=>{
						tw.setPaused(false);
					},200)
				} 
				,this);
			   }
		  }
		}
	}
}