//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        current: 'tab2',
        showContent: 'tab2',
        alreadyNum: 11,
        hangyeNum: 0,
        zidingyiNum: 1,
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        hangyeArr: [{ text: '互联网' },
            { text: '电子商111务' },
            { text: '电子商务' },
            { text: '互联网' },
            { text: '电子商111务' },
            { text: '电子商务' },
            { text: '互联网' },
            { text: '电子商111务' },
            { text: '电子商务' },

        ],
        xingweiArr: [
            { text: '准时上班', score: '2' },
            { text: '准时上班', score: '4' },
            { text: '准时上班', score: '3' },
            { text: '准时上班', score: '4' },
            { text: '准时上班', score: '2' },
            { text: '准时上班', score: '2' },
            { text: '准时上班', score: '2' },
            { text: '准时上班', score: '2' },
            { text: '准时上班', score: '2' },
            { text: '准时上班', score: '2' },
        ],
        zidingyiArr: [
            { text: '每日晨會', score: '2' },
            { text: '每日晨會', score: '4' },
            { text: '每日晨會', score: '3' },
            { text: '每日晨會', score: '4' },
            { text: '每日晨會', score: '2' },
            { text: '每日晨會', score: '2' },
            { text: '积极热情', score: '2' },
            { text: '积极热情', score: '2' },
        ],
        currHangye: '',
        scoresArr: [{ score: 1 }, { score: 2 }, { score: 3 }],
        isShowScore: false,
        scoreStatus: '选择邦分'
    },
    //事件处理函数
    handleChange({ detail }) {
        this.setData({
            current: detail.key,
            showContent: detail.key,
        });
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
    selectHangye: function(e) {
        var currNum = e.currentTarget.dataset.num
        this.setData({
            currHangye: currNum
        })
    },
    pickXingwei: function(e) {
        var currNum1 = e.currentTarget.dataset.num
        this.setData({
            currXingwei: currNum1
        })
    },
    handleReset: function() { //重置

    },
    handleSure: function() { //确认

    },
    addXingwei: function() { //添加自定义行为
        this.setData({
            zidingyiArr: [
                { text: '每日晨會', score: '2' },
                { text: '每日晨會', score: '2' },
                { text: '积极热情', score: '2' },
                { text: '积极热情', score: '2' },
                { text: '每日晨會', score: '2' },
                { text: '每日晨會', score: '2' },
                { text: '积极热情', score: '2' },
                { text: '积极热情', score: '2' }
            ]
        })
    },
    scoreToggle: function() { //控制分数模态框
        this.setData({
            isShowScore: !this.data.isShowScore
        })
    },
    changeScore: function(e) { //选中自定义分数
        var score = e.currentTarget.dataset.score
        this.setData({
            scoreStatus: '+' + score + '邦分'
        })
    },
    removeXingwei: function() { //删除自定义行为
        this.setData({
            zidingyiArr: [
                { text: '每日晨會', score: '2' },
                { text: '每日晨會', score: '2' },
                { text: '积极热情', score: '2' },
                { text: '积极热情', score: '2' }
            ]
        })
    }
})