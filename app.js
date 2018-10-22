//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        //发送 res.code 到后台换取 openId, sessionKey, unionId
        //登录，从后台获取到session_key
        //发起网络请求
        wx.request({
          url: 'https://devqypyp.xiaohuibang.com/login/miniprogram/Applet', //小程序登录
          data: {
            code: res.code,
            company_id:'1'
          },
          method: "POST",
          header: {
            'content-type': 'application/json' //默认值
          },
          success(response) {
            console.log('登录成功，设置session_key等')
            console.log(response.data.message.session_key)
            wx.setStorage({
              key: "qhb",
              data: {
                code: res.code,//登录需要的code
                api: 'https://devqypyp.xiaohuibang.com',//接口根地址
                session_key: response.data.message.session_key,//response.message.session_key
              }
            })
          },
        })
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
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})