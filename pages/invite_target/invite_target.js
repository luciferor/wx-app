var api = require('../../utils/api.js');
const {
    $Toast
} = require('../../dist/base/index');

const app = getApp()

Page({
    data: {
        company_name: '新组织',
        targetArr: [],
    },
    //事件处理函数
    onLoad: function() {
        var _this = this
        this.setData({
            company_name: app.apiData.company_name
        })
        api.$https('/targetlist/index ', {
            session_key: app.apiData.session_key,
        }, 'POST', function(res) {
            console.log(res)
            _this.setData({
                targetArr: res.data.message
            })

        }, function() {
            console.log(请求失败);
        });
    },
    pickTarget: function(e) {
        let idx = e.currentTarget.dataset.num
        let curritem = e.currentTarget.dataset.item
        if (curritem.picked == true) {
            curritem.picked = false
        } else {
            curritem.picked = true
        }
        this.data.targetArr[idx] = curritem
        this.setData({
            targetArr: this.data.targetArr
        })
    },
    addAndMove: function() {
        let _this = this;
        var addTargetArr = []
        for (let i = 0; i < this.data.targetArr.length; i++) {
            if (this.data.targetArr[i].picked == true) {
                addTargetArr.push({
                    id: Number(this.data.targetArr[i].id),
                    type: Number(this.data.targetArr[i].type)
                })
            }
        }
        if (addTargetArr.length == 0) {
            wx.switchTab({
                url: '../mine/mine',
            });
        } else {
            api.$http(function(res) {
                console.log(res)
                if (res.data.code == 200) {
                    wx.switchTab({
                        url: '../mine/mine',
                    });
                } else {
                    $Toast({
                        content: res.data.message,
                        type: 'error',
                        duration: 3
                    });
                }
            }, function(err) {
                console.log(err)
            }, '/targetadd/target', {
                session_key: app.apiData.session_key,
                target: JSON.stringify(addTargetArr)
            }, 'POST')
        }

    }
})