//notice.js
var api = require('../../utils/api.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    current: 'all',
    current_scroll: 'all',
    allHidden : false,
    applyHidden : true,
    passHidden: true,
    failHidden: true,
    allNotice:[],//全部
    applyNotice:[],//待审核
    passNotice:[],//已通过
    rejectNotice:[],//未通过
    allPage : 1,
    applyPage : 1,
    passPage : 1,
    rejectPage : 1
  },

  onReady: function () {
    this.getNoticeList(0,1);
  },

  getNoticeList(types,pages){
    let _this = this;
    api.$https('/noticelist/target', {
      session_key: app.apiData.session_key,
      type : types,
      page : pages
    }, 'POST', function(data){
        if(data.data.success){
            _this.dosuccess(types,pages,data.data.message)
        }
    },function(){
      console.log(请求失败);
    });
  },

  dosuccess(types, page,data) {
    if(types == 0){
      if(page == 1){
        this.setData({
          allNotice: []
        });
      }
      this.setData({
        allNotice:this.data.allNotice.concat(data)
      })
    }else if(types == 1){
      if (page == 1) {
        this.setData({
          applyNotice: []
        });
      }
      this.setData({
        applyNotice: this.data.applyNotice.concat(data)
      })

    }else if(types == 2){
      if (page == 1) {
        this.setData({
          passNotice: []
        });
      }
      this.setData({
        passNotice: this.data.passNotice.concat(data)
      })
    }else if(types == 3){
      if (page == 1) {
        this.setData({
          rejectNotice: []
        });
      }
      this.setData({
        rejectNotice: this.data.rejectNotice.concat(data)
      })
    }
  },
  
  //切换tab
  handleChange({ detail }) {
    let _this = this;
    _this.setData({
      current: detail.key
    });
    if(detail.key == 'all'){
      _this.setData({
        allHidden: false,
        applyHidden: true,
        passHidden: true,
        failHidden: true
      });
      _this.getNoticeList(0, _this.data.allPage);
    } else if (detail.key == 'apply'){
      _this.setData({
        allHidden: true,
        applyHidden: false,
        passHidden: true,
        failHidden: true
      });
      _this.getNoticeList(1, _this.data.applyPage);
    }else if(detail.key == 'pass'){
      _this.setData({
        allHidden: true,
        applyHidden: true,
        passHidden: false,
        failHidden: true
      });
      _this.getNoticeList(2, _this.data.passPage);
    }else{
      _this.setData({
        allHidden: true,
        applyHidden: true,
        passHidden: true,
        failHidden: false
      });
      _this.getNoticeList(3, _this.data.rejectPage);
    }
  },
  //处理滚动
  handleChangeScroll({ detail }) {
    this.setData({
      current_scroll: detail.key
    });
  }
});