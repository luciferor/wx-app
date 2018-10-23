//manageorg.js
var api = require('../../utils/api.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    yearList: [
      {
        'year':'2018',
        'monthList' : ['十一月','九月','七月']
      },
      {
        'year': '2017',
        'monthList': ['十一月', '九月', '七月']
      },
      {
        'year': '2016',
        'monthList': ['十一月', '九月', '七月']
      },
    ]
  },
  //跳转到添加邦分分配计划
  navigateToAddPlan() {
    wx.navigateTo({
      url: '../addplan/addplan'
    })
  },
  //跳转到分配计划详情
  navigateToPlanDetail() {
    wx.navigateTo({
      url: '../plandetail/plandetail'
    })
  },

  onReady: function () {
    this.getPlanList();
  },

  //获取邦分计划列表
  getPlanList() {
    let _this = this;
    api.$https('/WeChat/appreciate/allotList', {
      session_key: app.apiData.session_key
    }, 'POST',function(data){
      console.log(data.data.message);
      if (data.data.success) {
        this.setData({
          memberList: data.data.message
        });
      }
    },function(data){
      console.log('请求失败');
    });
  },  
})
