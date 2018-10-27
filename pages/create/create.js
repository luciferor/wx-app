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
        showSelfTip: true,
        showMutualTip: true,
        showRule: false,
        visibleRule: false,
        visibleFenpei: false,
        agreementStatus: false,
        organizeName: '',
        canShare: true,
        createStatus: 1 //1:创建  2：创建中 3：分享按钮
    },
    //事件处理函数
    onShow: function() {
        this.setData({
            organizeName: app.apiData.creatOrg.createOrgName,
            showMutualTip: app.apiData.creatOrg.showMutualTip,
            showSelfTip: app.apiData.creatOrg.showSelfTip
        })
    },
    onLoad: function() {
        wx.hideShareMenu();
        wx.updateShareMenu({
            withShareTicket: true,
            success() {}
        })
    },
    onShareAppMessage: function() {
        console.log(app.apiData.Company_Id)
        wx.switchTab({
            url: '../mine/mine',
        });
        return {
            title: '用邦分干了这杯事业，快来加入我们的团队吧……',
            desc: '邦分管理',
            path: '/pages/index/index?company_id=' + app.apiData.Company_Id, // 路径，传递参数到指定页面。
            imageUrl: '../../images/minproShare.jpg',
            success: function(res) {
                console.log("转发成功", res);
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
                content: '请勾选已阅读用户协议',
                type: 'error',
                duration: 3
            });
            return;
        }
        var _this = this

        _this.setData({
            createStatus: 2
        })

        api.$http(function(res) {
            console.log(res)
            if (res.data.code == 200) {
                app.apiData.Company_Id = res.data.message
                $Toast({
                  content: '创建[' + app.apiData.creatOrg.createOrgName+']成功',
                  type: 'success',
                  duration: 3
                });
                _this.setData({
                    createStatus: 3
                })
            } else {
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
            name: app.apiData.creatOrg.createOrgName,
            selfmanaged: JSON.stringify(app.apiData.creatOrg.selfMergeArr),
            mutualmanaged: JSON.stringify(app.apiData.creatOrg.mutualMergeArr)
        }, 'POST');
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
        app.apiData.creatOrg.createOrgName = e.detail.value
    },
})