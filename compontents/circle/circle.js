// compontents/circle/circle.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    times:{
      type:Number,
      value:0.1
    },
    color:{
      type:String,
      value:'rgba(47,198,204)'
    },
    padding:{
      type:Number,
      value:10
    },
    radius:{
      type:Number,
      value:140
    },
    miniRadius:{
      type:Number,
      value:8
    }
  },
  observers:{
    times(times){
      this.draw(times,this.data.color,this.data.padding,this.data.radius,this.data.miniRadius)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    ctx:''
  },
  onReady(){
    this.draw(this.data.times,this.data.color,this.data.padding,this.data.radius,this.data.miniRadius)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    draw(time,color,padding=0,radius,miniRadius){
      if(time == 'no'){
        return
      }
      
      if(this.data.ctx){
        let ctx = this.data.ctx
        ctx.clearRect(0,0,(radius+padding)*2,(radius+padding)*2)
        this.drawBottomCircle(ctx,color,padding,radius)
        this.drawOutCircle(ctx,time,color,padding,radius)
        this.drawMiniCircle(ctx,time,color,radius,padding,miniRadius)
        return
      }
      let _this = this
      wx.createSelectorQuery()
      .in(_this)
      .select('#canvas')
      .node()
      .exec((res)=>{
        this.data.ctx = res[0].node.getContext('2d')
        let ctx = this.data.ctx
        ctx.clearRect(0,0,(radius+padding)*2,(radius+padding)*2)
        this.drawBottomCircle(ctx,color,padding,radius)
        this.drawOutCircle(ctx,time,color,padding,radius)
        this.drawMiniCircle(ctx,time,color,radius,padding,miniRadius)
      })
      
    },
    drawBottomCircle(ctx,color,padding,radius){
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth=1
      ctx.globalAlpha = 0.5
      ctx.arc(radius+padding,radius+padding,radius,0,2*Math.PI);
      ctx.stroke();
    },
    drawOutCircle(ctx,time,color,padding,radius){
      ctx.beginPath()
      ctx.globalAlpha = 1
      ctx.strokeStyle = color
      ctx.lineWidth=4
      ctx.arc(radius+padding,radius+padding,radius,-90*Math.PI / 180,time*360* Math.PI / 180 -90*Math.PI / 180,false);
      ctx.stroke();
    },
    drawMiniCircle(ctx,time,color,radius,padding,miniRadius){
      let circleWidth = radius + padding
      let obj = this.DegToXY(time*360* Math.PI / 180 -90*Math.PI / 180,radius,padding)
      console.log(obj)
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth=1
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.5
      ctx.arc(obj.x,obj.y,miniRadius,0,2 * Math.PI,false);
      ctx.fill();
      ctx.beginPath()
      ctx.globalAlpha = 1
      ctx.fillStyle = color;
      ctx.arc(obj.x,obj.y,miniRadius/2,0,2 * Math.PI,false);
      ctx.fill();
    },
     DegToXY(deg,radius,padding) {
        let d = 2 * Math.PI - deg;
        return this.respotchangeXY({
          x: radius * Math.cos(d),
          y: radius * Math.sin(d)
        },radius,padding)
      },
    
      //canvas坐标转化为中心坐标
      respotchangeXY(point,radius,padding) {
        const spotchangeX = (i) => {
          return i + radius+padding
        }
        const spotchangeY = (i) => {
          return radius+padding - i
        }
        return {
          x: spotchangeX(point.x),
          y: spotchangeY(point.y)
        }
      }
  }
})
