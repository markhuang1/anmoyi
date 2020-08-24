//app.js
import {request} from "./utils/request.js"//promise 请求
import {getEnum} from "./utils/common.js"
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.getOpenId()
    this.getUserInfo()
  },
  getOpenId(){//获取openid等信息
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          this.globalData.loginState = 'on'
          //发起网络请求

          // 测试代码
          this.globalData.loginState = 'success'
              if(this.loginCallback){
                this.loginCallback()
              }
              else{
                this.closeLoading()
              }
              return

          request('url','GET',{code:res.code})
          .then(res=>{
            console.log('ok',res)
            this.globalData.loginState = 'success'
            this.globalData.loginData = res
            if(this.loginCallback){
              this.loginCallback()
            }
          })
          .catch(err=>{
              this.globalData.loginState = 'success'
              if(this.loginCallback){
                this.loginCallback()
              }
              else{
                this.closeLoading()
              }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  getUserInfo(){//获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.globalData.getUserInfoState = 'success'
                this.userInfoReadyCallback(res)
              }
              else{
                this.globalData.getUserInfoState = 'success'
              }
            }
          })
        }
        else{//未授权
          if (this.userInfoReadyCallback) {
            this.globalData.getUserInfoState = 'fail'
            this.userInfoReadyCallback(false)
          }
          else{
            this.globalData.getUserInfoState = 'fail'
          }
        }
      }
    })
  },
  globalData: {//全局变量
    userInfo: null,
    getUserInfoState:'on',//获取用户信息的状态 on/正在进行，fail/未授权,success/获取成功
    loginData:'',
    loginState:'on',//获取用户openId的状态 on/正在进行，fail/获取失败,success/获取成功
    
  },
  request,
  getEnum,
  getQueryVariable(url,variable){//获取url参数
        var query = url.split('html')[1].substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
        }
        return(false);
  },
  showLoading(title = '加载中...'){
    wx.showLoading({
      title,
    })
  },
  closeLoading(){
    wx.hideLoading()
  },
  toast(value){
    wx.showToast({
      title: value,
      icon:'none'
    })
  }
})