//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    current:'tab1'
  },
  handleAnimalChange(_value) {
    console.log(_value);
  },
})