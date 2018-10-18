//notice.js
//获取应用实例
const app = getApp()

Page({
  data: {
    current: 'all',
    current_scroll: 'all',
    allHidden : false,
    applyHidden : true,
    passHidden: true,
    failHidden: true
  },

  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
    if(detail.key == 'all'){
      this.setData({
        allHidden: false,
        applyHidden: true,
        passHidden: true,
        failHidden: true
      });
    } else if (detail.key == 'apply'){
      this.setData({
        allHidden: true,
        applyHidden: false,
        passHidden: true,
        failHidden: true
      });
    }else if(detail.key == 'pass'){
      this.setData({
        allHidden: true,
        applyHidden: true,
        passHidden: false,
        failHidden: true
      });
    }else{
      this.setData({
        allHidden: true,
        applyHidden: true,
        passHidden: true,
        failHidden: false
      });
    }
  },

  handleChangeScroll({ detail }) {
    this.setData({
      current_scroll: detail.key
    });
  }
});