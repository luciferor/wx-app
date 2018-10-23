//organization.js
var api = require('../../utils/api.js');
const { $Toast } = require('../../dist/base/index');
//获取应用实例
const app = getApp()

Page({
  data: {
     memberList:[
     ]
  },

  //跳转到组织管理
  navigateToManageOrg() {
    wx.navigateTo({
      url: '../manageorg/manageorg'
    })
  },

  onReady: function () {
    this.getMemberList();
  },

  //获取成员列表
  getMemberList() {
    let _this = this;
    api.$https('/WeChat/appreciate/memberlist', {
      session_key: app.apiData.session_key
    }, 'POST',function(data){
      console.log(data.success)
      if (data.data.success) {
        _this.setData({
          memberList: data.data.message
        });
      }
    },function(data){
      console.log('请求失败');
    });
  },
 
  //删除成员列表
  deleteMember(uid) {
    let _this = this;
    api.$https('/WeChat/appreciate/memberlist', {
      session_key: app.apiData.session_key,
      uid : uid
    }, 'POST',function(){
      $Toast({
        content: '删除成功'
      });
    },function(){
        //todo
    });
  },


  
})
