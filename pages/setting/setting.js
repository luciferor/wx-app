//setting.js
var api = require('../../utils/api.js');
const { $Toast } = require('../../dist/base/index');
//获取应用实例
const app = getApp()
Page({
    data: {
        name: '',
        showSex: false,
        tempFilePaths: '',
        sex: [{
                name: '男',
            },
            {
                name: '女'
            },
        ],
        showRemindBox: false,
        userInfo: {
            avatarurl: "",
            gender: 0,
            id: 0,
            name: "",
            wechat_name: ""
        }
    },

    //用户输入的改变
    changeNameInput(e) {
        this.setData({
            name: e.detail.value
        });
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
    //修改组织名
    changeName() {
        let _this = this;
        api.$https('/appreciate/changename', {
            session_key: app.apiData.session_key,
            name: _this.data.name
        }, 'POST', function(data) {
            console.log(data.success)
            if (data.data.success) {
                $Toast({
                    content: data.data.message
                });
                wx.navigateBack()
            } else {
                $Toast({
                    content: data.data.message
                });
            }
        }, function(data) {
            $Toast({
                content: '修改失败'
            });
        });
    },

    onLoad: function() {
        let _this = this;
        //获取用户信息
        api.$http(_this.dosuccess, _this.dofail, '/appreciate/wechatuser', {
            session_key: app.apiData.session_key
        }, 'POST');
    },
    dosuccess(data) {
        if (data.data.success) {
            this.setData({
                userInfo: data.data.message,
                name: data.data.message.name
            });
        }
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