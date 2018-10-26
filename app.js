//app.js
App({
    apiData: {
        code: '', //登录需要的code
        api: 'https://devqypyp.xiaohuibang.com', //接口根地址
        session_key: '', //response.data.message.session_key
        userstatus: true,
        Company_Id: '', //response.data.message.company_id
        isAdmin: 0,
<<<<<<< HEAD
        mutualMergeArr: [], // 创建组织时相互管理的数组参数
        selfMergeArr: [], // 创建组织时自我管理的数组参数
    },
    onload: function(opiton) {
        this.setData({
            company_id: option.company_id
        })
=======
        nickName:'',
        invite_id:''
>>>>>>> af696ba549bfc14f387d173489ed19f36167442a
    },
    onShareAppMessage: function() {
        console.log(app.apiData.Company_Id)
        return {
            title: '用邦分干了这杯事业，快来加入我们的团队吧……',
            desc: '邦分管理',
            path: '/pages/mine/mine',
            imageUrl: '../../images/minproShare.jpg',
            success: function(res) {
                console.log(res)
                wx.switchTab({
                    url: '../mine/mine',
                });
            },
            fail: function(err) {
                console.log('失败')
                console.log(err)
            }
        }
    },
    onLaunch: function() {
        console.log('onlaunch')
        var _this = this
            // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
<<<<<<< HEAD


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


                        if (_this.data.company_id != '' && _this.data.company_id == _this.apiData.Company_Id) { //必须要是由申请加入的无组织用户才会显示
                            wx.showModal({
                                title: '提示',
                                content: '恭喜！您已成功加入' + response.data.message.company_name + '！',
                                showCancel: true,
                                cancelText: '取消',
                                cancelColor: '#666666',
                                confirmText: '好的',
                                confirmColor: '#5398ff'
                            });
                        }
                        // if (response.data.message.company_id != 0 && response.data.message.company_id != '') { //判断是否有无组织，有组织的跳转到mine页面
                        //     wx.switchTab({
                        //         url: '/pages/mine/mine',
                        //         success: (result) => {

                        //         },
                        //         fail: () => {},
                        //         complete: () => {}
                        //     });
                        // }

                        //获取用户信息，并发送给后台
                        wx.getUserInfo({
                            success: function(res) {
                                console.log(res.userInfo);
                                _this.apiData.userstatus = false;
                                wx.request({
                                    url: 'https://devqypyp.xiaohuibang.com/appreciate/updateInformation',
                                    data: {
                                        session_key: response.data.message.session_key,
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
                                    success: function(res) {

                                    },
                                    fail: function(res) {},
                                    complete: function(res) {},
                                })
                            }
                        })
                    }
                })

            },
        })
=======
>>>>>>> af696ba549bfc14f387d173489ed19f36167442a
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