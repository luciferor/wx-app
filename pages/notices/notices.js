//index.js
var api = require('../../utils/api.js');
const { $Toast } = require('../../dist/base/index');
//获取应用实例
const app = getApp()

Page({
    data: {
        current: 'tab1',
        currentIndex: 0,
        allNotice: [], //全部
        applyNotice: [], //待审核
        passNotice: [], //已通过
        rejectNotice: [], //未通过
        allPage: 1,
        applyPage: 1,
        passPage: 1,
        rejectPage: 1,
        isAdmin: 0
    },
    onLoad: function() {
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

  searchScrollLower:function(){
    console.log("======拉到了底部" + this.data.currentIndex)
    switch (this.data.currentIndex) {
      case 0:
        this.setData({
          allPage: this.data.allPage+1
        })
        this.getNoticeList(0, this.data.allPage);
        break
      case 1:
        this.setData({
          applyPage: this.data.applyPage+1
        })
        this.getNoticeList(1, this.data.applyPage);
        break
      case 2:
        this.setData({
          passPage: this.data.passPage+1
        })
        this.getNoticeList(2, this.data.passPage);
        break;
      case 3:
        this.setData({
          rejectPage: this.data.rejectPage+1
        })
        this.getNoticeList(3, this.data.rejectPage);
        break;
    }
  },
  
    onShareAppMessage: function() {
        return {
            title: '用邦分干了这杯事业，快来使用企汇邦……',
            desc: '邦分管理',
            path: '/pages/index/index',
            imageUrl: '../../images/minproTranspond.png',
            success: function(res) {

            },
            fail: function(err) {
                console.log('失败')
                console.log(err)
            }
        }
    },

    //不通过
    handleReject(e) {
        let _this = this;
        let index = e.currentTarget.id;
        let notice = _this.data.applyNotice[index];
       let url = notice.goal_id != 0 ? '/WeChat/Applet/receiveExamine' : '/toexamine/target';
        let param = {};
        if (notice.goal_id != 0){
          param = {
            session_key: app.apiData.session_key,
            id: notice.id,
            status: '0'
          }
       }else{
          param = {
            session_key: app.apiData.session_key,
            type: notice.type,
            id: notice.id,
            status: '0'
          }
       }
        api.$https(url, param, 'POST', function(data) {
            if (data.data.success) {
                $Toast({
                    content: data.data.message
                });
                _this.setData({
                  applyPage:1,
                  allPage:1,
                  rejectPage:1
                });
                _this.getNoticeList(1, _this.data.applyPage);
                _this.getNoticeList(0, _this.data.allPage);
                _this.getNoticeList(3, _this.data.rejectPage);
            } else {
                $Toast({
                    content: data.data.message
                });
            }
        }, function() {
            console.log(请求失败);
        });
    },
    //通过
    handlePass(e) {
        let _this = this;
        let index = e.currentTarget.id;
        let notice = _this.data.applyNotice[index];
      let url = notice.goal_id != 0 ? '/WeChat/Applet/receiveExamine' : '/toexamine/target';
        let param = {};
        if (notice.goal_id != 0) {
          param = {
            session_key: app.apiData.session_key,
            id: notice.id,
            status: '1'
          }
        } else {
          param = {
            session_key: app.apiData.session_key,
            type: notice.type,
            id: notice.id,
            status: '1'
          }
        }
        api.$https(url, param, 'POST', function(data) {
            if (data.data.success) {
                $Toast({
                    content: data.data.message
                });
              _this.setData({
                applyPage: 1,
                allPage: 1,
                passPage: 1
              });
                _this.getNoticeList(0, _this.data.allPage);
                _this.getNoticeList(1, _this.data.applyPage);
                _this.getNoticeList(2, _this.data.passPage);
            } else {
                $Toast({
                    content: data.data.message
                });
            }
        }, function() {
            console.log(请求失败);
        });
    },

    //不通过
    handleAllReject(e) {
        let _this = this;
        let index = e.currentTarget.id;
        let notice = _this.data.allNotice[index];
        let url = notice.goal_id != 0 ? '/WeChat/Applet/receiveExamine' : '/toexamine/target';
        let param = {};
        if (notice.goal_id != 0) {
          param = {
            session_key: app.apiData.session_key,
            id: notice.id,
            status: '0'
          }
        } else {
          param = {
            session_key: app.apiData.session_key,
            type: notice.type,
            id: notice.id,
            status: '0'
          }
        };
        api.$https(url, param, 'POST', function(data) {
            if (data.data.success) {
                $Toast({
                    content: data.data.message
                });
              _this.setData({
                applyPage: 1,
                allPage: 1,
                rejectPage: 1
              });
                _this.getNoticeList(0, _this.data.allPage);
                _this.getNoticeList(1, _this.data.applyPage);
                _this.getNoticeList(3, _this.data.rejectPage);
            } else {
                $Toast({
                    content: data.data.message
                });
            }
        }, function() {
            console.log(请求失败);
        });
    },
    //通过
    handleAllPass(e) {
        let _this = this;
        let index = e.currentTarget.id;
        let notice = _this.data.allNotice[index];
        let url = notice.goal_id != 0 ? '/WeChat/Applet/receiveExamine' : '/toexamine/target';
        let param = {};
        if (notice.goal_id != 0) {
          param = {
            session_key: app.apiData.session_key,
            id: notice.id,
            status: '1'
          }
        } else {
          param = {
            session_key: app.apiData.session_key,
            type: notice.type,
            id: notice.id,
            status: '1',
          }
        };
        api.$https(url, param, 'POST', function(data) {
            if (data.data.success) {
                $Toast({
                    content: data.data.message
                });
              _this.setData({
                applyPage: 1,
                allPage: 1,
                passPage: 1
              });
                _this.getNoticeList(0, _this.data.allPage);
                _this.getNoticeList(1, _this.data.applyPage);
                _this.getNoticeList(2, _this.data.passPage);
            } else {
                $Toast({
                    content: data.data.message
                });
            }
        }, function() {
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
        }, 'POST', function(data) {
            if (data.data.success) {
                _this.dosuccess(types, pages, data.data.message)
            }
        }, function() {
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
            for (var index in data) { //x = index
                list.push({
                    id: data[index].id,
                    name: data[index].name,
                    state: data[index].status,
                    created_at: data[index].created_at,
                    title: data[index].title,
                    type: data[index].type,
                    user_img: data[index].user_img,
                    check_hidden: true,
                    goal_id: data[index].goal_id
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
            for (var index in data) { //x = index
                list.push({
                    id: data[index].id,
                    name: data[index].name,
                   state: data[index].status,
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
    pagechange: function(e) {
        if ("touch" === e.detail.source) {
            console.log(e.detail.source);
            this.setData({
                currentIndex: e.detail.current
            })
        }
    },
    //用户点击tab时调用
    titleClick: function(e) {
        let currentPageIndex = e.currentTarget.dataset.idx;
        this.setData({
            //拿到当前索引并动态改变
            currentIndex: e.currentTarget.dataset.idx
        })
    },
})