//index.js
//获取应用实例
var api = require('../../utils/api.js');
const app = getApp()

Page({
    data: {
        dynamiclist: [],
        isHideLoadMore: false,
        info:'没有数据了',
        page:1,
        id:0,
    },
    onLoad: function(option) {
        console.log(option)
        let arr = option.uid.split('|');
        let name = arr[1].length > 5 ? arr[1].substring(0, 4)+'...':arr[1];
        wx.setNavigationBarTitle({
          title: name + "的个人动态"
        });
        this.setData({
          id:arr[0]
        })
        api.$http(this.dosuccess, this.dofail, '/WeChat/Applet/getNoticeByUser', {
            session_key: app.apiData.session_key,
            uid: arr[0],
            page:this.data.page,
            pagesSize: 10
        }, 'POST')
    },
    dosuccess(data) {
      console.log(data);
      this.setData({
          dynamiclist: data.data.message
      })
    },
    dofail(err) {
        console.log(err)
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
    onReachBottom(){//下拉刷新
      let _this = this;
      console.log('拉到了底部了');
      this.data.page++;
      this.setData({
        isHideLoadMore:true
      })
      console.log(this.data.page);
      
      api.$http(function (res) {
        if(res.data.message.length==1){
          info:'没有更多数据了'
        }
        let content = _this.data.dynamiclist.concat(res.data.message);
        _this.setData({
          dynamiclist:content,
          isHideLoadMore:false,
        })
        //concat()//将两个数组连接起来，并不会改变数组的结构
      }, function (err) {
        
      },'/WeChat/Applet/getNoticeByUser',{
        session_key: app.apiData.session_key,
        uid:_this.data.id,
        page: _this.data.page,
        pagesSize: 10
      },'POST')
    },
})