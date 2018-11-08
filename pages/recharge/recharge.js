// pages/recharge/recharge.js
var api = require('../../utils/api.js');
const { $Toast } = require('../../dist/base/index');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rechar:0,//邦分
    moneyes:0,//金额
    buff:0
  },
  calcbuff(e){
    console.log(e);
    if (e.detail.value<0){
      $Toast({
        content: '邦分不允许填写负数',
        type: 'warning'
      });
      return;
    }
    console.log(e.detail.value);
    this.setData({
      rachar:e.detail.value,
      moneyes:(e.detail.value)/10
    })
  },
  rechargeing(){
    //访问接口从接口拿到数据参数，再进行支付。
    wx.requestPayment({
      timeStamp: (Number(new Date()))/1000,
      nonceStr: '',
      package: '',
      signType: '',
      paySign:'',
      'success': function (res) {
        console.log(res);
        //充值成功重新加载邦分数据
        _this.getbuff();
      },
      'fail': function (err) {
        console.log(err);
      },
      'complete': function (com) {
        console.log(com);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
  },
  getbuff(){
    let _this = this;
    api.$http(function (res) {
      _this.setData({
        buff: res.data.message.coin
      })
    }, function (err) {
      console.log(err);
    }, '/appreciate/companycoin', {
        session_key: app.apiData.session_key
    }, 'POST')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getbuff();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getbuff();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})