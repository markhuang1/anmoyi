const _my = require("../../../../__antmove/api/index.js")(my);
function Behavior(behavior) {
    behavior.$id = Number(new Date()) + String(Math.random()).substring(2, 7);
    return behavior;
}

("use strict");

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.link = void 0;
exports.link = Behavior({
    properties: {
        url: String,
        linkType: {
            type: String,
            value: "navigateTo"
        }
    },
    methods: {
        jumpLink: function(urlKey) {
            if (urlKey === void 0) {
                urlKey = "url";
            }

            var url = this.data[urlKey];

            if (url) {
                _my[this.data.linkType]({
                    url: url
                });
            }
        }
    }
});
