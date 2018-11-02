var api = require('../../utils/api.js');
var app = getApp();
Page({
    data: {
        autoplay: true,
        interval: 5000,
        duration: 1000,
        newawardlist: [], //最新获奖
        newdynamic: [], //最新动态
        isHideLoadMore: false,
        info: '没有更多了',
        page: 1,

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
        if(data.data.success){
          this.setData({
            newawardlist: data.data.message
          });
        }
    },
    adofail(err) {
        console.log(err);
    },
    ddosuccess(data) {
      if (data.data.success) {
        this.setData({
          newdynamic: data.data.message
        })
      }
    },
    ddofail(err) {
        console.log(err);
    },
    //000000000000000000000=======0========000000000000000000000000000000
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
      let content = _this.data.newdynamic.concat(res.data.message);
      _this.setData({
        newdynamic: content,
        isHideLoadMore: false,
      })
      //concat()//将两个数组连接起来，并不会改变数组的结构
    }, function (err) {

      }, '/WeChat/Applet/getNoticeEveryOne', {
        session_key: app.apiData.session_key,
        page: _this.data.page,
        pagesSize: 10
      }, 'POST')
  },
})