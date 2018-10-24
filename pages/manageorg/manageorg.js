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
