//setting.js
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
    console.log('点击了选项'+ this.data.sex[index].name);
    this.setData({
      showSex: false
    });
  },

  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths: res.tempFilePaths
        });
        //上传头像
      }
    })
  }  

})
