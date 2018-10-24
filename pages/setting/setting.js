//setting.js
var api = require('../../utils/api.js');
//获取应用实例
const app = getApp()
Page({
  data: {
      name : '请输入姓名',
      showSex : false,
      tempFilePaths: ''  ,
      sex: [
        {
          name: '男',
        },
        {
          name: '女'
        },
      ],
    showRemindBox : false ,
    userInfo : {
      avatarurl : "",
      gender:0,
      id:0,
      name:"",
      wechat_name:""
    }
  },
  onReady: function () {
    let _this = this;
      //获取用户信息
      api.$http(_this.dosuccess, _this.dofail, '/appreciate/wechatuser', {
        session_key: app.apiData.session_key
      }, 'POST');
  },
  dosuccess(data) {
    this.setData({
      userInfo: data.data.message
    });
    console.log(this.data.userInfo)
  },
  dofail(data) {
    console.log('请求失败');
  },
  showSexBox() {
    this.setData({
      showSex: true
    });
  },

    handleCancel() {
        this.setData({
            showSex: false
        });
    },

    handleClickItem({ detail }) {
        const index = detail.index;
        console.log('点击了选项' + this.data.sex[index].name);
        this.setData({
            showSex: false
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


    chooseimage: function() {
        var _this = this;
        wx.chooseImage({
            count: 1, // 默认9  
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
                _this.setData({
                    tempFilePaths: res.tempFilePaths
                });
                //上传头像
            }
        })
    }

})