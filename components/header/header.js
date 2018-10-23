// components/header/header.js
const app = getApp();
Component({
  properties: {
    isShow: { // 是否显示后退按钮            
      type: String,
      value: "1"
    },
    isIndex: { // 是否主页            
      type: Boolean,
      value: false,
    },
    title_height: {             
      type: String,
      value: app.globalData.isIpx ? app.config.x_title_height : app.config.title_height,
    },
    titleIcon_height: {
      type: String,
      value: app.config.titleIcon_height,
    },
    titleIcon_width: {
      type: String,
      value: app.config.titleIcon_width,
    },
    statusbarHeight: {
      type: String,
      value: app.globalData.isIpx ? app.config.x_statusbarHeight :app.config.statusbarHeight,
    },
    title_top: {
      type: String,
      value: app.config.title_top,
    },
    title_text: {
      type: String,
      value: app.config.title_text,
    },
  },
  methods: {
    _goBack: function () {
      wx.navigateBack({
        delta: 1
      });
    },
  
  }
})
