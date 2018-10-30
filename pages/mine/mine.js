//mine.js
var api = require('../../utils/api.js');
const { $Toast } = require('../../dist/base/index');
//获取应用实例
const app = getApp()

Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        showRemindBox: false,
        userInfo: {
            companyname: "", //公司名称
            disposable: "", //加分权利
            id: 0,
            name: "",
            reduce: 0,
            score: 0,
            total_score: 0, //总分
            user_img: "", //用户头像
            isadmin: 0,
            reduces: 0 //减分权利
        },
        score: Number(0),
        reduce: 0, //减去
        name: "", //姓名
        targetList: [], //我的目标列表,
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
            path: '/pages/index/index',
            imageUrl: '../../images/minproTranspond.png',
            success: function(res) {
                // console.log(res)
            },
            fail: function(err) {
                // console.log('失败')
                // console.log(err)
            }
        }
    },
    onShow: function() {
        this.getUserInfos();
        this.getTargetList();
    },

    errorFunction: function (e) {
      let _this = this;
      let arr = e.currentTarget.id.split('|');
      let type = arr[0];
      let index = arr[1];
      if(type==1){
        _this.data.targetList[index].rankimg ="../../images/mine/icon_zidingyi.png";
        _this.setData({
          targetList: _this.data.targetList
        })
      }else if(type ==2){
        _this.data.targetList[index].scoreimg = "../../images/mine/icon_zidingyi.png";
        _this.setData({
          targetList: _this.data.targetList
        })
      }
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
                _this.getUserInfos();
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
        }, 'POST', function(data) {
            if (data.data.success) {
                _this.setData({
                    userInfo: data.data.message,
                    name: data.data.message.name == "" ? app.apiData.nickName : data.data.message.name,
                    score: parseFloat(data.data.message.score) + parseFloat(data.data.message.total_score) - parseFloat(data.data.message.reduce)
                });
            }
            // console.log(data.data.message)
        }, function(data) {
            // console.log('请求失败');
        });
    },
    //获取我的目标
    getTargetList() {
        let _this = this;
        api.$https('/targetmy/target', {
            session_key: app.apiData.session_key,
            company_id: app.apiData.Company_Id
        }, 'POST', function(data) {
            if (data.data.success) {
                _this.setData({
                    targetList: data.data.message
                });
              for (let i = 0; i < data.data.message.length; i++) {
                if (data.data.message[i].progressbar == '100' && data.data.message[i].isreceive=='1') {
                    if (data.data.message[i].type==2){
                      _this.setData({
                        golding: true,
                        infores: data.data.message[i].scoretitle,
                        getid: data.data.message[i].id
                      })
                    }else{
                      _this.setData({
                        golding: true,
                        infores: data.data.message[i].ranktitle,
                        getid: data.data.message[i].id
                      })
                    }              
                  }
                }
            }
        }, function(data) {
            // console.log('请求失败');
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
        //执行啥啥啥
        this.getUserInfos()
        this.getTargetList()
    },
})