//index.js
//获取应用实例
var api = require('../../utils/api.js');
const app = getApp()

Page({
    data: {
      
    },
    //事件处理函数
    onLoad: function(option) {
        let company_id = option.id;
        console.log('接收到的公司ID：'+company_id)
        wx.login({
          success:(reslogin)=>{
            if (reslogin.errMsg=='login:ok'){
              //执行注册公司
              api.$http(function (resreg) {
                //保存sessionkey
                app.apiData.session_key = resreg.data.message.session_key;
                app.apiData.Company_Id = resreg.data.message.company_id;
                app.apiData.isAdmin = resreg.data.message.isadmin;
                console.log(resreg)
                console.log('打印sessionkey[' + resreg.data.message.session_key+']');

                //进行判断
                if(app.apiData.Company_Id==0){//最新用户
                  //获取微信的信息
                  wx.getUserInfo({
                    success:function(reswx){
                      console.log(reswx);
                      console.log('获取成功')
                    },
                    fail:function(errwx){
                      console.log(errwx);
                      console.log('获取失败')
                    }
                  })
                }

                if(app.apiData.company_id!=0){//已经有公司了，就直接跳转到个人中心
                  wx.getUserInfo({
                    success:function(resiswx){
                      console.log(resiswx);
                      console.log('成功');
                      app.apiData.GetLincesShow = false;//隐藏授权按钮
                      //提交信息到服务器
                      api.$http(function (resinfo){
                        console.log(resinfo);
                        console.log(resinfo.data.message)
                      }, function (errinfo) {
                        console.log(errinfo)
                      },'/appreciate/updateInformation',{
                        session_key: app.apiData.session_key,
                        nickname: resiswx.userInfo.nickName,
                        avatarurl: resiswx.userInfo.avatarUrl,
                        gender: resiswx.userInfo.gender,
                        province: resiswx.userInfo.province,
                        city: resiswx.userInfo.city,
                        country: resiswx.userInfo.country,
                      },'POST')
                    },
                    fail:function(erriswx){
                      console.log(erriswx);
                      console.log('失败')
                      app.apiData.GetLincesShow = true;//显示授权按钮
                    }
                  })
                }

              }, function (err) {
                console.log(err);
              },'/login/miniprogram/Applet',{
                  code: reslogin.code,
                  company_id:option.company_id
              },'POST');
            }
          }
        })
    },
    getUserInfo: function(e) {
        
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
})