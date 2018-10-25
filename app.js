//app.js
App({
    data: {
        company_id: '', //企业id
    },
    apiData: {
        code: '', //登录需要的code
        api: 'https://devqypyp.xiaohuibang.com', //接口根地址
        session_key: '', //response.data.message.session_key
        userstatus: true,
        Company_Id: '', //response.data.message.company_id
        isAdmin: 0,
    },
    onLaunch: function() {
        console.log('onlaunch')
        var _this = this
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
                        company_id: _this.data.company_id
                    },
                    method: "POST",
                    header: {
                        'content-type': 'application/json' //默认值
                    },
                    success(response) {
                        console.log('查看信息')
                        console.log(response)
                        _this.apiData.code = res.code; //登录需要的code
                        _this.apiData.session_key = response.data.message.session_key; //response.message.session_key
                        _this.apiData.Company_Id = response.data.message.company_id;
                        _this.apiData.isAdmin = response.data.message.isadmin;
                        //*****
                        //*
                        wx.getUserInfo({
                          success:function(){
                            wx.request({
                              url: 'https://devqypyp.xiaohuibang.com/appreciate/updateInformation',
                              data: {
                                session_key: app.apiData.session_key,
                                nickname: res.userInfo.nickName,
                                avatarurl: res.userInfo.avatarUrl,
                                gender: res.userInfo.gender,
                                province: res.userInfo.province,
                                city: res.userInfo.city,
                                country: res.userInfo.country,
                              },
                              header: {
                                'content-type': 'application/json' //默认值
                              },
                              method: 'POST',
                              success: function (res) {
                                _this.apiData.userstatus = false
                              },
                            })
                          },
                          fail:function(){
                            if (response.data.message.company_id != 0 && response.data.message.company_id != '') {
                              wx.switchTab({
                                url: '/pages/mine/mine',
                              });
                            }
                          }
                        })
                        //*
                        //***** */
                    }
                })
            },
        })
    },
    globalData: {
        userInfo: null,
        isIpx: false,
    },
    config: {
        title_height: "64",
        statusbarHeight: "24",
        titleIcon_height: "32",
        titleIcon_width: "87",
        title_top: "24",
        title_text: "xxx", // iphone X + 24        
        prefix: 24,
        x_statusbarHeight: '48',
        x_title_height: '88'
    }
})