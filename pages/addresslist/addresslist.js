// pages/addresslist/addresslist.js
var api = require('../../utils/api.js');
var addmap = require('../../utils/map.js');
const { $Toast } = require('../../dist/base/index');
//获取应用实例
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addlist: [],
        province: '',
        city: '',
        country: ''
    },
    selectevent() {
        console.log(this.data.addlist)
    },
    editaddress(e) {
        let _this = this;
        wx.navigateTo({
            url: '../../pages/editaddress/editaddress?id=' + JSON.stringify(_this.data.addlist),
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getinfos();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    getinfos() {
        let _this = this;
        //读取地址信息
        api.$http(function(res) {
            if (res.data.success) {
                _this.setData({
                    addlist: res.data.message,
                    province: addmap.map[0][res.data.message.province],
                    city: addmap.map[0][res.data.message.city],
                    country: addmap.map[0][res.data.message.country]
                })
            }
        }, function(err) {
            $Toast({
                content: ' 网络错误，请稍候再试',
                type: 'error'
            });
        }, '/WeChat/Applet/getaddress', {
            session_key: app.apiData.session_key
        }, 'POST')
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.getinfos();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})