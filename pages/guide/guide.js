//guide.js
//获取应用实例
const app = getApp()

Page({
    data: {
        company_id:'',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        imgUrls: [
            '../../images/guide/img_yindaoye_1.png',
            '../../images/guide/img_yindaoye_2.png',
            '../../images/guide/img_yindaoye_3.png',
            '../../images/guide/img_yindaoye_4.png',
        ],
        showBtn: false,
    },
    onReady(){
    },
    onLoad: function (option) {
      let _this = this;
      this.setData({
        company_id:option.company_id
      })
      if (_this.data.company_id != '' && _this.data.company_id == response.data.message.company_id) { //必须要是由申请加入的无组织用户才会显示
        wx.showModal({
          title: '提示',
          content: '恭喜！您已成功加入' + response.data.message.company_name + '！',
          showCancel: true,
          cancelText: '取消',
          cancelColor: '#666666',
          confirmText: '好的',
          confirmColor: '#5398ff',
          success: (result) => {
            if (result.confirm) {

            }
          },
          fail: () => { },
          complete: () => { }
        });
      }
    },
<<<<<<< HEAD
    toCreateOrg: function(e) {
        console.log(e)
        console.log("授权并跳转至创建组织")
        wx.navigateTo({
            url: '../create/create',
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
        });
=======
    toCreateOrg: function (e) {
      let _this = this;
      //获取用户信息，并发送给后台
      let res = e.detail;
      app.apiData.userstatus = false;
      wx.request({
        url: 'https://devqypyp.xiaohuibang.com/appreciate/updateInformation',
        data: {
          session_key: app.apiData.session_key,
          nickname: res.userInfo.nickName,
          avatarurl: res.userInfo.avatarUrl,
          gender: res.userInfo.gender,
          province: res.userInfo.province,
          city: res.userInfo.city,
          country: res.userInfo.country,
        },
        header: {
          'content-type': 'application/json' //默认值
        },
        method: 'POST',
        success: function (res) {
          
        },
      })
      

      setTimeout(function(){
        wx.navigateTo({
          url: '../create/create',
          success: (result) => {

          },
          fail: () => { },
          complete: () => { }
        })
      },2000)
>>>>>>> af696ba549bfc14f387d173489ed19f36167442a
    },
    swiperfinish: function(e) {
        console.log(e.detail)
        console.log(e.detail.current)
            //判断是不是尾页，尾页才显示按钮
        var nowpage = e.detail.current
        var showBtn = this.data.showBtn
        if (nowpage == 3) {
            this.setData({
                showBtn: true
            })
        } else {
            this.setData({
                showBtn: false
            })
        }

    }
})