//organization.js
var api = require('../../utils/api.js');
const { $Toast } = require('../../dist/base/index');
//获取应用实例
const app = getApp()

Page({
    data: {
        memberList: [],
        isAdmin: app.apiData.isAdmin,
        showRemindBox: false,
        delId: ""
    },

    //事件处理函数
    onShareAppMessage: function() {
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
    onLoad: function(options) {
        wx.hideShareMenu()
        wx.updateShareMenu({
                withShareTicket: true,
                success() {}
            }),
            this.setData({
                isAdmin: app.apiData.isAdmin,
            });
    },
    onShareAppMessage: function() {
        return {
            title: '用邦分干了这杯事业，快来使用企汇邦……',
            desc: '邦分管理',
            path: '/pages//mine/mine',
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
    //跳转到组织管理
    navigateToManageOrg() {
        wx.navigateTo({
            url: '../manageorg/manageorg'
        })
    },

    onReady: function() {
        this.getMemberList();
    },

    //获取成员列表
    getMemberList() {
        let _this = this;
        api.$https('/WeChat/appreciate/memberlist', {
            session_key: app.apiData.session_key
        }, 'POST', function(data) {
            console.log(data.success)
            if (data.data.success) {
                _this.setData({
                    memberList: data.data.message
                });
            }
        }, function(data) {
            console.log('请求失败');
        });
    },

    //删除成员列表
    deleteMember() {
        let _this = this;
        _this.setData({
            showRemindBox: false,
        });
        api.$https('/WeChat/appreciate/memberdel', {
            session_key: app.apiData.session_key,
            uid: _this.data.delId
        }, 'POST', function(data) {
            $Toast({
                content: data.data.message
            });
            if (data.data.success) {
                _this.getMemberList()
            }
        }, function() {
            $Toast({
                content: '删除失败'
            });
        });
    },


    //提示框
    handleRemindOpen(e) {
        console.log("==========删除提示框")
        let _this = this;
        if (_this.data.isAdmin == 0) {
            $Toast({
                content: '你还没有权限'
            });
        } else {
            let index = e.currentTarget.id;
            let member = _this.data.memberList[index];
            if (member.isadmin == 0) {
                _this.setData({
                    showRemindBox: true,
                    delId: member.id
                });
            } else {
                $Toast({
                    content: '无法删除创建者'
                });
            }
        }
    },
    handleRemindClose() {
        this.setData({
            showRemindBox: false,
            delId: ""
        });
    },

})