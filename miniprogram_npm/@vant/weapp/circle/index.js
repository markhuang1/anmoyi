'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var component_1 = require('../common/component');
var utils_1 = require('../common/utils');
var color_1 = require('../common/color');
var canvas_1 = require('./canvas');
function format(rate) {
  return Math.min(Math.max(rate, 0), 100);
}
var PERIMETER = 2 * Math.PI;
var BEGIN_ANGLE = -Math.PI / 2;
var STEP = 1;
component_1.VantComponent({
  props: {
    text: String,
    lineCap: {
      type: String,
      value: 'round',
    },
    value: {
      type: Number,
      value: 0,
      observer: 'reRender',
    },
    speed: {
      type: Number,
      value: 50,
    },
    size: {
      type: Number,
      value: 100,
      observer: function () {
        this.drawCircle(this.currentValue);
      },
    },
    fill: String,
    layerColor: {
      type: String,
      value: color_1.WHITE,
    },
    color: {
      type: [String, Object],
      value: color_1.BLUE,
      observer: function () {
        var _this = this;
        this.setHoverColor().then(function () {
          _this.drawCircle(_this.currentValue);
        });
      },
    },
    type: {
      type: String,
      value: '',
    },
    strokeWidth: {
      type: Number,
      value: 4,
    },
    clockwise: {
      type: Boolean,
      value: true,
    },
    miniRadius:{
      type: Number,
      value: 8,
    },
    padding:{
      type: Number,
      value: 15,
    }
  },
  data: {
    hoverColor: color_1.BLUE,
  },
  methods: {
    getContext: function () {
      var _this = this;
      var _a = this.data,
        type = _a.type,
        size = _a.size;
      if (type === '') {
        var ctx = wx.createCanvasContext('van-circle', this);
        return Promise.resolve(ctx);
      }
      var dpr = wx.getSystemInfoSync().pixelRatio;
      return new Promise(function (resolve) {
        wx.createSelectorQuery()
          .in(_this)
          .select('#van-circle')
          .node()
          .exec(function (res) {
            var canvas = res[0].node;
            var ctx = canvas.getContext(type);
            if (!_this.inited) {
              _this.inited = true;
              canvas.width = size * dpr;
              canvas.height = size * dpr;
              ctx.scale(dpr, dpr);
            }
            resolve(canvas_1.adaptor(ctx));
          });
      });
    },
    setHoverColor: function () {
      var _this = this;
      var _a = this.data,
        color = _a.color,
        size = _a.size;
      if (utils_1.isObj(color)) {
        return this.getContext().then(function (context) {
          var LinearColor = context.createLinearGradient(size, 0, 0, 0);
          Object.keys(color)
            .sort(function (a, b) {
              return parseFloat(a) - parseFloat(b);
            })
            .map(function (key) {
              return LinearColor.addColorStop(
                parseFloat(key) / 100,
                color[key]
              );
            });
          _this.hoverColor = LinearColor;
        });
      }
      this.hoverColor = color;
      return Promise.resolve();
    },
    presetCanvas: function (context, strokeStyle, beginAngle, endAngle, fill,botomStrokeWidth) {
      var _a = this.data,
        strokeWidth = _a.strokeWidth,
        lineCap = _a.lineCap,
        clockwise = _a.clockwise,
        size = _a.size;
        var position = size / 2;
        var radius = position - strokeWidth / 2  - this.data.padding/2;
        context.setStrokeStyle(strokeStyle);
        context.setLineWidth(botomStrokeWidth?strokeWidth/2:strokeWidth);
        context.setLineCap(lineCap);
        context.beginPath();
        context.arc(position, position, radius, beginAngle, endAngle, !clockwise);
        context.stroke();
        if (fill) {
          context.setFillStyle(fill);
          context.fill();
        }
    },
    renderLayerCircle: function (context) {
      var _a = this.data,
        layerColor = _a.layerColor,
        fill = _a.fill;
      this.presetCanvas(context, layerColor, 0, PERIMETER, fill,true);
    },
    renderHoverCircle: function (context, formatValue) {
      var clockwise = this.data.clockwise;
      // 结束角度
      var progress = PERIMETER * (formatValue / 100);
      var endAngle = clockwise
        ? BEGIN_ANGLE + progress
        : 3 * Math.PI - (BEGIN_ANGLE + progress);
      this.presetCanvas(context, this.hoverColor, BEGIN_ANGLE, endAngle);
      if(isNaN(endAngle)){
        endAngle = 0
      }
      this.drawMiniCircle(context,endAngle,this.data.color,this.data.size / 2 - this.data.strokeWidth / 2  - this.data.padding/2,this.data.padding,this.data.miniRadius)
    },
    drawCircle: function (currentValue) {
      var _this = this;
      var size = this.data.size;
      this.getContext().then(function (context) {
        context.clearRect(0, 0, size, size);
        _this.renderLayerCircle(context);
        var formatValue = format(currentValue);
        if (formatValue !== 0) {
          _this.renderHoverCircle(context, formatValue);
        }
        context.draw();
      });
    },
    reRender: function () {
      var _this = this;
      // tofector 动画暂时没有想到好的解决方案
      var _a = this.data,
        value = _a.value,
        speed = _a.speed;
      if (speed <= 0 || speed > 1000) {
        this.drawCircle(value);
        return;
      }
      this.clearInterval();
      this.currentValue = this.currentValue || 0;
      this.interval = setInterval(function () {
        if (_this.currentValue !== value) {
          if (_this.currentValue < value) {
            _this.currentValue += STEP;
          } else {
            _this.currentValue -= STEP;
          }
          _this.drawCircle(_this.currentValue);
        } else {
          _this.clearInterval();
        }
      }, 1000 / speed);
    },
    clearInterval: function () {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    drawMiniCircle(ctx,time,color,radius,padding,miniRadius){
      let circleWidth = radius + padding
      let obj = this.DegToXY(time,radius,padding)
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth=1
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.3
      ctx.arc(obj.x,obj.y+this.data.strokeWidth/2,miniRadius*0.8,0,2 * Math.PI,false);
      ctx.fill();
      ctx.beginPath()
      ctx.globalAlpha = 1
      ctx.fillStyle = color;
      ctx.arc(obj.x,obj.y+this.data.strokeWidth/2,miniRadius/2,0,2 * Math.PI,false);
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
          return i + radius+padding/2+this.data.strokeWidth/4
        }
        const spotchangeY = (i) => {
          return radius+padding/2-this.data.strokeWidth/4 - i
        }
        return {
          x: spotchangeX(point.x),
          y: spotchangeY(point.y)
        }
      }
  },
  mounted: function () {
    var _this = this;
    this.currentValue = this.data.value;
    this.setHoverColor().then(function () {
      _this.drawCircle(_this.currentValue);
    });
  },
  destroyed: function () {
    this.clearInterval();
  },
});
