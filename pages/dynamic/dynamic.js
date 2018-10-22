var api = require('../../utils/api.js');
var app = getApp();
Page({
  data: {
    autoplay: true,
    interval: 5000,
    duration: 1000,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    newawardlist:[],//最新获奖
    newdynamic:[],//最新动态

  },
  gotouserdynamicdes(){
    wx.navigateTo({
      url: '../../pages/userdynamic/userdynamic',
      success: (result)=>{
        console.log(result);
      },
      fail: ()=>{
        console.log("失败");
      },
      complete: ()=>{
        console.log("完成");
      }
    });
  },
  gotodwardymicdes(){
    wx.navigateTo({
      url: '../../pages/awarddynamic/awarddynamic',
      success: (result)=>{
        console.log(result);
      },
      fail: ()=>{
        console.log("失败");
      },
      complete: ()=>{
        console.log("完成");
      }
    });
  },
  rankingevents(){
    wx.navigateTo({
      url: '../../pages/ranking/ranking',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  //获取用户信息-----------------------------------------------------------------------------|||
  onLoad: function () {
    // 查看是否授权
    console.log("查看是否授权");
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          console.log("已经授权，可以直接调用 getUserInfo 获取头像昵称");
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
  },
  //获取用户信息-----------------------------------------------------------------------------|||
  //000000000000000000000=======0========000000000000000000000000000000
  onReady:function () {
    //获取最新获奖
    api.$http(this.adosuccess, this.adofail, '/WeChat/Applet/getNewestAward', {
      session_key: app.apiData.session_key
    },'POST');
    //获取最新动态
    api.$http(this.ddosuccess, this.ddofail, '/WeChat/Applet/getNoticeEveryOne', {
      pageSize: 10,
      page:1,
      session_key:app.apiData.session_key
    },'POST');
  },
  adosuccess(data) {
    console.log(data)
    this.setData({
      newawardlist: data.data.message
     })
  },
  adofail(err) {
    console.log(err);
  },
  ddosuccess(data) {
    console.log(data)
    this.setData({
      newdynamic: data.data.message
    })
  },
  ddofail(err) {
    console.log(err);
  }
  //000000000000000000000=======0========000000000000000000000000000000
})