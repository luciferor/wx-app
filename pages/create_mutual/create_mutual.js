var api = require('../../utils/api.js');
const { $Toast } = require('../../dist/base/index');

//获取应用实例
const app = getApp()

Page({
    data: {
        current: 'tab1',
        showContent: 'tab1',
        alreadyNum: 11,
        hangyeNum: 0,
        zidingyiNum: 1,
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        RomoveMoadal: false,
        hangyeArr: [{
                "id": 934,
                "industry_id": "49",
                "name": "建筑安装业"
            },
            {
                "id": 941,
                "industry_id": "50",
                "name": "建筑装饰和其他建筑业"
            },
            {
                "id": 951,
                "industry_id": "51",
                "name": "批发业"
            },
            {
                "id": 1018,
                "industry_id": "52",
                "name": "零售业"
            },
            {
                "id": 1084,
                "industry_id": "53",
                "name": "铁路运输业"
            }
        ],
        xingweiArr: [{
                "id": 1,
                "behavior": "测试内容---1",
                "operation": 1,
                "score": 1
            },
            {
                "id": 4,
                "behavior": "测试内容---2",
                "operation": 1,
                "score": 2
            },
            {
                "id": 5,
                "behavior": "测试内容---3",
                "operation": 1,
                "score": 3
            }
        ],
        zidingyiArr: [{
                text: '每日晨會',
                score: '+2'
            },
            {
                text: '每日晨會',
                score: '-4'
            },
            {
                text: '积极热情',
                score: '+2'
            },
            {
                text: '积极热情',
                score: '-2'
            },
        ],
        currHangye: '',
        scoresArr: [{
            score: 1
        }, {
            score: 2
        }, {
            score: 3
        }],
        isShowScore: false,
        scoreStatus: '选择邦分',
        typeArray: ['加分', '减分'],
        typeIndex: 0,
    },
    //事件处理函数
    handleChange({
        detail
    }) {
        console.log(detail)
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
    onReady: function() {
        var _this = this
        api.$http(function(res) {
            if (res.data.message.length == 0) {
                console.log('行业为空')
            } else {
                _this.setData({
                    hangyeArr: res.data.message
                })
            }

        }, function(err) {
            console.log(err)
        }, '/appreciate/industry', {
            session_key: app.apiData.session_key
        }, 'POST');
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

        var data_industryId = e.currentTarget.dataset.industryId
        var _this = this
        api.$http(function(res) {
            if (res.data.message.length == 0) {
                console.log('行为为空')
            } else {
                _this.setData({
                    xingweiArr: res.data.message
                })
            }
        }, function(err) {
            console.log(err)
        }, '/appreciate/behavior', {
            industry_id: data_industryId,
            session_key: app.apiData.session_key
        }, 'POST');
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
        var addRes = this.data.zidingyiArr
        addRes.push({
            text: '新增测试行为',
            score: '+2'
        })
        this.setData({
            zidingyiArr: addRes
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
            scoreStatus: score + '邦分'
        })
    },
    removeXingwei: function(e) { //删除自定义行为
        this.setData({
            RomoveModal: true
        });
    },
    bindPickerChange: function(e) {
        console.log(e.detail)
        this.setData({
            typeIndex: e.detail.value
        })
    },
    OKRomove(e) {
        var _this = this
        let removeRes = _this.data.zidingyiArr
        let idx = e.target.dataset.idx
        removeRes.splice(idx, 1);
        _this.setData({
            zidingyiArr: removeRes
        })
        $Toast({
            content: '删除成功',
            type: 'success'
        });
        this.setData({
            RomoveModal: false
        });
    },

    CancelRomove() {
        this.setData({
            RomoveModal: false
        });
    },
})