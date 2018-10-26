var api = require('../../utils/api.js');
const { $Toast } = require('../../dist/base/index');
var app = getApp();
Page({
    data: {
        winHeight: "", //窗口高度
        currentTab: 0, //预设当前项的值
        scrollLeft: 0, //tab标题的滚动条位置
        typename: '', //加减分类型
        showModal: false, //自我加减分窗口
        showselectbuff: false, //选择加减分窗口
        showother: false, //他人加减分窗口
        showtype: false,
        ownerlist: [], //自我管理
        mutullist: [], //相互管理
        session_key: '', //session_key
        typelist: [{
                name: '自我加分',
            },
            {
                name: '自我减分'
            }
        ],
        menushow: false,
        menubtnshow: true,
        ownerdatalist: { //自我加减分表单数据
            buff: '', //加减邦分数
            reasonr: '' //加减分的理由
        },
        othertypename: '', //他人加减分类型
        showothertype: false,
        othertype: [
            { name: '加分' }, { name: '减分' }
        ],
        otherbuff: '',
        otherreasonr: '',
        madoltitle: '标题',
        madolshow: false,
        madolinfos: '详细信息',
        actionid: '',
        actionindex: '',
        actiontype: '',
        menushowid: 0,
    },
    finishevent(e) {
        let _this = this;
        let arr = e.currentTarget.id.split('|');
        let id = arr[0];
        let index = arr[1];
        let type = arr[2];
        switch (type) {
            case 'owner':
                //
                api.$http(function(res) {
                    console.log(res)
                    if (res.data.success) {
                        _this.handleSuccess("自我管理加分成功");
                    }
                }, function(err) {}, '/WeChat/Applet/finishSelfManaged', {
                    session_key: app.apiData.session_key,
                    id: id
                }, 'POST')
                this.data.ownerlist[index].ischecked = false;
                this.setData({
                    ownerlist: this.data.ownerlist
                });
                break;
            case 'mutu':
                //
                // api.$http(function (res) {
                //   console.log(res)
                // }, function (err) { }, '/WeChat/Applet/finishMutualManaged', {
                //     session_key: app.apiData.session_key,
                //     id: id
                //   }, 'POST')
                // console.log('相互管理了');
                this.data.mutullist[index].ischecked = false;
                this.setData({
                    mutullist: this.data.mutullist
                });
                //跳转到选择用户
                wx.navigateTo({
                    url: '../../pages/selectmutuluser/selectmutuluser?id=' + id,
                })
                break;
            default:
                break;
        }
        this.setData({
            madolshow: false
        })
    },
    cacelevent(e) {
        let arr = e.currentTarget.id.split('|');
        let id = arr[0];
        let index = arr[1];
        let type = arr[2];
        switch (type) {
            case 'owner':
                //
                this.data.ownerlist[index].ischecked = false;
                this.setData({
                    ownerlist: this.data.ownerlist
                });
                break;
            case 'mutu':
                //
                this.data.mutullist[index].ischecked = false;
                this.setData({
                    mutullist: this.data.mutullist
                });
                break;
            default:
                break;
        }
        this.setData({
            madolshow: false
        })
    },
    ownerevents(e) {
        let arr = e.currentTarget.id.split('|');
        let id = arr[0];
        let index = arr[1];
        let info = '提交后不可取消，您确认任务完成了么？'; //arr[2];
        this.data.ownerlist[index].ischecked = !this.data.ownerlist[index].ischecked;
        this.setData({
            ownerlist: this.data.ownerlist,
            madoltitle: '自我管理',
            madolshow: true,
            madolinfos: info,
            actionid: id,
            actionindex: index,
            actiontype: 'owner'
        });

    },
    mutuevents(e) {
        let arr = e.currentTarget.id.split('|');
        let id = arr[0];
        let index = arr[1];
        let info = '提交后不可取消，您确认任务完成了么' //arr[2];
        this.data.mutullist[index].ischecked = !this.data.mutullist[index].ischecked;
        this.setData({
            mutullist: this.data.mutullist,
            madoltitle: '相互管理',
            madolshow: true,
            madolinfos: info,
            actionid: id,
            actionindex: index,
            actiontype: 'mutu'
        });
    },
    closeothertype() {
        this.setData({
            showothertype: false
        });
    },
    exitothertype({ detail }) {
        const index = detail.index;
        this.setData({
            othertypename: this.data.othertype[index].name,
            showothertype: false
        })
    },
    selecotherttype() {
        console.log('他人加减分');
        this.setData({
            showothertype: true
        })
    },
    onShareAppMessage: function() {
        return {
            title: '用邦分干了这杯事业，快来使用企汇邦……',
            desc: '邦分管理',
            path: '/pages//mine/mine',
            imageUrl: '../../images/minproShare.jpg',
            success: function(res) {
                console.log(res)
                wx.switchTab({
                    url: '../mine/mine',
                });
            },
            fail: function(err) {
                console.log('失败')
                console.log(err)
            }
        }
    },
    ownnerplusevent() {
        console.log(this.data.ownerdatalist.buff);
        let _this = this;
        if (_this.data.typename == "") {
            $Toast({
                content: "请选择加减分类型",
            });
        } else if (_this.data.ownerdatalist.buff == 0 || _this.data.ownerdatalist.buff == "") {
            $Toast({
                content: "请输入邦分",
            });
        } else if (_this.data.ownerdatalist.reasonr == "") {
            $Toast({
                content: "请输入理由",
            });
        } else {
            console.log("自我加减分申请");
            api.$http(function(res) {
                console.log(res);
                if (res.data.success) {
                    //alert('添加成功！')
                    $Toast({
                        content: res.data.message,
                    });
                    _this.handleSuccess(_this.data.typename + '成功')
                    _this.setData({
                        showModal: false
                    })
                }
            }, function(err) {
                console.log(err)
            }, "/WeChat/Applet/changeGradeApplyBySelf", {
                session_key: app.apiData.session_key,
                type: _this.data.typename == '自我加分' ? 'add' : 'reduce',
                bangfen: _this.data.ownerdatalist.buff,
                reason: _this.data.ownerdatalist.reasonr,
            }, "POST");
        }
    },
    otherbuffevent(e) {
        console.log(e.detail.value);
        this.setData({
            otherbuff: e.detail.value
        })
    },
    otherreasonrevent(e) {
        this.setData({
            otherreasonr: e.detail.value
        })
    },
    buffevent(e) {
        console.log(e.detail.value);
        this.data.ownerdatalist.buff = e.detail.value;
    },
    reasonevent(e) {
        console.log(e);
        this.data.ownerdatalist.reasonr = e.detail.value;
    },
    selectplusevent() {
        console.log("申请选择加减分");
    },
    closeotherwin() {
        this.setData({
            showother: false
        })
    },
    otherplusandrem() { //他人加减分窗口
        this.setData({
            showother: true,
            showModal: false,
            showselectbuff: false
        })
    },
    selectplusandrembuff() { //选择加减分窗口
        this.setData({
            showselectbuff: true,
            showModal: false,
            showother: false
        })
    },
    //===========================================================================================================选择加减分类型
    applyevent() {
        if (this.data.othertypename == "") {
            $Toast({
                content: "请选择加减分类型",
            });
        } else if (this.data.otherbuff == 0 || this.data.otherbuff == "") {
            $Toast({
                content: "请输入邦分",
            });
        } else if (this.data.otherreasonr == "") {
            $Toast({
                content: "请输入理由",
            });
        } else {
            wx.navigateTo({
                url: '../../pages/selectuseres/selectuseres?type=' + this.data.othertypename + "&buff=" + this.data.otherbuff + "&reasonr=" + this.data.otherreasonr,
            })
            this.setData({
                showother: false,
                othertypename: '', //他人加减分类型
                otherbuff: 0,
                otherreasonr: '',
            })
        }
    },
    closetype() {
        this.setData({
            showtype: false
        });
    },
    exittype({ detail }) {
        const index = detail.index;
        this.setData({
            typename: this.data.typelist[index].name,
            showtype: false
        })

    },
    selecttype() {
        console.log('运行了');
        this.setData({
            showtype: true
        });
        console.log(this.data.showtype)
    },
    //===========================================================================================================选择加减分类型结束
    //============================================================================================================  选项卡js
    // 滚动切换标签样式
    switchTab: function(e) {
        this.setData({
            currentTab: e.detail.current
        });
        this.checkCor();
    },
    // 点击标题切换当前页时改变样式
    swichNav: function(e) {
        this.setData({
            menushowid: e.target.dataset.current
        })
        console.log(e.target.dataset.current);
        var cur = e.target.dataset.current;
        if (this.data.currentTaB == cur) { return false; } else {
            this.setData({
                currentTab: cur
            })
        }
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor: function() {
        if (this.data.currentTab > 4) {
            this.setData({
                scrollLeft: 300
            })
        } else {
            this.setData({
                scrollLeft: 0
            })
        }
    },
    onLoad: function() {
        var that = this;
        //  高度自适应
        wx.getSystemInfo({
            success: function(res) {
                var clientHeight = res.windowHeight,
                    clientWidth = res.windowWidth,
                    rpxR = 750 / clientWidth;
                var calc = clientHeight * rpxR - 120;
                console.log(calc)
                that.setData({
                    winHeight: calc
                });
            }
        });
    },
    footerTap: app.footerTap,
    //============================================================================================================  选项卡js
    //点击按钮痰喘指定的hiddenmodalput弹出框========================================================================  开始
    showownerwin: function() {
        this.setData({
            menushow: true,
            menubtnshow: false
        })
    },
    closemenuwin() {
        this.setData({
            menushow: false,
            menubtnshow: true
        })
    },
    ownnerplusandrem() {
        this.setData({
            showModal: true,
            showselectbuff: false,
            showother: false
        });
    },
    preventTouchMove: function() {

    },
    go: function() {
        this.setData({
            showModal: false
        })
    },
    //点击按钮痰喘指定的hiddenmodalput弹出框========================================================================  结束
    //============================================================================================================  加减分类型选择开始
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    //============================================================================================================  加减分类型选择结束
    //000000000000000000000000000000000000000000000==============================
    onReady: function() {
        //自我管理
        api.$http(this.odosuccess, this.odofail, '/WeChat/Applet/getSelfManagedList', {
            type: 1,
            session_key: app.apiData.session_key
        }, 'POST');
        //相互管理
        api.$http(this.mdosuccess, this.mdofail, '/WeChat/Applet/getMutualManagedList', {
            type: 1,
            session_key: app.apiData.session_key
        }, 'POST');
    },
    onShow: function() {
        //自我管理
        api.$http(this.odosuccess, this.odofail, '/WeChat/Applet/getSelfManagedList', {
            type: 1,
            session_key: app.apiData.session_key
        }, 'POST');
        //相互管理
        api.$http(this.mdosuccess, this.mdofail, '/WeChat/Applet/getMutualManagedList', {
            type: 1,
            session_key: app.apiData.session_key
        }, 'POST');
    },
    odosuccess(data) {
        console.log('aaaaaaaaa')
        console.log(data);
        this.setData({
            ownerlist: []
        })
        for (let i = 0; i < data.data.message.length; i++) {
            let item = data.data.message;
            this.data.ownerlist.push({
                id: item[i].id,
                bangfen: item[i].bangfen,
                name: item[i].name,
                ischecked: false
            })
        }
        this.setData({
            ownerlist: this.data.ownerlist
        })
    },
    odofail(err) {
        console.log(err);
    },
    mdosuccess(data) {
        console.log(data);
        this.setData({
            mutullist: []
        })
        for (let i = 0; i < data.data.message.length; i++) {
            let item = data.data.message;
            this.data.mutullist.push({
                id: item[i].id,
                bangfen: item[i].bangfen,
                behavior: item[i].behavior,
                score: item[i].score,
                type: item[i].type,
                ischecked: false
            })
        }
        this.setData({
            mutullist: this.data.mutullist
        })
    },
    mdofail(err) {
        console.log(err);
    },
    //000000000000000000000000000000000000000000000=================================
    handleSuccess(_str) {
        $Toast({
            content: _str,
            type: 'success'
        });
    }
})