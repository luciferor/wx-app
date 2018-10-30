//index.js
//获取应用实例
var api = require('../../utils/api.js');
const app = getApp()

Page({
    data: {
        awardlist: [],
        isHideLoadMore: false,
        info: '没有数据了',
        page: 1,
        id: 0,

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
    onReachBottom() {//下拉刷新
      let _this = this;
      console.log('拉到了底部了');
      this.data.page++;
      this.setData({
        isHideLoadMore: true
      })
      console.log(this.data.page);

      api.$http(function (res) {
        if (res.data.message.length == 1) {
          info: '没有更多数据了'
        }
        let content = _this.data.awardlist.concat(res.data.message);
        _this.setData({
          awardlist: content,
          isHideLoadMore: false,
        })
        //concat()//将两个数组连接起来，并不会改变数组的结构
      }, function (err) {

        }, '/WeChat/Applet/getAwardList', {
          session_key: app.apiData.session_key,
          page: _this.data.page,
          pagesSize: 10
        }, 'POST')
    },
})