var api = require('../../utils/api.js');
var app = getApp();
Page({
    data: {
        winHeight: "", //窗口高度
        currentTab:0, //预设当前项的值
        scrollLeft: 0, //tab标题的滚动条位置
        typename: '', //加减分类型
        showModal: false,
        showtype: false,
        typelist: [{
                name: '自我加分',
            },
            {
                name: '自我减分'
            }
        ],
        dayranklist: [], //日排名
        weekranklist: [], //周排名
        monthranklist: [], //月排名
        topranklist: [], //顶部排名
        thenid: 0,
        animationData:{},
        animationopacityData:{},
    },
    //===========================================================================================================选择加减分类型
    applyevent() {
        wx.navigateTo({
            url: '../../pages/selectuseres/selectuseres',
        })
    },
    closetype() {
        this.setData({
            showtype: false
        });
    },
    exittype({ detail }) {
        const index = detail.index;
        this.setData({
            typename: this.data.typelist[index].name,
            showtype: false
        })

    },
    selecttype() {
        this.setData({
            showtype: true
        });
    },
    //===========================================================================================================选择加减分类型结束
    //============================================================================================================  选项卡js
    // 滚动切换标签样式
    switchTab: function(e) {
        let _this = this;
        _this.setData({
            currentTab: e.detail.current,
            topranklist:[]
        });
      console.log(_this.data.currentTab);
        //重新给排名团赋值
      switch (_this.data.currentTab) {
          case 0:
                _this.setData({
                  thenid: 0,
                  topranklist: _this.data.dayranklist
                });
                console.log(_this.data.topranklist)
                break;
          case 1:
                _this.setData({
                    thenid: 1,
                    topranklist: _this.data.weekranklist
                });
                console.log(_this.data.topranklist)
                break;
            case 2:
                _this.setData({
                    thenid: 2,
                    topranklist: _this.data.monthranklist
                });
                break;
            default:
                break;
        }
        _this.checkCor();

        //摇晃动画
        _this.$shacking();
        //谈出动画
        _this.$opacitiing();
    },
    // 点击标题切换当前页时改变样式
    swichNav: function(e) {
        let cur = e.target.dataset.current;
        if (this.data.currentTaB == cur) { return false; } else {
            this.setData({
                currentTab: cur
            })
        }
        //摇晃动画
        this.$shacking();
        //谈出动画
        this.$opacitiing();
    },
    //摇晃动画
    $shacking(){//摇晃动画
      let animation = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease',
      })

      this.animation = animation

      animation.rotate(-15).step()

      this.setData({
        animationData: animation.export()
      })

      setTimeout(function() {
        animation.rotate(0).step()
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), 200)
    },
    //透明度
    $opacitiing() {//摇晃动画
      let animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease',
      })

      this.animation = animation

      animation.opacity(0).step()

      this.setData({
        animationopacityData: animation.export()
      })

      setTimeout(function () {
        animation.opacity(1).step()
        this.setData({
          animationopacityData: animation.export()
        })
      }.bind(this), 300)
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor: function() {
        if (this.data.currentTab > 4) {
            this.setData({
              scrollLeft: 300
            })
        } else {
            this.setData({
                scrollLeft: 0
            })
        }
    },
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
    onLoad: function() {
        var that = this;
        //  高度自适应
        wx.getSystemInfo({
            success: function(res) {
                var clientHeight = res.windowHeight,
                    clientWidth = res.windowWidth,
                    rpxR = 750 / clientWidth;
                var calc = clientHeight * rpxR - 120;
                console.log(calc)
                that.setData({
                    winHeight: calc
                });
            }
        });
    },
    footerTap: app.footerTap,
    //============================================================================================================  选项卡js
    //点击按钮痰喘指定的hiddenmodalput弹出框========================================================================  开始
    showownerwin: function() {
        this.setData({
            showModal: true
        })
    },
    preventTouchMove: function() {
      
    },
    go: function() {
        this.setData({
            showModal: false
        })
    },
    //点击按钮痰喘指定的hiddenmodalput弹出框========================================================================  结束
    //============================================================================================================  加减分类型选择开始
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    //============================================================================================================  加减分类型选择结束
    //一下组件使用实例===================================================================
    // onReady:function(){
    //   //获得dialog组件
    //   this.dialog = this.selectComponent("#dialog");

    // },
    // showDialog() {
    //   this.dialog.showDialog();
    // },
    // //取消事件
    // _cancelEvent() {
    //   console.log('你点击了取消');
    //   this.dialog.hideDialog();
    // },
    // //确认事件
    // _confirmEvent() {
    //   console.log('你点击了确定');
    //   this.dialog.hideDialog();
    // },
    //组件实例使用结束=====================================================================
    onReady: function() {
        let _this = this;
        setTimeout(function() {
            api.$http(_this.dayrankdosuccess, _this.dofail, '/WeChat/Applet/getAllUserRank', {
                session_key: app.apiData.session_key,
                type: 'day'
            }, 'POST')
        }, 100);
        setTimeout(function() {
            api.$http(_this.weekrankdosuccess, _this.dofail, '/WeChat/Applet/getAllUserRank', {
                session_key: app.apiData.session_key,
                type: 'week'
            }, 'POST')
        }, 500);
        setTimeout(function() {
            api.$http(_this.monthrankdosuccess, _this.dofail, '/WeChat/Applet/getAllUserRank', {
                session_key: app.apiData.session_key,
                type: 'month'
            }, 'POST')
        }, 1000);
    },
    dayrankdosuccess(data) { //日排名
        console.log(data);
        this.setData({
            dayranklist: data.data.message.desc
        })
        console.log(this.data.dayranklist)
        if (this.data.thenid == 0) {
            this.setData({
                topranklist: data.data.message.desc
            })
        }
    },
    weekrankdosuccess(data) { //周排名
        this.setData({
            weekranklist: data.data.message.desc
        })
        console.log(this.data.weekranklist)
        if (this.data.thenid == 1) {
            this.setData({
                topranklist: data.data.message.desc
            })
        }
    },
    monthrankdosuccess(data) { //月排名
        this.setData({
            monthranklist: data.data.message.desc
        })
        console.log(this.data.monthranklist)
        if (this.data.thenid == 2) {
            this.setData({
                topranklist: data.data.message.desc
            })
        }
    },
    dofail(err) {
        console.log(err);
    },
    gotodynamic(e) {
        let arr = e.currentTarget.id.split('|');
        if (arr[0] == '' || arr[0] == null || arr[0]==undefined||arr[0]=='undefined'){
          return;
        }
        wx.navigateTo({
            url: '../../pages/userdynamic/userdynamic?uid=' + e.currentTarget.id,
        })
    },
})