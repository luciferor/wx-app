//获取应用实例
var api = require('../../utils/api.js');
const app = getApp()

Page({
  data: {
    date: '',
    addScoreNum:0,
    reduceScoreNum:0,
    maxScoreNum:0,
  },

  addPlan(){
    let _this = this;
    api.$https('/appreciate/personalcenter', {
      session_key: app.apiData.session_key,
      
    }, 'POST', function (data) {
      this.setData({
       userInfo: data.data.message
      });
    }, function (data) {
       console.log('请求失败');
    });
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
