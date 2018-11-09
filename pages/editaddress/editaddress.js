// pages/editaddress/editaddress.js
var api = require('../../utils/api.js');
const { $Toast } = require('../../dist/base/index');
var addmap = require('../../utils/map.js');
//获取应用实例
const app = getApp()
var address = require('../../utils/city.js')
var animation
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldaddlist:'',
    uname: '',
    uphone: '',
    udesaddr: '',
    id:'',
    //-------------------------------------------------------------
    menuType: 0,
    begin: null,
    status: 1,
    end: null,
    isVisible: false,
    animationData: {},
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    areas: [],
    province: '',
    city: '',
    area: '',
    areaInfo: '请选择省份/市/县/街道',
    areaid: ''//用于存储id
  },
  clearevent(){
    this.setData({
      uname:''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      oldaddlist:JSON.parse(options.id),
    })
    this.setData({
      uname: this.data.oldaddlist.name,
      uphone: this.data.oldaddlist.mobile,
      udesaddr: this.data.oldaddlist.address,
      areaInfo: addmap.map[0][this.data.oldaddlist.province] + ',' + addmap.map[0][this.data.oldaddlist.city] + ',' + addmap.map[0][this.data.oldaddlist.country],
      areaid: this.data.oldaddlist.province + ',' + this.data.oldaddlist.city + ',' + this.data.oldaddlist.country,
      id:this.data.oldaddlist.id
    })
    // 初始化动画变量
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    this.animation = animation;
    // 默认联动显示北京
    var id = address.provinces[0].id
    this.setData({
      provinces: address.provinces,
      citys: address.citys[id],
      areas: address.areas[address.citys[id][0].id],
    })
    console.log(this.data)
  },
  submitevent() {
    console.log(this.data.udesaddr)
    if (this.data.uname == '') {
      $Toast({
        content: '请输入收货人姓名',
        type: 'warning'
      });
      return;
    }
    if (this.data.uphone == '') {
      $Toast({
        content: '请输入收货人联系电话',
        type: 'warning'
      });
      return;
    }
    if (this.data.areaid == '') {
      $Toast({
        content: '请选择收货所在的省份/市/区',
        type: 'warning'
      });
      return;
    }
    if (this.data.udesaddr == '') {
      $Toast({
        content: '请输入收货的详细地址，街道门牌号等',
        type: 'warning'
      });
      return;
    }
    let _this = this;
    let arr = _this.data.areaid.split(',');
    api.$http(function (res) {
      if (res.data.success) {
        $Toast({
          content: res.data.message,
          type: 'success'
        });
        //返回到个人资料页面设置页
        wx.navigateBack();
      }
    }, function (err) {
      console.log(err);
    }, '/WeChat/Applet/addressadd', {
        session_key: app.apiData.session_key,
        address: _this.data.udesaddr,
        province: arr[0],
        city: arr[1],
        country: arr[2],
        mobile: _this.data.uphone,
        name: _this.data.uname,
        id:_this.data.id
      }, 'POST')
  },
  nameevent(e) {
    this.setData({
      uname: e.detail.value
    })
  },
  phpneevent(e) {
    this.setData({
      uphone: e.detail.value
    })
  },
  addrevent(e) {
    this.setData({
      udesaddr: e.detail.value
    })
  },
  // 显示
  showMenuTap: function (e) {
    console.log('selectState')
    //获取点击菜单的类型 1点击状态 2点击时间 
    var menuType = e.currentTarget.dataset.type
    // 如果当前已经显示，再次点击时隐藏
    if (this.data.isVisible == true) {
      this.startAnimation(false, -200)
      return
    }
    this.setData({
      menuType: menuType
    })
    this.startAnimation(true, 0)
  },
  hideMenuTap: function (e) {
    this.startAnimation(false, -200)
  },
  // 执行动画
  startAnimation: function (isShow, offset) {
    var that = this
    var offsetTem
    if (offset == 0) {
      offsetTem = offset
    } else {
      offsetTem = offset + 'rpx'
    }
    this.animation.translateY(offset).step()
    this.setData({
      animationData: this.animation.export(),
      isVisible: isShow
    })
    console.log(that.data)
  },
  // 选择状态按钮
  selectState: function (e) {
    console.log('selectState1')
    this.startAnimation(false, -200)
    var status = e.currentTarget.dataset.status
    this.setData({
      status: status
    })
    console.log(this.data)

  },
  // 日志选择
  bindDateChange: function (e) {
    console.log(e)
    if (e.currentTarget.dataset.type == 1) {
      this.setData({
        begin: e.detail.value
      })
    } else if (e.currentTarget.dataset.type == 2) {
      this.setData({
        end: e.detail.value
      })
    }
  },
  sureDateTap: function () {
    this.data.pageNo = 1
    this.startAnimation(false, -200)
  },
  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    var that = this
    console.log('111111111')
    if (that.data.addressMenuIsShow) {
      return
    }
    that.startAddressAnimation(true)
  },
  // 执行动画
  startAddressAnimation: function (isShow) {
    console.log(isShow)
    var that = this
    if (isShow) {
      that.animation.translateY(0 + 'vh').step()
    } else {
      that.animation.translateY(40 + 'vh').step()
    }
    that.setData({
      animationAddressMenu: that.animation.export(),
      addressMenuIsShow: isShow,
    })
  },
  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },
  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var city = that.data.city
    var value = that.data.value
    that.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    var areaInfo = that.data.provinces[value[0]].name + ',' + that.data.citys[value[1]].name + ',' + that.data.areas[value[2]].name
    that.setData({
      areaInfo: areaInfo,
      areaid: that.data.provinces[value[0]].id + ',' + that.data.citys[value[1]].id + ',' + that.data.areas[value[2]].id
    })
    console.log(that.data.areaid);
  },
  hideCitySelected: function (e) {
    console.log(e)
    this.startAddressAnimation(false)
  },
  // 处理省市县联动逻辑
  cityChange: function (e) {
    console.log(e)
    var value = e.detail.value
    var provinces = this.data.provinces
    var citys = this.data.citys
    var areas = this.data.areas
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    if (this.data.value[0] != provinceNum) {
      var id = provinces[provinceNum].id
      this.setData({
        value: [provinceNum, 0, 0],
        citys: address.citys[id],
        areas: address.areas[address.citys[id][0].id],
      })
    } else if (this.data.value[1] != cityNum) {
      var id = citys[cityNum].id
      this.setData({
        value: [provinceNum, cityNum, 0],
        areas: address.areas[citys[cityNum].id],
      })
    } else {
      this.setData({
        value: [provinceNum, cityNum, countyNum]
      })
    }
    console.log(this.data)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})