//manageorg.js
//获取应用实例
const app = getApp()

Page({
  data: {
    yearList: [
      {
        'year':'2018',
        'monthList' : ['十一月','九月','七月']
      },
      {
        'year': '2017',
        'monthList': ['十一月', '九月', '七月']
      },
      {
        'year': '2016',
        'monthList': ['十一月', '九月', '七月']
      },
    ]
  },
  //跳转到添加邦分分配计划
  navigateToAddPlan() {
    wx.navigateTo({
      url: '../addplan/addplan'
    })
  },
  //跳转到分配计划详情
  navigateToPlanDetail() {
    wx.navigateTo({
      url: '../plandetail/plandetail'
    })
  },
  
})
