//mine.js
var api = require('../../utils/api.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showRemindBox : false,
    userInfo : {
      companyname : "",
      disposable: "",
      id:0,
      name:"",
      reduce:"",
      score:"0",
      total_score:"0",
      user_img:""
    }
  },
   onReady:function(){
      this.getUserInfo();
    },

    //获取用户信息
    getUserInfo(){
      let _this = this;
      setTimeout(function () {
        //获取用户信息
        api.$http(_this.dosuccess, _this.dofail, '/appreciate/personalcenter', {
          session_key: app.apiData.session_key
        }, 'POST');

      }, 5000)
    },

    dosuccess(data){
      this.setData({
        userInfo:data.data.message
      });
    },
    dofail(data){
      console.log('请求失败');
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
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

})
