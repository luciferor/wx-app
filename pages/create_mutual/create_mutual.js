var api = require('../../utils/api.js');
const {
    $Toast
} = require('../../dist/base/index');

//获取应用实例
const app = getApp()

Page({
    data: {
        current: 'tab1',
        showContent: 'tab1',
        alreadyNum: 0,
        hangyeNum: 0,
        zidingyiNum: 0,
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        RomoveMoadal: false,
        hangyeArr: [], //后台设置的行业列表
        xingweiArr: [], //后台设置的行业对应的行为列表
        currHangye: 0,
        addName: '',
        scoresArr: [{
            score: 1
        }, {
            score: 2
        }, {
            score: 3
        }, {
            score: 4
        }, {
            score: 5
        }],
        isShowScore: false,
        scoreStatus: '选择',
        typeArray: ['减分', '加分'],
        typeIndex: 0,
        zidingyiBehaviorArr: [], //相互管理的自定义行为
        hangyeBehaviorArr: [], //相互管理的行业行为
        resetZidingyiBehaviorArr: [], //重置恢复的相互管理的自定义行为
        resetHangyeBehaviorArr: [], //重置恢复的相互管理的行业行为
        zidingyiCurrItem: '',
    },
    //事件处理函数
    onShareAppMessage: function() {
        return {
            title: '用邦分干了这杯事业，快来使用企汇邦……',
            desc: '邦分管理',
            path: '/pages/index/index',
            imageUrl: '../../images/minproTranspond.png',
            success: function(res) {
                console.log(res)
            },
            fail: function(err) {
                console.log('失败')
                console.log(err)
            }
        }
    },
    handleChange({
        detail
    }) {
        console.log(detail)
        this.setData({
            current: detail.key,
            showContent: detail.key,
        });
    },
    onLoad: function() {

    },
    onReady: function() {
        var _this = this

        let zidingyiArr = app.apiData.creatOrg.mutualZidingyiBehaviorArr
        let hangyeArr = app.apiData.creatOrg.mutualHangyeBehaviorArr
        let zidingyiArrLength = 0
        let hangyeArrArrLength = 0
        for (var i = 0; i < zidingyiArr.length; i++) {
            if (zidingyiArr[i].state == 1) {
                zidingyiArrLength++
            }
        }
        for (var m = 0; m < hangyeArr.length; m++) {
            if (hangyeArr[m].state == 1) {
                hangyeArrArrLength++
            }
        }
        _this.setData({
            zidingyiBehaviorArr: JSON.parse(JSON.stringify(zidingyiArr)), //自定义的已编辑行为数组
            hangyeBehaviorArr: JSON.parse(JSON.stringify(hangyeArr)), //行业对应的已编辑行为数组
            hangyeNum: hangyeArrArrLength,
            zidingyiNum: zidingyiArrLength,
            alreadyNum: zidingyiArrLength + hangyeArrArrLength,
        })

        api.$http(function(res) { //获取行业列表
            _this.setData({
                hangyeArr: res.data.message
            })
            api.$http(function(ress) {
                for (let i = 0; i < ress.data.message.length; i++) { //将"行业对应的行为列表[]" 循环去和"行业已选行为[]"进行对应查询，存在的则赋值checked属性为checked,否则为false
                    for (let m = 0; m < _this.data.hangyeBehaviorArr.length; m++) {
                        if (ress.data.message[i].id == _this.data.hangyeBehaviorArr[m].id && _this.data.hangyeBehaviorArr[m].state == 1) {
                            ress.data.message[i].checked = true;
                            break;
                        } else {
                            ress.data.message[i].checked = false
                        }
                    }
                }
                _this.setData({
                    xingweiArr: ress.data.message
                })
                console.log(ress.data.message)
            }, function(err) {
                console.log(err)
            }, '/appreciate/behavior', {
                session_key: app.apiData.session_key,
                industry_id: res.data.message[0].industry_id,
                type: 2
            }, 'POST');
        }, function(err) {
            console.log(err)
        }, '/appreciate/industry', {
            session_key: app.apiData.session_key
        }, 'POST');


    },
    selectHangye: function(e) {
        var _this = this
        _this.setData({ //控制选中样式
            currHangye: e.currentTarget.dataset.num
        })

        api.$http(function(res) {
            for (let i = 0; i < res.data.message.length; i++) { //将"行业对应的行为列表[]" 循环去和"行业已选行为[]"进行对应查询，存在的则赋值checked属性为checked,否则为false
                for (let m = 0; m < _this.data.hangyeBehaviorArr.length; m++) {
                    if (res.data.message[i].id == _this.data.hangyeBehaviorArr[m].id && _this.data.hangyeBehaviorArr[m].state == 1) {
                        res.data.message[i].checked = true;
                        break;
                    } else {
                        res.data.message[i].checked = false
                    }
                }
            }
            _this.setData({
                xingweiArr: res.data.message
            })
            console.log(res.data.message)
        }, function(err) {
            console.log(err)
        }, '/appreciate/behavior', {
            session_key: app.apiData.session_key,
            industry_id: e.currentTarget.dataset.industryid,
            type: 2
        }, 'POST');
    },
    pickXingwei: function(e) { //勾选中行业对应的行为

        var currItem = e.currentTarget.dataset.item

        // console.log(this.data.xingweiArr)
        if (currItem.checked == true) { //之前为选中，现在去除
            console.log('去掉勾')
            console.log(currItem)
            var New_hangyeBehaviorArr = this.data.hangyeBehaviorArr
            var referXingweiArr = this.data.xingweiArr
            for (var i = 0; i < referXingweiArr.length; i++) {
                if (referXingweiArr[i].id == currItem.id) {
                    referXingweiArr[i].checked = false
                }
            }
            this.setData({
                xingweiArr: referXingweiArr
            })
            var hangyeLength = 0
            for (var i = 0; i < New_hangyeBehaviorArr.length; i++) {
                if (New_hangyeBehaviorArr[i].id == currItem.id) {
                    New_hangyeBehaviorArr[i].state = 0;
                }
                if (New_hangyeBehaviorArr[i].state == 1) {
                    hangyeLength++
                }
            }

            this.setData({
                hangyeBehaviorArr: New_hangyeBehaviorArr,
                alreadyNum: this.data.zidingyiNum + hangyeLength,
                hangyeNum: hangyeLength
            })


        } else { //之前为未选中，现在新增
            console.log('打勾')
            console.log(currItem)
            var New_hangyeBehaviorArr = this.data.hangyeBehaviorArr
            var referXingweiArr = this.data.xingweiArr
            for (var i = 0; i < referXingweiArr.length; i++) {
                if (referXingweiArr[i].id == currItem.id) {
                    referXingweiArr[i].checked = true
                }
            }
            this.setData({
                xingweiArr: referXingweiArr
            })

            var hangyeLength = 0
            var flag = 0
            for (var i = 0; i < New_hangyeBehaviorArr.length; i++) {
                if (New_hangyeBehaviorArr[i].id != currItem.id) {
                    flag++
                } else {
                    New_hangyeBehaviorArr[i].state = 1;
                    break;
                }
            }
            if (flag == New_hangyeBehaviorArr.length) {
                delete currItem.checked
                currItem.state = 1
                console.log(currItem)
                New_hangyeBehaviorArr.push(currItem)
            }
            for (var i = 0; i < New_hangyeBehaviorArr.length; i++) {
                if (New_hangyeBehaviorArr[i].state == 1) {
                    hangyeLength++
                }
            }
            this.setData({
                hangyeBehaviorArr: New_hangyeBehaviorArr,
                alreadyNum: this.data.zidingyiNum + hangyeLength,
                hangyeNum: hangyeLength
            })
            console.log(New_hangyeBehaviorArr)
        }
    },
    addXingwei: function() { //添加自定义行为
        var _this = this
        var addItem = {
            id: '',
            behavior: _this.data.addName,
            operation: _this.data.typeIndex,
            score: _this.data.scoreStatus,
            state: 1,
        }
        if (_this.data.addName == '') {
            $Toast({
                content: '行为名称不能为空！',
                type: 'error'
            });
            return;
        } else if (_this.data.scoreStatus == "选择") {
            $Toast({
                content: '请选择行为分值！',
                type: 'error'
            });
            return;
        }
        var New_zidingyiBehaviorArr = _this.data.zidingyiBehaviorArr //页面上新增这个行为
        New_zidingyiBehaviorArr.push(addItem)
        var zidingyiLength = 0
        for (var i = 0; i < New_zidingyiBehaviorArr.length; i++) {
            if (New_zidingyiBehaviorArr[i].state == 1) {
                zidingyiLength++
            }
        }
        _this.setData({
            zidingyiBehaviorArr: New_zidingyiBehaviorArr,
            alreadyNum: zidingyiLength + _this.data.hangyeBehaviorArr.length,
            zidingyiNum: zidingyiLength,
            addName: '',
            scoreStatus: '选择',
        })
    },
    OKRomove(e) { //删除某条自定义行为
        var zidingyiArr = this.data.zidingyiBehaviorArr
        var zidingyiLength = 0
        for (var i = 0; i < zidingyiArr.length; i++) {
            if (zidingyiArr[i].managedid == this.data.zidingyiCurrItem.managedid && zidingyiArr[i].behavior == this.data.zidingyiCurrItem.behavior && zidingyiArr[i].score == this.data.zidingyiCurrItem.score) {
                zidingyiArr[i].state = 0
            }
            if (zidingyiArr[i].state == 1) {
                zidingyiLength++
            }
        }
        this.setData({
            RomoveModal: false,
            zidingyiBehaviorArr: zidingyiArr,
            alreadyNum: zidingyiLength + this.data.hangyeBehaviorArr.length,
            zidingyiNum: zidingyiLength,
        })
        console.log(this.data.zidingyiBehaviorArr)
    },
    handleReset: function() { //重置

        let zidingyiArr = app.apiData.creatOrg.mutualZidingyiBehaviorArr
        let hangyeArr = app.apiData.creatOrg.mutualHangyeBehaviorArr

        this.setData({
            zidingyiBehaviorArr: JSON.parse(JSON.stringify(zidingyiArr)), //重置恢复的相互管理的自定义行为
            hangyeBehaviorArr: JSON.parse(JSON.stringify(hangyeArr)), //重置恢复的相互管理的行业行为
            alreadyNum: zidingyiArr.length + hangyeArr.length,
            zidingyiNum: zidingyiArr.length,
            hangyeNum: hangyeArr.length,
        })


        var referXingweiArr = this.data.xingweiArr
        for (let i = 0; i < referXingweiArr.length; i++) {
            if (this.data.hangyeBehaviorArr.length == 0) {
                referXingweiArr[i].checked = false
            } else {
                for (let m = 0; m < this.data.hangyeBehaviorArr.length; m++) {
                    if (referXingweiArr[i].id == this.data.hangyeBehaviorArr[m].id && this.data.hangyeBehaviorArr[m].state == 1) {
                        referXingweiArr[i].checked = true;
                        break; //得到true则停止当前i 的循环，防止被false覆盖
                    } else {
                        referXingweiArr[i].checked = false
                    }
                }
            }
        }
        this.setData({
            xingweiArr: referXingweiArr
        })
        console.log(this.data.hangyeBehaviorArr)
        console.log(referXingweiArr)
    },
    handleSure: function() { //确认
        var _this = this
        let hangyeArr = this.data.hangyeBehaviorArr
        let zidingyiArr = this.data.zidingyiBehaviorArr
        let mutualMergeArr = hangyeArr.concat(zidingyiArr) //合并最终的数组

        console.log(zidingyiArr)
        console.log(hangyeArr)
        console.log(mutualMergeArr)

        app.apiData.creatOrg.mutualHangyeBehaviorArr = hangyeArr
        app.apiData.creatOrg.mutualZidingyiBehaviorArr = zidingyiArr
        app.apiData.creatOrg.mutualMergeArr = mutualMergeArr
        if (mutualMergeArr.length > 0) {
            app.apiData.creatOrg.showMutualTip = false;
        } else {
            app.apiData.creatOrg.showMutualTip = true;
        }
        $Toast({
            content: '编辑成功！',
            type: 'success'
        });

        setTimeout(function() {
            wx.navigateBack({
                delta: 1
            })
        }, 200);

    },

    removeXingwei: function(e) { //删除自定义行为
        let currItem = e.currentTarget.dataset.item
        this.setData({
            zidingyiCurrItem: currItem,
            RomoveModal: true
        });
    },
    CancelRomove() {
        this.setData({
            RomoveModal: false
        });
    },
    scoreToggle: function() { //控制分数模态框
        this.setData({
            isShowScore: !this.data.isShowScore
        })
    },
    changeScore: function(e) { //选中自定义分数
        this.setData({
            scoreStatus: e.currentTarget.dataset.score
        })
    },
    bindPickerChange: function(e) {
        this.setData({
            typeIndex: e.detail.value
        })
    },
    bindKeyInput: function(e) {
        this.setData({
            addName: e.detail.value
        })
    }
})