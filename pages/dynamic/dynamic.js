//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    autoplay: true,
    interval: 5000,
    duration: 1000,
    canIUse: wx.canIUse('button.open-type.getUserInfo')

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
  }
  //获取用户信息-----------------------------------------------------------------------------|||

})