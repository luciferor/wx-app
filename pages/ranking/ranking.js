var api = require('../../utils/api.js');
var app = getApp();
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    typename: '',//加减分类型
    showModal: false,
    showtype: false,
    typelist: [
      {
        name: '自我加分',
      },
      {
        name: '自我减分'
      }
    ],
    dayranklist:[],//日排名
    weekranklist:[],//周排名
    monthranklist:[],//月排名
    topranklist:[],//顶部排名
    thenid:0,
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
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    console.log(this.data.currentTab);
    //重新给排名团赋值
    switch (this.data.currentTab) {
      case 0:
        this.setData({
          thenid:0,
          topranklist:this.data.dayranklist
        });
        console.log(this.data.topranklist)
        break;
      case 1:
        this.setData({
          thenid:1,
          topranklist: this.data.weekranklist
        });
        console.log(this.data.topranklist)
        break;
      case 2:
        this.setData({
          thenid:2,
          topranklist: this.data.monthranklist
        });
        break;
      default:
        break;
    }
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
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
  onLoad: function () {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
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
  showownerwin: function () {
    this.setData({
      showModal: true
    })
  },
  preventTouchMove: function () {

  },
  go: function () {
    this.setData({
      showModal: false
    })
  },
  //点击按钮痰喘指定的hiddenmodalput弹出框========================================================================  结束
  //============================================================================================================  加减分类型选择开始
  bindPickerChange: function (e) {
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
  onReady:function(){
    let _this = this;
    setTimeout(function(){
      api.$http(_this.dayrankdosuccess, _this.dofail, '/WeChat/Applet/getAllUserRank', {
        session_key: app.apiData.session_key,
        type: 'day'
      }, 'POST')
    },100);
    setTimeout(function () {
      api.$http(_this.weekrankdosuccess, _this.dofail, '/WeChat/Applet/getAllUserRank', {
        session_key: app.apiData.session_key,
        type: 'week'
      }, 'POST')
    }, 500);
    setTimeout(function () {
      api.$http(_this.monthrankdosuccess, _this.dofail, '/WeChat/Applet/getAllUserRank', {
        session_key: app.apiData.session_key,
        type: 'month'
      }, 'POST')
    }, 1000);
  },
  dayrankdosuccess(data){//日排名
    console.log(data);
    this.setData({
      dayranklist:data.data.message.desc
    })
    if(this.data.thenid==0){
      this.setData({
        topranklist:data.data.message.desc
      })
    }
  },
  weekrankdosuccess(data){//周排名
    this.setData({
      weekranklist:data.data.message.desc
    })
    if (this.data.thenid == 1) {
      this.setData({
        topranklist: data.data.message.desc
      })
    }
  },
  monthrankdosuccess(data){//月排名
    this.setData({
      monthranklist:data.data.message.desc
    })
    if (this.data.thenid == 2) {
      this.setData({
        topranklist: data.data.message.desc
      })
    }
  },
  dofail(err){
    console.log(err);
  },
  gotodynamic(e){
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../../pages/userdynamic/userdynamic?uid=' + e.currentTarget.id,
    })
  }
})