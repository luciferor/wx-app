//mine.js
var api = require('../../utils/api.js');
const { $Toast } = require('../../dist/base/index');
//获取应用实例
const app = getApp()

Page({
    data: {
        userInfos: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        showRemindBox: false,
        userInfo: {
            companyname: "", //公司名称
            disposable: "", //加分权利
            id: 0,
            name: "",
            reduce: "", //减分权利
            score: 0,
            total_score: 0, //总分
            user_img: "", //用户头像
            isadmin: 0,
        },
        score: Number(0),
        name: "", //姓名
        targetList: [
                // {
                //   "id": 1,
                //   "type": 1,
                //   "ranktitle": "休假三天",
                //   "gift_type": 3,
                //   "rank": 1,
                //   "scoretitle": null,
                //   "gift_score": null,
                //   "todayrank":1,
                //   "weekrank":2,
                //   "monthrank":3
                // },
                // {
                //   "id": 2,
                //   "type": 2,
                //   "ranktitle": null,
                //   "gift_type": null,
                //   "rank": null,
                //   "scoretitle": "成都一日游",
                //   "gift_score": 2000, "todayrank": 1,
                //   "weekrank": 2,
                //   "monthrank": 3
                // }
            ] //我的目标列表
            ,
        session_key: '',
        golding: false,
        infores: '',
        getid: 0,
    },
    closegetwin() {
        this.setData({
            golding: false
        })
    },
    onLoad: function() {
        this.getUserInfos();
        this.getTargetList();
    },
    onShareAppMessage: function() {
        return {
            title: '用邦分干了这杯事业，快来使用企汇邦……',
            desc: '邦分管理',
            path: '/pages/mine/mine',
            imageUrl: '../../images/minproShare.jpg',
            success: function(res) {
                console.log(res)
            },
            fail: function(err) {
                console.log('失败')
                console.log(err)
            }
        }
    },
    onShow: function() {
        console.log("------------" + "onShow");
        this.getUserInfos();
        this.getTargetList();
    },

    handleReceive(e) {
        let arr = (e.currentTarget.id).split('|');
        if (arr[2] == 1) {
            this.setData({
                golding: true,
                infores: arr[1],
                getid: arr[0]
            })
        } else {
            $Toast({
                content: "暂未达成，无法领取"
            });
        }
    },
    nowingget(e) {
        let _id = 0;
        _id = e.currentTarget.id;
        let _this = this;
        api.$http(function(res) {
            console.log(res);
            _this.setData({
                golding: false,
                infores: ''
            })
            if (res.data.success) {
                $Toast({
                    content: res.data.message,
                    type: 'success'
                });

                //重新获取数据
                _this.getTargetList();
            }
        }, function(err) {
            console.log(err)
        }, '/receive/target', {
            session_key: app.apiData.session_key,
            id: _id
        }, 'POST')

    },
    //获取用户信息
    getUserInfos() {
      let _this = this;
      api.$https('/appreciate/personalcenter', {
        session_key: app.apiData.session_key
      }, 'POST', function (data) {
        if (data.data.success) {
          _this.setData({
            userInfo: data.data.message,
            name: data.data.message.name == "" ? app.apiData.nickName : data.data.message.name,
            score: Number(data.data.message.score) + Number(data.data.message.total_score)
          });
        }
        console.log(data.data.message)
      }, function (data) {
        console.log('请求失败');
      });
 },
    //获取我的目标
    getTargetList() {
        let _this = this;
        api.$https('/targetmy/target', {
            session_key: app.apiData.session_key
        }, 'POST', function(data) {
            if (data.data.success) {
                _this.setData({
                    targetList: data.data.message
                });
            }
        }, function(data) {
            console.log('请求失败');
        });
    },

    //提示框
    handleRemindOpen() {
        this.setData({
            showRemindBox: true,
        });
    },
    handleRemindClose() {
        this.setData({
            showRemindBox: false
        });
    },
    //跳转到通知界面
    navigateToNotice() {
        wx.navigateTo({
            url: '../notices/notices'
        })
    },
    //跳转到设置界面
    navigateToSetting() {
        wx.navigateTo({
            url: '../setting/setting'
        })
    },
    //跳转到组织
    navigateToOrg() {
        wx.navigateTo({
            url: '../organization/organization'
        })
    },
    //跳转到我的目标
    navigateToTarget() {
        wx.navigateTo({
            url: '../target/target'
        })
    },
    onLoad: function(option) {
        let _this = this;
        console.log(app.globalData.userInfo);
        if (app.globalData.userInfo) {
            this.setData({
                userInfos: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfos: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.apiData.nickName = e.detail.userInfo.nickName;
                    wx.request({
                        url: 'https://devqypyp.xiaohuibang.com/appreciate/updateInformation',
                        data: {
                            session_key: app.apiData.session_key,
                            nickname: e.detail.userInfo.nickName,
                            avatarurl: e.detail.userInfo.avatarUrl,
                            gender: e.detail.userInfo.gender,
                            province: e.detail.userInfo.province,
                            city: e.detail.userInfo.city,
                            country: e.detail.userInfo.country,
                        },
                        header: {
                            'content-type': 'application/json' //默认值
                        },
                        method: 'POST',
                        success: function(res) {
                            //执行啥啥啥
                            _this.getUserInfos()
                            _this.getTargetList()
                        },
                    })

                    //*
                    //***** */
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfos: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }

        //获取邀请的公司id
        console.log('查看公司id');
        console.log(option.company_id);
        app.apiData.invite_id = option.company_id;
        // 登录
        wx.login({
            success: res => {
                //发送 res.code 到后台换取 openId, sessionKey, unionId
                //登录，从后台获取到session_key
                //发起网络请求
                wx.request({
                    url: 'https://devqypyp.xiaohuibang.com/login/miniprogram/Applet', //小程序登录
                    data: {
                        code: res.code,
                        company_id: option.company_id
                    },
                    method: "POST",
                    header: {
                        'content-type': 'application/json' //默认值
                    },
                    success(response) {
                        console.log('查看信息')
                        console.log(response)
                        app.apiData.code = res.code; //登录需要的code
                        app.apiData.session_key = response.data.message.session_key; //response.message.session_key
                        app.apiData.Company_Id = response.data.message.company_id;
                        app.apiData.isAdmin = response.data.message.isadmin;

                        if (response.data.message.company_id == "" || response.data.message.company_id == 0 || response.data.message.company_id == null || response.data.message.company_id == undefined) {
                            console.log('-------------------------------');
                            console.log(response.data.message.company_id + "返回回来的id");
                            console.log(option.company_id + "传过来的id");
                            console.log('-------------------------------');
                            wx.redirectTo({
                                url: '../guide/guide'
                            })
                        }

                        if (option.company_id != undefined && option.company_id != null && option.company_id != 0 && option.company_id != '' && response.data.message.company_id == option.company_id) { //必须要是由申请加入的无组织用户才会显示
                            setTimeout(function() {
                                wx.showModal({
                                    title: '提示',
                                    content: '恭喜！您已成功加入' + response.data.message.company_name + '！',
                                    showCancel: true,
                                    cancelText: '取消',
                                    cancelColor: '#666666',
                                    confirmText: '知道了',
                                    confirmColor: '#5398ff'
                                });
                            }, 5000)
                        }


                        wx.getUserInfo({
                            success: res => {
                                console.log('打印数据啊啊啊 啊啊啊啊 3');
                                console.log(res);
                                console.log('打印数据啊啊啊啊啊啊啊啊啊啊啊啊啊??????????');
                                app.apiData.nickName = res.userInfo.nickName;
                                wx.request({
                                    url: 'https://devqypyp.xiaohuibang.com/appreciate/updateInformation',
                                    data: {
                                        session_key: app.apiData.session_key,
                                        nickname: res.userInfo.nickName,
                                        avatarurl: res.userInfo.avatarUrl,
                                        gender: res.userInfo.gender,
                                        province: res.userInfo.province,
                                        city: res.userInfo.city,
                                        country: res.userInfo.country,
                                    },
                                    header: {
                                        'content-type': 'application/json' //默认值
                                    },
                                    method: 'POST',
                                    success: function(res) {
                                        //执行啥啥啥
                                        _this.getUserInfos()
                                        _this.getTargetList()
                                       console.log('打印数据啊啊啊啊啊啊啊啊啊啊啊啊啊|||||||||||???????');
                                    },
                                    fail:function(res){
                                      console.log('上传信息失败=========');
                                      console.log(res)
                                    }
                                },)

                                //*
                                //***** */
                                app.globalData.userInfo = res.userInfo
                                _this.setData({
                                    userInfos: res.userInfo,
                                    hasUserInfo: true
                                })
                            }
                        })

                    }
                })
            },
        })
    },
    getUserInfo: function(e) {
        this.setData({
            userInfos: e.detail.userInfo,
            hasUserInfo: true
        })
        console.log(e.detail);
        let _this = this;
        //*****
        //*
        app.apiData.nickName = e.detail.userInfo.nickName;
        wx.request({
            url: 'https://devqypyp.xiaohuibang.com/appreciate/updateInformation',
            data: {
                session_key: app.apiData.session_key,
                nickname: e.detail.userInfo.nickName,
                avatarurl: e.detail.userInfo.avatarUrl,
                gender: e.detail.userInfo.gender,
                province: e.detail.userInfo.province,
                city: e.detail.userInfo.city,
                country: e.detail.userInfo.country,
            },
            header: {
                'content-type': 'application/json' //默认值
            },
            method: 'POST',
            success: function(res) {
                //执行啥啥啥
                _this.getUserInfos()
                _this.getTargetList()
            },
        })

        //*
        //***** */
    }
})