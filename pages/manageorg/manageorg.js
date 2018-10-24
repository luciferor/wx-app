//manageorg.js
var api = require('../../utils/api.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    organization:{},
    id:0,
    name:'组织'
  },

  onLoad: function () {
    this.getOrgDetail();
  },

  //获取组织信息
  getOrgDetail() {
    let _this = this;
    api.$https('/appreciate/companydetail', {
      session_key: app.apiData.session_key
    }, 'POST', function (data) {
      console.log(data.success)
      if (data.data.success) {
        _this.setData({
          name: data.data.message.name,
          id:data.data.message.id
        });
      }
    }, function (data) {
      console.log('请求失败');
    });
  },

  //跳转到分配邦分计划
  navigateToAllocationScore() {
    wx.navigateTo({
      url: '../allocationscore/allocationscore'
    })
  },
 

  //跳转到相互管理
  navigateToMutual(){
    wx.navigateTo({
      url: '../create_mutual/create_mutual'
    })
  },
  //跳转到自我管理
  navigateToSelf() {
    wx.navigateTo({
      url: '../create_self/create_self'
    })
  }
})
