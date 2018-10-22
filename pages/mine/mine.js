//mine.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showRemindBox : false
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
