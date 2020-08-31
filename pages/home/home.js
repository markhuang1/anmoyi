// pages/home/home.js
const app = getApp()
let options = {
  indicatorDots:true,
  autoplay:true,
  interval:3000,
  circular:true
}
let swiperList = [
  {
    url:'../../icon/banner.png',
    path:'/1'
  },
  {
    url:'../../icon/banner.png',
    path:'/2'
  },
  {
    url:'../../icon/banner.png',
    path:'/3'
  }
]
let swiperList2 = [
  {
    url:'../../icon/banner1.png',
    path:'/1'
  },
  {
    url:'../../icon/banner1.png',
    path:'/2'
  },
  {
    url:'../../icon/banner1.png',
    path:'/3'
  }
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperOptions:options,
    swiperList,
    swiperList2,
    scanner:'../../icon/scanner.png',
    hiddenScanner:false,
    deviceList:[],//价格配置列表
    deviceInfo:'',//设备信息
    imgHeight:'',//图片高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.deviceId){
      this.scannerRes(app.globalData.deviceId)
    }
      
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  clickSwiper(event){//点击轮播图
    let data = event.currentTarget.dataset
    console.log(data)
  },
  openCamera(){//打开相机或者相册，扫码
    let that = this
    wx.scanCode({
      success (res) {
        let id = app.getQueryVariable(res.result,'id')
        console.log(res.result)
        if(id){
          that.scannerRes(id)
        }
        else{
          app.toast('无效二维码')
        }
        
      },
      fail (res){
        app.toast('扫码失败')
      },
      complete (res){//测试使用
        return
        that.setData({
          hiddenScanner:true
        })
      }
    })
  },
  scannerRes(value){//扫码结果处理
      wx.showLoading({title:'加载中'})
      app.request(`massageDevice/${value}`,'GET')
      .then(res=>{
        wx.hideLoading()
        if(res.code == 0){
          let deviceInfo = res.data
          deviceInfo.stateText = app.getEnum.getDeviceState(deviceInfo.deviceStatus)
          this.setData({
            deviceInfo
          })
        }
        else{
          app.toast(res.msg)
        }
      })
      .catch(err=>{
        app.toast("请求出错")
      })
      .finally(()=>{

      })
  },
  bindload(value){//关注公众号组件加载成功触发
    console.log(value)
  },
  binderror(value){//关注公众号组件加载失败触发
    console.log(value)
  },
  setImgHeight(e){
    var winWid = wx.getSystemInfoSync().windowWidth;         //获取当前屏幕的宽度
    var imgh=e.detail.height;　　　　　　　　　　　　　　　　//图片高度
    var imgw=e.detail.width;
    var swiperH=winWid*imgh/imgw + "px"　　　　　　　　　　//等比设置swiper的高度。  即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度    ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
        imgHeight:swiperH　　　　　　　　//设置高度
    })
},
})