//mine.js
var api = require('../../utils/api.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    showRemindBox : false,
    userInfo : {
      companyname : "",
      disposable: "",
      id:0,
      name:"",
      reduce:"",
      score:"0",
      total_score:"0",
      user_img:"",
      targetList:[]
    }
  },
   onReady:function(){
      this.getUserInfo()
    },

    //获取用户信息
    getUserInfo(){
      let _this = this;
      setTimeout(function () {
        api.$https('/appreciate/personalcenter', {
          session_key: app.apiData.session_key
        }, 'POST', function (data) {
          _this.setData({
            userInfo: data.data.message
          });
        }, function (data) {
          console.log('请求失败');
        });
      }, 5000);
    },

  //获取我的目标
  getTargetList() {
    let _this = this;
    setTimeout(function () {
      api.$https('/targetmy/target', {
        session_key: app.apiData.session_key
      }, 'POST', function (data) {
        _this.setData({
          targetList: data.data.message
        });
      }, function (data) {
        console.log('请求失败');
      });
    }, 6000);
  },

  //提示框
  handleRemindOpen() {
    this.setData({
      showRemindBox: true,
    });
  },
  handleRemindClose() {
    this.setData({
      showRemindBox: false
    });
  },
  //跳转到通知界面
  navigateToNotice(){
    wx.navigateTo({
      url: '../notice/notice'
    })
  },
  //跳转到设置界面
  navigateToSetting() {
    console.log('is_iphone_x===' + app.globalData.isIpx)
    wx.navigateTo({
      url: '../setting/setting'
    })
  },
  //跳转到组织
  navigateToOrg(){
    wx.navigateTo({
      url: '../organization/organization'
    })
  },
  //跳转到我的目标
  navigateToTarget(){
    wx.navigateTo({
      url: '../target/target'
    })
  },
})
