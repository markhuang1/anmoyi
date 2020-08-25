//my.js
let list = [
  {leftImg:"../../img/home.png",title:'我的积分30',icon:'iconfont iconjifen',color:"#FDB61C",size:"24",deviation:0,path:''},
  {leftImg:"../../img/scanner.png",title:"18080767527",openType:'getPhoneNumber',icon:"iconfont iconmobile1",color:"#1cc0fd",size:"24",deviation:0,path:''},
  {leftImg:"../../img/my.png",title:"平台须知",icon:"iconfont iconpingtai",color:"#fd561c",size:"18",deviation:4,path:''},
  {leftImg:"../../img/my.png",title:"我的订单",icon:"iconfont icondingdan",color:"#2fcccc",size:"24",deviation:0,path:'order'},
]
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list
  },
  onLoad: function () {
    this.init()
  },
  init(){//获取用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        if(!res){//未授权
          this.closeLoading()
        }
        else{
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
        
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
            this.toIndexPage()
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    if(e.detail && e.detail.userInfo){
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
  clickCell(event){
    let data = event.currentTarget.dataset
    if(data && data.path){
      wx.navigateTo({
        url: '/pages/'+data.path+'/'+data.path
      })
    }
  },
  getPhoneNumber (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  }
})
