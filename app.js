//app.js
App({
  onLaunch: function () {
    var _this = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              _this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (_this.userInfoReadyCallback) {
                _this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    }),
    wx.getSystemInfo({
      success: function(res) {
        if (res.model == 'iPhone X') {
          _this.globalData.isIpx = true;
        }
      },
    })
  },
  globalData: {
    userInfo: null,
    isIpx: false,
  },
  config:{
    title_height: "64",
    statusbarHeight: "24",
    titleIcon_height: "32",
    titleIcon_width: "87",
    title_top: "24",
    title_text: "xxx", // iphone X + 24        
    prefix: 24,
    x_statusbarHeight:'48',
    x_title_height : '88'
  }
})