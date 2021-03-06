// compontents/power/power.js
const app = getApp()
let list = [
    {time:'10',price:'5'},
    {time:'20',price:'8'},
    {time:'30',price:'11'},
    {time:'50',price:'15'},
    {time:'60',price:'20'},
]

Component({
  /**
   * 组件的属性列表
   */
  properties: {
      value:{
        type:String,
        value: "默认值"
      },
      deviceId:{
        type:String,
        value: ""
      },
      packageList:{//套餐列表
        type:Array,
        value: []
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list:[],
    chooseOption:0,//选择的套餐
    handelType:0,//0按摩,1:充电
    loadingOrder:false,
    listObj:'',//套餐列表
    countDownObj:{//倒计时对象
      chargeOrderListTime:0,//按摩时间
      massageOrderListTime:0,//充电时间
    },
    timeData: {},
    circleValue:0
  },
  lifetimes: {
    attached: function() {
      this.init()
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setChooseOption(event){
        if(this.data.countDownObj.chargeOrderListTime){
          app.toast('设备运行中，无法重复购买时长')
          return
        }
        let res = event.currentTarget.dataset
        this.setList(res.index)
        this.setOrder()
    },
    setHandelType(event){
      
      let res = event.currentTarget.dataset
      this.setData({
        handelType:res.index,
      })
      this.setList(0)
    },
    setOrder(){//提交订单
      if(!this.properties.deviceId){
        app.toast('请先对设备进行扫码')
        return
      }
      else if(!this.data.list || !this.data.list.length){
        app.toast('请选择套餐')
        return
      }
      wx.showLoading({
        title:"支付中.."
      })
      setTimeout(()=>{
        let data = {
          userId:666,//用户ID
          packageId:this.data.list[this.data.chooseOption].id,//套餐id
          deviceId:this.properties.deviceId,//设备id
          orderCode:this.data.list[this.data.chooseOption].packageCode,//选择的套餐类型
        }
        this.setData({
          loadingOrder:true
        })
        this.submit(data)
      },1000)
    },
    submit(data){
      app.request("massageOrder","POST",data)
      .then(res=>{
        if(res.code == 0){
          this.setData({
            loadingOrder:false
          })
          wx.hideLoading()
          app.toast("下单成功")
          this.saveLocalTime()//设置时间
        }
        else{
          app.toast(res.msg)
        }
      })
      .catch(error=>{
        app.toast('出现了一个错误：0001')
      })
      .finally(()=>{
        this.setData({
          loadingOrder:false
        })
      })
    },
    saveLocalTime(){
      let obj = {
        chargeOrderListTime: this.data.countDownObj.chargeOrderListTime,
        massageOrderListTime:this.data.countDownObj.massageOrderListTime,
      }
      if(this.data.handelType == 0){//按摩
        obj.chargeOrderListTime = this.data.list[this.data.chooseOption].packageDuration * 60 * 1000
      }
      else{
        obj.massageOrderListTime = this.data.list[this.data.chooseOption].packageDuration * 60 * 1000
      }
      
      this.setData({
        countDownObj:obj
      })
    },
    init(){//获取订单配置列表
      if(this.properties.packageList && this.properties.packageList.length){
         this.data.listObj = {massageOrderList:this.properties.packageList}
         this.setList(0)
      }
      else{
        app.toast("订单列表加载失败")
      }
    },
    setList(chooseOption){
      if(!this.data.listObj){
        return
      }
      let list
      if(this.data.handelType == 0){
        list = this.data.listObj.massageOrderList//按摩
      }
      else{
        list = this.data.listObj.chargeOrderList//充电
      }
      this.initSetData(chooseOption,list)
    },
    initSetData(chooseOption,list){//初始化data数据
      console.log(chooseOption)
      this.setData({
        chooseOption,
        list,
      })
    },
    onChange(e) {//倒计时
      let value = e.detail
      let second = value.hours * 60 * 60 + value.minutes * 60 + value.seconds 
     let  circleValue = this.data.countDownObj.chargeOrderListTime ? ((this.data.countDownObj.chargeOrderListTime - second *1000) / this.data.countDownObj.chargeOrderListTime):0
    //  if(String(e.detail.hours).length<2){
    //   e.detail.hours = '0'+e.detail.hours
    //  }
    if( e.detail.minutes == 0 && e.detail.hours == 0 && e.detail.seconds == 0){
      let obj = this.data.countDownObj
      obj.chargeOrderListTime = ''
      this.setData({
          countDownObj:obj,
          timeData: e.detail,
          circleValue:0
      })
      return
   }
     if(String(e.detail.minutes).length<2){
      e.detail.minutes = '0'+e.detail.minutes
     }
     if(String(e.detail.seconds).length<2){
      e.detail.seconds = '0'+e.detail.seconds
     }
      this.setData({
        timeData: e.detail,
        circleValue:circleValue*100
      });
    },
  }
})
