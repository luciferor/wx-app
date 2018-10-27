//manageorg.js
var api = require('../../utils/api.js');
//获取应用实例
const app = getApp()

Page({
    data: {
        yearList: [],
        planList: [] //计划列表
    },
    //跳转到添加邦分分配计划
    navigateToAddPlan() {
        wx.navigateTo({
            url: '../addplan/addplan'
        })
    },
    //跳转到分配计划详情
    navigateToPlanDetail(e) {
        console.log("=======" + e.currentTarget.id)
        let index = e.currentTarget.id;
        let plan = this.data.planList[index];
        wx.navigateTo({
            url: '../plandetail/plandetail?id=' + plan.id
        })
    },
    onShareAppMessage: function() {
        return {
            title: '用邦分干了这杯事业，快来使用企汇邦……',
            desc: '邦分管理',
            path: '/pages/mine/mine',
            imageUrl: '../../images/minproShare.jpg',
            success: function(res) {
                console.log(res)
            },
            fail: function(err) {
                console.log('失败')
                console.log(err)
            }
        }
    },
    onShow: function() {
        this.getPlanList();
    },

    //获取邦分计划列表
    getPlanList() {
        let _this = this;
        api.$https('/WeChat/appreciate/allotList', {
            session_key: app.apiData.session_key
        }, 'POST', function(data) {
            console.log(data.data.message);
            if (data.data.success) {
                _this.setData({
                    planList: []
                });
                let list = [];
                let planlist = data.data.message;
                for (var index in planlist) { //x = index
                    list.push({
                        id: planlist[index].id,
                        company_id: planlist[index].company_id,
                        create_time: planlist[index].create_time,
                        effective_time: _this.timestampToTime(planlist[index].effective_time),
                        from_id: planlist[index].from_id,
                        isedit: planlist[index].isedit,
                        number: planlist[index].number,
                        rescore: planlist[index].rescore,
                        total: planlist[index].total,
                        used: planlist[index].used,
                    });
                }
                _this.setData({
                    planList: list
                });
                console.log(_this.data.planList);
            }
        }, function(data) {
            console.log('请求失败');
        });
    },
    //时间戳转换成月份
    timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var M = date.getMonth();
        if (M == "0") {
            return '12月';
        } else {
            return M + '月';
        }
    }
})