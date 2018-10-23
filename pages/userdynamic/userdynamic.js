//index.js
//获取应用实例
var api = require('../../utils/api.js');
const app = getApp()

Page({
  data: {
    dynamiclist:[]
  },
  onLoad:function(option){
    let arr = option.uid.split('|');
    wx.setNavigationBarTitle({
      title:arr[1]+"的个人动态"
    });
    api.$http(this.dosuccess, this.dofail,'/WeChat/Applet/getNoticeByUser',{
      session_key:app.apiData.session_key,
      uid:arr[0],
      page:1,
      pagesSize:10
    },'POST')
  },
  dosuccess(data){
    console.log(data);
    this.setData({
      dynamiclist:data.data.message
    })
  },
  dofail(err){
    console.log(err)
  }
})