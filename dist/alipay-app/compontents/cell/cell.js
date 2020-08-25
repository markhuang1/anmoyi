const _my = require("../../__antmove/api/index.js")(my);
// compontents/cell/cell.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        leftImg: {
            type: String,
            value: "../../img/home.png"
        },
        openType: {
            type: String,
            value: ""
        },
        rightImg: {
            type: String,
            value: "../../img/right.png"
        },
        title: {
            type: String,
            value: "标题"
        },
        islink: {
            type: Boolean,
            value: true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        updateClick() {
            this.triggerEvent("clickEvent");
        },

        getPhoneNumber(e) {
            console.log(e);
            this.triggerEvent("getPhoneNumber", e);
        }
    }
});
