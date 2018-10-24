//guide.js
//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        imgUrls: [
            '../../images/guide/img_yindaoye_1.png',
            '../../images/guide/img_yindaoye_2.png',
            '../../images/guide/img_yindaoye_3.png',
            '../../images/guide/img_yindaoye_4.png',
        ],
        showBtn: false,
    },
    onLoad: function() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                console.log(res)
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
    swiperfinish: function(e) {
        console.log(e.detail)
        console.log(e.detail.current)
            //判断是不是尾页，尾页才显示按钮
        var nowpage = e.detail.current
        var showBtn = this.data.showBtn
        if (nowpage == 3) {
            this.setData({
                showBtn: true
            })
        } else {
            this.setData({
                showBtn: false
            })
        }

    }
})