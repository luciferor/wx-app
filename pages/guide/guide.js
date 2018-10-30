//guide.js
//获取应用实例
const app = getApp()

Page({
    data: {
        company_id: '',
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
    onReady() {},
    onLoad: function() {
        let _this = this;
        if (_this.data.company_id != '' && _this.data.company_id == response.data.message.company_id) { //必须要是由申请加入的无组织用户才会显示
            wx.showModal({
                title: '提示',
                content: '恭喜！您已成功加入' + response.data.message.company_name + '！',
                showCancel: true,
                cancelText: '取消',
                cancelColor: '#666666',
                confirmText: '好的',
                confirmColor: '#5398ff',
                success: (result) => {
                    if (result.confirm) {

                    }
                },
                fail: () => {},
                complete: () => {}
            });
        }
    },
    onShareAppMessage: function() {
        return {
            title: '用邦分干了这杯事业，快来使用企汇邦……',
            desc: '邦分管理',
            path: '/pages/index/index',
            imageUrl: '../../images/minproTranspond.png',
            success: function(res) {},
            fail: function(err) {
                console.log('失败')
                console.log(err)
            }
        }
    },
    toCreateOrg: function() {
        console.log("跳转至创建组织")
        wx.redirectTo({
            url: '../create/create',
        });
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