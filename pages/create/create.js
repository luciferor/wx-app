var api = require('../../utils/api.js');
const {
    $Toast
} = require('../../dist/base/index');

//获取应用实例
const app = getApp()

Page({
    data: {
        isRead: false,
        showTip: true,
        showRule: false,
        visibleRule: false,
        visibleFenpei: false,
        agreementStatus: false,
        organizeName: '',
        canShare: true,
        createStatus: 1 //1:创建  2：创建中 3：分享按钮
    },
    //事件处理函数
    onShareAppMessage: function() {
        console.log(app.apiData.Company_Id)
        return {
            title: '用邦分干了这杯事业，快来加入我们的团队吧……',
            desc: '邦分管理',
            path: '/pages/mine/mine?company_id=' + app.apiData.Company_Id, // 路径，传递参数到指定页面。
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
    createOrg() {
        if (this.data.organizeName == '') {
            $Toast({
                content: '请填写组织名称',
                type: 'error',
                duration: 3
            });
            return;
        }
        if (this.data.isRead == false) {
            $Toast({
                content: '请勾选已阅读合同',
                type: 'error',
                duration: 3
            });
            return;
        }

        var _this = this
        var _organizeName = _this.data.organizeName
        _this.setData({
            createStatus: 2
        })

        api.$http(function(res) {
            console.log(res)
            if (res.data.code == 200) {
                app.apiData.Company_Id = res.data.message
                wx.showShareMenu();
                _this.setData({
                    createStatus: 3
                })
            } else {
                wx.hideShareMenu();
                _this.setData({
                    createStatus: 1
                })
                $Toast({
                    content: '创建失败:' + res.data.message,
                    type: 'error',
                    duration: 4
                });
            }
        }, function(err) {
            console.log(err)
        }, '/organization/create', {
            session_key: app.apiData.session_key,
            name: _organizeName,
            selfmanaged: JSON.stringify(app.apiData.selfMergeArr),
            mutualmanaged: JSON.stringify(app.apiData.selfMergeArr)
        }, 'POST');
    },
    onLoad: function() {
        wx.hideShareMenu();
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
            isRead: detail.current
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
})