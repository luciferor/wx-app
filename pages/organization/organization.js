//organization.js
var api = require('../../utils/api.js');
const { $Toast } = require('../../dist/base/index');
//获取应用实例
const app = getApp()

Page({
    data: {
        memberList: [],
        isAdmin: app.apiData.isAdmin
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
    deleteMember(e) {
        let index = e.currentTarget.id;
        let member = this.data.memberList[index];
        if (this.data.isAdmin == 0) {
            $Toast({
                content: '你还没有权限'
            });
        } else {
            if (member.isadmin == 0) {
                api.$https('/WeChat/appreciate/memberlist', {
                    session_key: app.apiData.session_key,
                    uid: member.id
                }, 'POST', function() {
                    $Toast({
                        content: '删除成功'
                    });
                }, function() {});
            }
        }
    },



})