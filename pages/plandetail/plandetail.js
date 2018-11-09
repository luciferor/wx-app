//plandetail.js
var api = require('../../utils/api.js');
//获取应用实例
const app = getApp()

Page({
    data: {
        date: '',
        id: '',
        addScoreNum: 0,
        reduceScoreNum: 0,
        maxScoreNum: 0,
        count: 0
    },

    getCount() {
        let _this = this;
        api.$https('/appreciate/companycoin', {
            session_key: app.apiData.session_key,
        }, 'POST', function(data) {
            _this.setData({
              count: data.data.message.coin
            });
        }, function(data) {
            console.log('请求失败');
        });
    },

    bindDateChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },

    onReady: function() {
        this.getPlanDetail();
    },
    onShareAppMessage: function() {
        return {
            title: '用邦分干了这杯事业，快来使用企汇邦……',
            desc: '邦分管理',
            path: '/pages/index/index',
            imageUrl: '../../images/minproTranspond.png',
            success: function(res) {
                console.log(res)
            },
            fail: function(err) {
                console.log('失败')
                console.log(err)
            }
        }
    },
    onLoad: function(options) {
        this.setData({
            id: options.id
        });
        this.getCount();
    },

    //获取邦分计划详细列表
    getPlanDetail() {
        let _this = this;
        api.$https('/WeChat/appreciate/allotshow', {
            session_key: app.apiData.session_key,
            id: _this.data.id
        }, 'POST', function(data) {
            _this.setData({
                date: _this.timestampToTime(data.data.message.effective_time),
                id: data.data.message.id,
                addScoreNum: data.data.message.score,
                reduceScoreNum: data.data.message.rescore,
                maxScoreNum: data.data.message.range_max,
            })
        }, function(data) {
            console.log(data.data.message);
        });
    },

    //日期改变
    bindDateChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },

    //用户输入加分数据的改变
    changeAddValue(e) {
        this.setData({
            addScoreNum: e.detail.value
        });
    },
    //用户输入减分数据的改变
    changerReduceValue(e) {
        this.setData({
            reduceScoreNum: e.detail.value
        });
    },
    //用户输入最大数据的改变
    changeMaxValue(e) {
        this.setData({
            maxScoreNum: e.detail.value
        });
    },

    //修改邦分计划
    changePlanDetail() {
        let _this = this;
        api.$https('/WeChat/appreciate/allotshow', {
            session_key: app.apiData.session_key,
            score: this.data.addScoreNum,
            rescore: this.data.reduceScoreNum,
            range_max: this.data.maxScoreNum,
            range_min: this.data.maxScoreNum,
            effective_time: this.timeToTimestamp(this.data.date)
        }, 'POST', function(data) {

        }, function(data) {

        });
    },
    timestampToTime(timestamp) {
        var date = new Date((timestamp - 1) * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        return Y + M;
    },
    timeToTimestamp(date) {
        return Date.parse(date) / 1000;
    },
});