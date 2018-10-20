//organization.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  //跳转到组织管理
  navigateToManageOrg() {
    wx.navigateTo({
      url: '../manageorg/manageorg'
    })
  },
})
