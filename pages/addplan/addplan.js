//获取应用实例
var api = require('../../utils/api.js');
const { $Toast } = require('../../dist/base/index');
const app = getApp()

Page({
  data: {
    date: '',
    addScoreNum:0,
    reduceScoreNum:0,
    maxScoreNum:0,
    count:0,
  },

  onLoad: function () {
    this.getCount();
  },


  getCount(){
    let _this = this;
    api.$https('/appreciate/companycoin', {
      session_key: app.apiData.session_key,
    }, 'POST', function (data) {
      _this.setData({
        count: data.data.message
      });
    }, function (data) {
      console.log('请求失败');
    });
  },

  addPlan(){
    api.$https('/WeChat/appreciate/allocation', {
      session_key: app.apiData.session_key,
      score: this.data.addScoreNum,
      rescore: this.data.reduceScoreNum,
      range_max: this.data.maxScoreNum,
      range_min: this.data.maxScoreNum,
      effective_time: this.timeToTimestamp(this.data.date)
    }, 'POST', function (data) {
      console.log(data.data.message);
        $Toast({
          content: data.data.message
        });
        if(data.data.success){
          wx.navigateBack()
        }
    }, function (data) {
      $Toast({
        content: '添加失败'
      });
    });
  },

   timeToTimestamp(date){
     return Date.parse(date)/1000;
  },

  //日期改变
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  //用户输入加分数据的改变
  changeAddValue(e) {
    this.setData({
      addScoreNum: e.detail.value
    });
  },
  //用户输入减分数据的改变
  changerReduceValue(e) {
    this.setData({
      reduceScoreNum: e.detail.value
    });
  },
  //用户输入最大数据的改变
  changeMaxValue(e) {
    this.setData({
      maxScoreNum: e.detail.value
    });
  },
})
