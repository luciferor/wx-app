//index.js
var api = require('../../utils/api.js');
const { $Toast } = require('../../dist/base/index');
//获取应用实例
const app = getApp()

Page({
  data: {
    current: 'tab1',
    currentIndex: 0,
    allNotice: [],//全部
    applyNotice: [],//待审核
    passNotice: [],//已通过
    rejectNotice: [],//未通过
    allPage: 1,
    applyPage: 1,
    passPage: 1,
    rejectPage: 1,
    isAdmin: 0
  },
  onLoad: function () {
    this.setData({
      currentIndex: 0
    })
    //加载初始数据
    this.getNoticeList(0, this.data.allPage);
    this.getNoticeList(1, this.data.allPage);
    this.getNoticeList(2, this.data.allPage);
    this.getNoticeList(3, this.data.allPage);
    this.setData({
      isAdmin: app.apiData.isAdmin
    })
  },

  //不通过
  handleReject(e) {
    let _this = this;
    let index = e.currentTarget.id;
    let notice = _this.data.applyNotice[index];
    api.$https('/toexamine/target', {
      session_key: app.apiData.session_key,
      type: notice.type,
      id: notice.id,
      status: '0'
    }, 'POST', function (data) {
      if (data.data.success) {
        $Toast({
          content: data.data.message
        });
        _this.getNoticeList(1, _this.data.applyPage);
        _this.getNoticeList(0, _this.data.allPage);
        _this.getNoticeList(3, _this.data.rejectNotice);
      } else {
        $Toast({
          content: data.data.message
        });
      }
    }, function () {
      console.log(请求失败);
    });
  },
  //通过
  handlePass(e) {
    let _this = this;
    let index = e.currentTarget.id;
    let notice = _this.data.applyNotice[index];
    api.$https('/toexamine/target', {
      session_key: app.apiData.session_key,
      type: notice.type,
      id: notice.id,
      status: '1'
    }, 'POST', function (data) {
      if (data.data.success) {
        $Toast({
          content: data.data.message
        });
        _this.getNoticeList(0, _this.data.allPage);
        _this.getNoticeList(1, _this.data.applyPage);
        _this.getNoticeList(2, _this.data.passNotice);
      } else {
        $Toast({
          content: data.data.message
        });
      }
    }, function () {
      console.log(请求失败);
    });
  },

  //不通过
  handleAllReject(e) {
    let _this = this;
    let index = e.currentTarget.id;
    let notice = _this.data.allNotice[index];
    api.$https('/toexamine/target', {
      session_key: app.apiData.session_key,
      type: notice.type,
      id: notice.id,
      status: '0'
    }, 'POST', function (data) {
      if (data.data.success) {
        $Toast({
          content: data.data.message
        });
        _this.getNoticeList(0, _this.data.allPage);
        _this.getNoticeList(1, _this.data.applyPage);
        _this.getNoticeList(3, _this.data.rejectNotice);
      } else {
        $Toast({
          content: data.data.message
        });
      }
    }, function () {
      console.log(请求失败);
    });
  },
  //通过
  handleAllPass(e) {
    let _this = this;
    let index = e.currentTarget.id;
    let notice = _this.data.allNotice[index];
    api.$https('/toexamine/target', {
      session_key: app.apiData.session_key,
      type: notice.type,
      id: notice.id,
      status: '1'
    }, 'POST', function (data) {
      if (data.data.success) {
        $Toast({
          content: data.data.message
        });
        _this.getNoticeList(0, _this.data.allPage);
        _this.getNoticeList(1, _this.data.applyPage);
        _this.getNoticeList(2, _this.data.passNotice);
      } else {
        $Toast({
          content: data.data.message
        });
      }
    }, function () {
      console.log(请求失败);
    });
  },

  //获取通知列表
  getNoticeList(types, pages) {
    let _this = this;
    api.$https('/noticelist/target', {
      session_key: app.apiData.session_key,
      type: types,
      page: pages
    }, 'POST', function (data) {
      if (data.data.success) {
        _this.dosuccess(types, pages, data.data.message)
      }
    }, function () {
      console.log(请求失败);
    });
  },

  dosuccess(types, page, data) {
    let _this = this;
    if (types == 0) {
      if (page == 1) {
        _this.setData({
          allNotice: []
        });
      }
      let list = [];
      for (var index in data) {//x = index
        list.push({
          id: data[index].id,
          name: data[index].name,
          state: data[index].state,
          created_at: data[index].created_at,
          title: data[index].title,
          type: data[index].type,
          user_img: data[index].user_img,
          check_hidden: true
        });
      }
      _this.setData({
        allNotice: _this.data.allNotice.concat(list)
      });
      console.log("全部通知的数据开始=========");
      console.log(_this.data.allNotice);
      console.log("全部通知的数据结束============");
    } else if (types == 1) {
      if (page == 1) {
        _this.setData({
          applyNotice: []
        });
      }
      let list = [];
      for (var index in data) {//x = index
        list.push({
          id: data[index].id,
          name: data[index].name,
          state: data[index].state,
          created_at: data[index].created_at,
          title: data[index].title,
          type: data[index].type,
          user_img: data[index].user_img,
          check_hidden: true
        });
      }
      _this.setData({
        applyNotice: _this.data.applyNotice.concat(list)
      })
      console.log("全部审核数据开始=========");
      console.log(_this.data.applyNotice);
      console.log("全部审核的数据结束============");
    } else if (types == 2) {
      if (page == 1) {
        _this.setData({
          passNotice: []
        });
      }
      _this.setData({
        passNotice: _this.data.passNotice.concat(data)
      })
      console.log("全部通过数据开始=========");
      console.log(_this.data.passNotice);
      console.log("全部通过的数据结束============");
    } else if (types == 3) {
      if (page == 1) {
        _this.setData({
          rejectNotice: []
        });
      }
      _this.setData({
        rejectNotice: _this.data.rejectNotice.concat(data)
      })
      console.log("全部拒绝数据开始=========");
      console.log(_this.data.rejectNotice);
      console.log("全部拒绝的数据结束============");
    }
  },

  //全部审核
  showAllCheckBox(e) {
    let index = e.currentTarget.id;
    this.data.allNotice[index].check_hidden = !this.data.allNotice[index].check_hidden;
    this.setData({
      allNotice: this.data.allNotice
    })
  },

  //审核弹窗
  showCheckBox(e) {
    console.log(e.currentTarget.id)
    let index = e.currentTarget.id;
    this.data.applyNotice[index].check_hidden = !this.data.applyNotice[index].check_hidden;
    this.setData({
      applyNotice: this.data.applyNotice
    })
  },

  //swiper切换时会调用
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      console.log(e.detail.source);
      this.setData({
        currentIndex: e.detail.current
      })
    }
  },
  //用户点击tab时调用
  titleClick: function (e) {
    let currentPageIndex = e.currentTarget.dataset.idx;
    this.setData({
      //拿到当前索引并动态改变
      currentIndex: e.currentTarget.dataset.idx
    })
  },
})