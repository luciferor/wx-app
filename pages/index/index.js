//index.js
//获取应用实例
var api = require('../../utils/api.js');
const {
    $Toast
} = require('../../dist/base/index');
const app = getApp()

Page({
    data: {
        isshow: false,
    },
    //事件处理函数
    onLoad: function(option) {
        let _this = this;
        app.apiData.commid = option.company_id
        wx.login({
            success: (reslogin) => {
                if (reslogin.errMsg == 'login:ok') {
                    //执行注册公司
                    api.$http(function(resreg) {
                        //保存sessionkey
                        console.log(resreg)
                        console.log('看看是否收到，上面');
                        app.apiData.session_key = resreg.data.message.session_key;
                        app.apiData.open_id = resreg.data.message.openid;
                        app.apiData.Company_Id = resreg.data.message.company_id;
                        app.apiData.isAdmin = resreg.data.message.isadmin;
                        app.apiData.company_name = resreg.data.message.company_name;
                        // wx.redirectTo({
                        //     url: '../../pages/create/create',
                        // })
                        // return

                        //console.log('打印sessionkey[' + resreg.data.message.session_key + ']');
                        //console.log('公司id' + resreg.data.message.Company_Id)
                        if (app.apiData.Company_Id != 0) { //已经有公司了，就直接跳转到个人中心
                            if (wx.getStorageSync('userInfo').length != 0) {
                                app.apiData.nickName = wx.getStorageSync('userInfo').nickName;
                                app.apiData.GetLincesShow = false; //隐藏授权按钮
                                _this.setData({
                                        isshow: app.apiData.GetLincesShow,
                                    })
                                    //提交信息到服务器


                                //虽然没有更新成功，但是还是要跳转到个人中心
                                if (app.apiData.Company_Id == option.company_id) {
                                    //console.log('恭喜您成功加入：' + resreg.data.message.company_name);
                                    $Toast({
                                        content: '恭喜您成功加入：[' + resreg.data.message.company_name + ']',
                                        type: 'success',
                                        duration: 3
                                    });
                                    api.$https('/targetmy/target', {
                                        session_key: app.apiData.session_key,
                                        company_id: app.apiData.Company_Id
                                    }, 'POST', function(data) {
                                        if (data.data.success) {
                                            //console.log(data.data.message)
                                            if (data.data.message.length > 0) {
                                                wx.switchTab({
                                                    url: '../mine/mine',
                                                });
                                            } else {
                                                wx.redirectTo({
                                                    url: '../../pages/invite_target/invite_target',
                                                })
                                            }
                                        }
                                    }, function(data) {
                                        //console.log('请求失败');
                                    });
                                } else {
                                    wx.switchTab({
                                        url: '../../pages/mine/mine',
                                    })
                                }

                            } else {
                                wx.getUserInfo({
                                    success: function(resiswx) {
                                        console.log("微信信息");
                                        console.log(resiswx);
                                        console.log("微信信息");
                                        //1.存用户信息到本地存储
                                        wx.setStorageSync('userInfo', resiswx.userInfo)
                                        app.apiData.nickName = resiswx.userInfo.nickName;
                                        console.log(resiswx);
                                        console.log('成功');
                                        app.apiData.GetLincesShow = false; //隐藏授权按钮
                                        _this.setData({
                                                isshow: app.apiData.GetLincesShow
                                            })
                                            //提交信息到服务器
                                        api.$http(function(resinfo) {
                                            console.log(resinfo);
                                            console.log(resinfo.data.message)
                                            console.log(resinfo.data.success ? "更新成功的" : "没有更新成功");

                                            console.log(app.apiData.Company_Id + "|||||||||||" + option.company_id);
                                            //虽然没有更新成功，但是还是要跳转到个人中心
                                            if (app.apiData.Company_Id == option.company_id) {
                                                //console.log('恭喜您成功加入：' + resreg.data.message.company_name);
                                                $Toast({
                                                    content: '恭喜您成功加入：[' + resreg.data.message.company_name + ']',
                                                    type: 'success',
                                                    duration: 3
                                                });
                                                api.$https('/targetmy/target', {
                                                    session_key: app.apiData.session_key,
                                                    company_id: app.apiData.Company_Id
                                                }, 'POST', function(data) {
                                                    if (data.data.success) {
                                                        //console.log(data.data.message)
                                                        if (data.data.message.length > 0) {
                                                            wx.switchTab({
                                                                url: '../mine/mine',
                                                            });
                                                        } else {
                                                            wx.redirectTo({
                                                                url: '../../pages/invite_target/invite_target',
                                                            })
                                                        }
                                                    }
                                                }, function(data) {
                                                    //console.log('请求失败');
                                                });
                                            } else {
                                                wx.switchTab({
                                                    url: '../../pages/mine/mine',
                                                })
                                            }
                                        }, function(errinfo) {
                                            //console.log(errinfo)
                                        }, '/appreciate/updateInformation', {
                                            session_key: app.apiData.session_key,
                                            nickname: resiswx.userInfo.nickName,
                                            avatarurl: resiswx.userInfo.avatarUrl,
                                            gender: resiswx.userInfo.gender,
                                            province: resiswx.userInfo.province,
                                            city: resiswx.userInfo.city,
                                            country: resiswx.userInfo.country,
                                        }, 'POST')
                                    },
                                    fail: function(erriswx) {
                                        console.log(erriswx);
                                        console.log('失败')
                                        app.apiData.GetLincesShow = true; //显示授权按钮
                                        _this.setData({
                                            isshow: app.apiData.GetLincesShow
                                        })
                                    }
                                })
                            }
                        } else { //没有组织，就要创建组织
                            _this.getUserInfos();
                        }
                    }, function(err) {
                        console.log(err);
                    }, '/login/miniprogram/Applet', {
                        code: reslogin.code,
                        company_id: option.company_id
                    }, 'POST');
                }
            }
        })
    },
    getUserInfo: function(e) {
        let _this = this;
        app.apiData.nickName = e.detail.userInfo.nickName;
        console.log(e.detail.userInfo);
        //console.log('成功');
        app.apiData.GetLincesShow = false; //隐藏授权按钮
        _this.setData({
                isshow: app.apiData.GetLincesShow
            })
            //提交信息到服务器
        api.$http(function(resinfo) {

            //console.log(resinfo);
            //console.log(resinfo.data.message)
            //console.log(resinfo.data.success ? "更新成功的" : "没有更新成功");
            //虽然没有更新成功，但是还是要跳转到个人中心
            _this.setData({
                isshow: app.apiData.GetLincesShow
            })
            console.log(app.apiData.company_name);
            if (app.apiData.company_name != '') {
              if (app.apiData.Company_Id == app.apiData.commid) {
                //console.log('恭喜您成功加入：' + resreg.data.message.company_name);
                $Toast({
                  content: '恭喜您成功加入：[' + app.apiData.company_name + ']',
                  type: 'success',
                  duration: 3
                });
                api.$https('/targetmy/target', {
                  session_key: app.apiData.session_key,
                  company_id: app.apiData.Company_Id
                }, 'POST', function (data) {
                  if (data.data.success) {
                    //console.log(data.data.message)
                    if (data.data.message.length > 0) {
                      wx.switchTab({
                        url: '../mine/mine',
                      });
                    } else {
                      wx.redirectTo({
                        url: '../../pages/invite_target/invite_target',
                      })
                    }
                  }
                }, function (data) {
                  //console.log('请求失败');
                });
              } else {
                wx.switchTab({
                  url: '../../pages/mine/mine',
                })
              }
            } else {
                wx.redirectTo({
                    url: '../../pages/guide/guide',
                })
            }
        }, function(errinfo) {
            //console.log(errinfo)
        }, '/appreciate/updateInformation', {
            session_key: app.apiData.session_key,
            nickname: e.detail.userInfo.nickName,
            avatarurl: e.detail.userInfo.avatarUrl,
            gender: e.detail.userInfo.gender,
            province: e.detail.userInfo.province,
            city: e.detail.userInfo.city,
            country: e.detail.userInfo.country,
        }, 'POST')
    },

    getUserInfos: function() {
        let _this = this;
        if (wx.getStorageSync('userInfo').length > 0) {
            //提交信息到服务器
            api.$http(function(resinfo) {
                console.log(resinfo);
                console.log(resinfo.data.message)
                console.log(resinfo.data.success ? "更新成功的" : "没有更新成功");
                //虽然没有更新成功，但是还是要跳转到个人中心
                wx.redirectTo({
                    url: '../../pages/guide/guide',
                })
            }, function(errinfo) {
                console.log(errinfo)
            }, '/appreciate/updateInformation', {
                session_key: app.apiData.session_key,
                nickname: wx.getStorageSync('userInfo').nickName,
                avatarurl: wx.getStorageSync('userInfo').avatarUrl,
                gender: wx.getStorageSync('userInfo').gender,
                province: wx.getStorageSync('userInfo').province,
                city: wx.getStorageSync('userInfo').city,
                country: wx.getStorageSync('userInfo').country,
            }, 'POST')
        } else {
            wx.getUserInfo({
                success: function(resiswx) {
                    app.apiData.nickName = wx, wx.getStorageSync('userInfo').nickName;
                    app.apiData.GetLincesShow = false; //隐藏授权按钮
                    _this.setData({
                            isshow: app.apiData.GetLincesShow
                        })
                        //提交信息到服务器
                    api.$http(function(resinfo) {
                        console.log(resinfo);
                        console.log(resinfo.data.message)
                        console.log(resinfo.data.success ? "更新成功的" : "没有更新成功");
                        //虽然没有更新成功，但是还是要跳转到个人中心
                        wx.redirectTo({
                            url: '../../pages/guide/guide',
                        })
                    }, function(errinfo) {
                        console.log(errinfo)
                    }, '/appreciate/updateInformation', {
                        session_key: app.apiData.session_key,
                        nickname: resiswx.userInfo.nickName,
                        avatarurl: resiswx.userInfo.avatarUrl,
                        gender: resiswx.userInfo.gender,
                        province: resiswx.userInfo.province,
                        city: resiswx.userInfo.city,
                        country: resiswx.userInfo.country,
                    }, 'POST')
                },
                fail: function(erriswx) {
                    console.log(erriswx);
                    console.log('失败')
                    app.apiData.GetLincesShow = true; //显示授权按钮
                    _this.setData({
                        isshow: app.apiData.GetLincesShow
                    })
                }
            })
        }
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