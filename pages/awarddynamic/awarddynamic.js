//index.js
//获取应用实例
var api = require('../../utils/api.js');
const app = getApp()

Page({
    data: {
        awardlist: []
    },
    onLoad: function() {

        api.$http(this.dosuccess, this.dofail, '/WeChat/Applet/getAwardList', {
            session_key: app.apiData.session_key,
            page: 1,
            pageSize: 10
        }, 'POST')
    },
    dosuccess(res) {
      if(res.data.success){
        this.setData({
          awardlist: res.data.message
        })
      }
    },
    dofail(err) {
        console.log(err);
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
})