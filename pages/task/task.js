//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    current:'tab1',
    currentIndex: 0,
    "firstList": ["不二家棒棒糖", "清风湿至今", "床上四件套", "其他噢", "我要加一百分", "野心勃勃"],
    "secondList": ["帮助他人", "保持桌面清洁", "有责任心", "乱丢垃圾", "随地吐痰", "不讲卫生"]
  },
  handleAnimalChange(_value) {
    console.log(_value);
  },
  //swiper切换时会调用
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 2
      this.setData({
        currentIndex: currentPageIndex
      })
    }
  },
  //用户点击tab时调用
  titleClick: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  }
})