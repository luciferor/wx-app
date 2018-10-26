var api = require('../../utils/api.js');
var app = getApp();
Page({
    data: {
        autoplay: true,
        interval: 5000,
        duration: 1000,
        newawardlist: [], //最新获奖
        newdynamic: [], //最新动态

    },
    awardevent() {
        wx.navigateTo({
            url: '../../pages/awarddynamic/awarddynamic',
        })
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
    gotouserdynamicdes(e) {
        console.log(e);
        wx.navigateTo({
            url: '../../pages/userdynamic/userdynamic?uid=' + e.currentTarget.id,
        });
    },
    gotodwardymicdes() {
        wx.navigateTo({
            url: '../../pages/awarddynamic/awarddynamic',
        });
    },
    rankingevents() {
        wx.navigateTo({
            url: '../../pages/ranking/ranking',
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });
    },
    //-----------------------------------------------------------------------------|||
    onLoad: function() {
        // 查看是否授权
    },
    bindGetUserInfo: function(e) {
        console.log(e.detail.userInfo)
    },
    //-----------------------------------------------------------------------------|||
    //000000000000000000000=======0========000000000000000000000000000000
    onReady: function() {
        //获取最新获奖
        api.$http(this.adosuccess, this.adofail, '/WeChat/Applet/getNewestAward', {
            session_key: app.apiData.session_key
        }, 'POST');
        //获取最新动态
        api.$http(this.ddosuccess, this.ddofail, '/WeChat/Applet/getNoticeEveryOne', {
            pageSize: 10,
            page: 1,
            session_key: app.apiData.session_key
        }, 'POST');
    },
    onShow: function() {
        //获取最新获奖
        api.$http(this.adosuccess, this.adofail, '/WeChat/Applet/getNewestAward', {
            session_key: app.apiData.session_key
        }, 'POST');
        //获取最新动态
        api.$http(this.ddosuccess, this.ddofail, '/WeChat/Applet/getNoticeEveryOne', {
            pageSize: 10,
            page: 1,
            session_key: app.apiData.session_key
        }, 'POST');
    },
    adosuccess(data) {
        console.log(data)
        this.setData({
            newawardlist: data.data.message
        })
    },
    adofail(err) {
        console.log(err);
    },
    ddosuccess(data) {
        console.log(data)
        this.setData({
            newdynamic: data.data.message
        })
    },
    ddofail(err) {
        console.log(err);
    }
    //000000000000000000000=======0========000000000000000000000000000000
})