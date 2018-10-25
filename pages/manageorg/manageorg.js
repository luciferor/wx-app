//manageorg.js
var api = require('../../utils/api.js');
const { $Toast } = require('../../dist/base/index');
//获取应用实例
const app = getApp()

Page({
  data: {
    organization:{},
    id:0,
    name:'组织'
  },


  //用户输入最大数据的改变
  changeNameInput(e) {
    this.setData({
      name: e.detail.value
    });
  },

  //修改组织名
  changeName(){
    let _this = this;
    api.$https('/appreciate/changecompanyname', {
      session_key: app.apiData.session_key,
      name: _this.data.name
    }, 'POST', function (data) {
      console.log(data.success)
      if (data.data.success) {
        $Toast({
          content: data.data.message
        });
      }else{
        $Toast({
          content: data.data.message
        });
      }
    }, function (data) {
      $Toast({
        content: '修改失败'
      });
    });
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
