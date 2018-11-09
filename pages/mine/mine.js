//mine.js
var api = require('../../utils/api.js');
const { $Toast } = require('../../dist/base/index');
const util = require('../../utils/util.js');
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
            reduces: 0, //减分权利
        },
        score: Number(0),
        reduce: 0, //减去
        name: "", //姓名
        targetList: [], //我的目标列表,
        session_key: '',
        golding: false,
        infores: '',
        getid: 0,
        goldings: false,
        inforess: '',
        getids: 0,
        isaddress: 0,//是否添加地址 0 没有1有
        ishowget:false,
        getsmotihinsmenu:[
          {
            name: '取消',
            color: '#666666',
          },
          {
            name: '设置地址',
            color: '#5398ff'
          }
        ],
        imgbgs:'../../images/img_lingqu.png'
    },
    closegetsomething(){
      this.setData({
        goldings:false,
        inforess:'',
        getids:0
      })
    },
    gotogetsomething(e){//领取奖励
      let _this = this;
      console.log(e);
      api.$http(function (res) {
        console.log(res);
        $Toast({
          content: res.data.message,
          type: 'success'
        });
        _this.setData({
          goldings: false
        })
        _this.getTargetList();
      }, function (err) {
         console.log(err)
      },'/WeChat/Applet/toreceive',{
         session_key:app.apiData.session_key,
        id: e.currentTarget.id
      },'POST')
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
      let _this = this;
        let arr = (e.currentTarget.id).split('|');
        console.log(arr);
        if(arr[2]==1){
          if (arr[3] == 1) {
            //先去设置地址
            if (_this.data.isaddress == 0) {
              _this.setData({
                ishowget: true
              })
            } else {
              _this.setData({
                goldings: true,
                inforess: arr[1],
                getids: arr[0],
              })
            }
          } else {
            _this.setData({
              goldings: true,
              inforess: arr[1],
              getids: arr[0],
            })
          }
        }else{
          $Toast({
            content:"还无法领取",
            type: 'success'
          });
        }
    },
  getsomething({detail}){
    const index = detail.index;
    if (index === 0) {
      console.log('取消');
    } else if (index === 1) {
      wx.navigateTo({
        url: '../../pages/addaddress/addaddress',
      })
    }

    this.setData({
      ishowget: false
    });
  },
  nowingget: util.throttle(function (e) {
    _this.setData({
      golding: false,
      infores: ''
    })
    return;
    let _id = 0;
    _id = e.currentTarget.id;
    let _this = this;
    api.$http(function (res) {
      console.log(res);
      _this.setData({
        golding:false,
        infores:''
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
    }, function (err) {
      console.log(err)
    }, '/receive/target', {
        session_key: app.apiData.session_key,
        id: _id
      }, 'POST')

  }, 3000),
    //获取用户信息
    getUserInfos() {
        let _this = this;
        api.$https('/appreciate/personalcenter', {
            session_key: app.apiData.session_key
        }, 'POST', function(data) {
            if (data.data.success) {
                app.apiData.rate = data.data.message.multiple;
                _this.setData({
                    userInfo: data.data.message,
                    name: data.data.message.name == "" ? app.apiData.nickName : data.data.message.name,
                    score: parseFloat(data.data.message.score) + parseFloat(data.data.message.total_score) - parseFloat(data.data.message.reduce),
                    isaddress: data.data.message.is_address
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
                // for (let i = 0; i < data.data.message.length; i++) {
                //    if (data.data.message[i].progressbar == '100' && data.data.message[i].isreceive=='1') {
                //     if (data.data.message[i].type==2){
                //       _this.setData({
                //         imgbgs: '../../images/img_lingqu.png',
                //         golding: true,
                //         infores: data.data.message[i].scoretitle,
                //         getid: data.data.message[i].id
                //       })
                //     }else{
                //       _this.setData({
                //         imgbgs: '../../images/img_lingqu.png',
                //         golding: true,
                //         infores: data.data.message[i].ranktitle,
                //         getid: data.data.message[i].id
                //       })
                //     }              
                //   }
                // }
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
        let _this = this;
        wx.navigateTo({
          url: '../setting/setting?isaddress=' + _this.data.isaddress,
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