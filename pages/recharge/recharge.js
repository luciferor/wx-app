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
    buff:0,
    comname: app.apiData.company_name
  },
  calcbuff(e){
    this.setData({
      rachar: e.detail.value,
      moneyes: (e.detail.value) / app.apiData.rate
    })
  },
  rechargeing(){
    let _this = this;
    if (_this.data.moneyes == 0 || _this.data.moneyes==null){
      $Toast({
        content: '请输入正确的邦分',
        type: 'warning'
      });
      return;
    }
    //访问接口从接口拿到数据参数，再进行支付。
    api.$http(function(res){
      console.log(res);
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          out_trade_no:res.data.out_trade_no,
          'success': function (res) {
            console.log(res);
            //充值成功重新加载邦分数据
            _this.setData({
              rechar: 0,//邦分
              moneyes: 0,//金额
              buff: 0
            })
            _this.getbuff();
            $Toast({
              content: '充值成功',
              type: 'warning'
            });
          },
          'fail': function (err) {
            console.log(err);
          },
          'complete': function (com) {
            console.log(com);
          }
        })
    },function(err){
      console.log(err);
    },'/wechatpay/pay',{
        total_fee: _this.data.moneyes,
        session_key:app.apiData.session_key
    },'POST')
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