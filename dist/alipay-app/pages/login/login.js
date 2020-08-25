const _my = require("../../__antmove/api/index.js")(my);
//获取应用实例
const app = getApp();
Page({
    data: {},
    onLoad: function(options) {
        if (options.id) {
            app.globalData.deviceId = options.id;
        }

        this.init();
    },

    init() {
        //获取用户关注信息
        if (app.globalData.loginState == "success") {
            //获取openId成功
            app.closeLoading();
            this.toIndexPage(); //跳转主页
        } else if (app.globalData.loginState == "on") {
            //获取中
            app.showLoading();
            app.loginCallback = this.loginCallback;
        } else {
            //获取失败
            app.showLoading();

            _my.showToast({
                icon: "none",
                title: "登录失败，请重试"
            });
        }
    },

    loginCallback() {
        this.init();
    },

    toIndexPage() {
        _my.switchTab({
            url: "/pages/home/home"
        });
    }
});
