var api = require('../../utils/api.js');
//获取应用实例
const app = getApp()

Page({
    data: {
        checked: false,
        showTip: true,
        showRule: false,
        visibleRule: false,
        visibleFenpei: false,
        agreementStatus: false,
        organizeName: '',
        creatCompany: 187
    },
    //事件处理函数
    onShareAppMessage: function() {
        return {
            title: '用邦分干了这杯事业，快来加入我们的团队吧……',
            desc: '邦分管理',
            path: '/pages/setting/setting?company_id=' + this.data.creatCompany, // 路径，传递参数到指定页面。
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
    onLoad: function() {
        wx.updateShareMenu({
            withShareTicket: true,
            success() {}
        })
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    handleAgreementChange({
        detail = {}
    }) {
        this.setData({
            checked: detail.current
        });
    },
    toggleRule: function(e) {

        var showRule = this.data.showRule
        var visibleRule = this.data.visibleRule
        this.setData({
            showRule: !showRule,
            visibleRule: !visibleRule
        })
    },
    openAgreement() {
        this.setData({
            agreementStatus: true
        });
    },
    closeAgreement() {
        this.setData({
            agreementStatus: false
        });
    },
    openFenpei() {
        this.setData({
            visibleFenpei: true
        });
    },
    closeFenpei() {
        this.setData({
            visibleFenpei: false
        });
    },
    bindKeyInput: function(e) {
        this.setData({
            organizeName: e.detail.value
        })
    },
    createOrg() {
        var _this = this
        var _organizeName = _this.data.organizeName
        var _selfmanaged = [{
            "id": 1,
            "behavior": "测试内容---1",
            "type": "1",
            "score": "1"
        }, {
            "id": "",
            "behavior": "我是自定义的自我管理",
            "type": "1",
            "score": "1"
        }]
        var _mutualmanaged = [{
            "id": 4,
            "behavior": "测试内容---2",
            "type": "1",
            "score": "2"
        }, {
            "id": "",
            "behavior": "我是自定义的相互管理",
            "type": "1",
            "score": "2"
        }]

        api.$http(function(res) {
            console.log(res)
        }, function(err) {
            console.log(err)
        }, '/organization/create', {
            session_key: app.apiData.session_key,
            name: _organizeName,
            selfmanaged: JSON.stringify(_selfmanaged),
            mutualmanaged: JSON.stringify(_mutualmanaged)
        }, 'POST');
    },

})