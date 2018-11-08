//获取应用实例
var api = require('../../utils/api.js');
const { $Toast } = require('../../dist/base/index');
const util = require('../../utils/util.js');
const app = getApp()
const { $Message } = require('../../dist/base/index');

Page({
    data: {
        date: '', //日期
        addScoreNum: 0, //加分权利
        reduceScoreNum: 0, //减分权利
        maxScoreNum: 0, //加减分最大值
        count: 0, //可分配邦分
        isshow:false,
        istitle:'邦分不足',
        isdes:'邦分可能不够本次分配了',
        actions3: [
          {
            name: '继续',
            color: '#666666',
          },
          {
            name: '充值',
            color: '#5398ff'
          }
        ],
    },
    gotorecharge(){
      wx.navigateTo({
        url: '/pages/recharge/recharge',
      })
    },
    scoreuser(){
      wx.navigateTo({
        url: '/pages/selectplanuser/selectplanuser',
      })
    },
    isrecharge({ detail }) {
      const index = detail.index;
      console.log(index);
      if (index === 0) {
        
      } else if (index === 1) {
        wx.navigateTo({
          url: '/pages/recharge/recharge',
        })
      }

      this.setData({
        isshow: false
      });
    },
    onLoad: function() {
        this.getCount();
    },
    onShareAppMessage: function() {
        console.log(app.apiData.Company_Id)
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
    //获取可分配邦分
    getCount() {
        let _this = this;
        api.$https('/appreciate/companycoin', {
            session_key: app.apiData.session_key,
        }, 'POST', function(data) {
            _this.setData({
                count: data.data.message.coin
            });
            if (Number(data.data.message)<5000){
              //弹出提示，主要是为了让用户充值
              _this.setData({
                isshow:true
              })
            }
        }, function(data) {
            console.log('请求失败');
        });
    },
    //添加邦分分配计划
    addPlan() {
        if (this.data.addScoreNum == 0) {
            $Toast({
                content: "请输入正确的加分邦分数量"
            });
        } else if (this.data.reduceScoreNum == 0) {
            $Toast({
                content: "请输入正确的减分邦分数量"
            });
        } else if (this.data.maxScoreNum == 0) {
            $Toast({
                content: "请输入正确的加减分最大值"
            });
        } else if (this.data.date == "") {
            $Toast({
                content: "请选择时间"
            });
        } else {
            this.addPlans();
        }
    },

    addPlans: util.throttle(function (e) {
      api.$https('/WeChat/appreciate/allocation', {
        session_key: app.apiData.session_key,
        score: this.data.addScoreNum,
        rescore: this.data.reduceScoreNum,
        range_max: this.data.maxScoreNum,
        range_min: this.data.maxScoreNum,
        effective_time: this.timeToTimestamp(this.data.date)
      }, 'POST', function (data) {
        console.log(data.data.message);
        $Toast({
          content: data.data.message
        });
        if (data.data.success) {
          wx.navigateBack()
        }
      }, function (data) {
        $Toast({
          content: '添加失败'
        });
      });
    }, 5000),

    timeToTimestamp(date) {
        return Date.parse(date) / 1000;
    },

    //日期改变
    bindDateChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },

    //用户输入加分数据的改变
    changeAddValue(e) {
        this.setData({
            addScoreNum: e.detail.value
        });
    },
    //用户输入减分数据的改变
    changerReduceValue(e) {
        this.setData({
            reduceScoreNum: e.detail.value
        });
    },
    //用户输入最大数据的改变
    changeMaxValue(e) {
        this.setData({
            maxScoreNum: e.detail.value
        });
    },
})