//notice.js
var api = require('../../utils/api.js');
const { $Toast } = require('../../dist/base/index');
//获取应用实例
const app = getApp()

Page({
    data: {
        current: 'all',
        current_scroll: 'all',
        allHidden: false,
        applyHidden: true,
        passHidden: true,
        failHidden: true,
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

    onReady: function() {
        this.getNoticeList(0, this.data.allPage);
        this.getNoticeList(1, this.data.allPage);
        this.getNoticeList(2, this.data.allPage);
        this.getNoticeList(3, this.data.allPage);
        this.setData({
            isAdmin: app.apiData.isAdmin
        })
    },
    onShareAppMessage: function() {
        return {
            title: '用邦分干了这杯事业，快来使用企汇邦……',
            desc: '邦分管理',
            path: '/pages/mine/mine',
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
        }, 'POST', function(data) {
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
        }, function() {
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
        }, 'POST', function(data) {
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
        }, function() {
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
        }, 'POST', function(data) {
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
        }, function() {
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
        }, 'POST', function(data) {
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
        if (types == 0) {
            if (page == 1) {
                this.setData({
                    allNotice: []
                });
            }
            let list = [];
            for (var index in data) { //x = index
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
            this.setData({
                allNotice: this.data.allNotice.concat(list)
            })
        } else if (types == 1) {
            if (page == 1) {
                this.setData({
                    applyNotice: []
                });
            }
            let list = [];
            for (var index in data) { //x = index
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
            this.setData({
                applyNotice: this.data.applyNotice.concat(list)
            })
        } else if (types == 2) {
            if (page == 1) {
                this.setData({
                    passNotice: []
                });
            }
            this.setData({
                passNotice: this.data.passNotice.concat(data)
            })
        } else if (types == 3) {
            if (page == 1) {
                this.setData({
                    rejectNotice: []
                });
            }
            this.setData({
                rejectNotice: this.data.rejectNotice.concat(data)
            })
        }
        console.log("=======全部通知的数据=====")
        console.log(this.data.allNotice)
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

    //切换tab
    handleChange({ detail }) {
        let _this = this;
        _this.setData({
            current: detail.key
        });
        if (detail.key == 'all') {
            _this.setData({
                allHidden: false,
                applyHidden: true,
                passHidden: true,
                failHidden: true
            });
        } else if (detail.key == 'apply') {
            _this.setData({
                allHidden: true,
                applyHidden: false,
                passHidden: true,
                failHidden: true
            });
        } else if (detail.key == 'pass') {
            _this.setData({
                allHidden: true,
                applyHidden: true,
                passHidden: false,
                failHidden: true
            });
        } else {
            _this.setData({
                allHidden: true,
                applyHidden: true,
                passHidden: true,
                failHidden: false
            });
        }
    },
    //处理滚动
    handleChangeScroll({ detail }) {
        this.setData({
            current_scroll: detail.key
        });
    }
});