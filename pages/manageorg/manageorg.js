//manageorg.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  //跳转到分配邦分计划
  navigateToAllocationScore() {
    wx.navigateTo({
      url: '../allocationscore/allocationscore'
    })
  },
})
