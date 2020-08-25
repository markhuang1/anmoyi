module.exports = {
    "env": "production",
    "platform": "alipay",
    "component2": true,
    "scope": true,
    "type": "wx-alipay",
    "component": false,
    "error": false,
    "empty": false,
    "fromId": 0,
    "isReport": true,
    "useRuntimeLog": false,
    "input": "./",
    "output": "dist\\alipay-app"
,
    "hooks": {
        "appJson": function plugin (appJson) {return appJson}

    },
    "babel": {
        "plugins": []
    },
        "plugins": []
}