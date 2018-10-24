//plandetail.js
var api = require('../../utils/api.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    date: '',
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  onReady: function () {
    this.getPlanDetail();
  },

  //获取邦分计划详细列表
  getPlanDetail() {
    let _this = this;
    api.$https('/WeChat/appreciate/allotshow', {
      session_key: app.apiData.session_key,
      id:"19"
    }, 'POST', function (data) {
      console.log(data.data.message);
    }, function(data){
      console.log(data.data.message);
    });
  },
});

