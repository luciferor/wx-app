//index.js
//获取应用实例
var api = require('../../utils/api.js');
const app = getApp()

Page({
  data: {
    awardlist:[]
  },
  onLoad:function(){
    
    api.$http(this.dosuccess, this.dofail, '/WeChat/Applet/getAwardList',{
      session_key:app.apiData.session_key,
      page:1,
      pageSize:10
    },'POST')
  },
  dosuccess(res){
    this.setData({
      awardlist:res.data.message
    })
  },
  dofail(err){
    console.log(err);
  }
})