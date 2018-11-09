var api = require('../../utils/api.js')
const { $Toast } = require('../../dist/base/index');
const util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    cities: [],
    selectid: 1, //选中的id
    selecteduser: [], //选中的人
    count: 0, //选中的人数
    mutuid: '',
    searchuserlist: [],//搜索用户
    isshow: true,
  },
  selectedevent(e) {

    let arr = e.currentTarget.dataset.replyType.split('|');

    let index = arr[1];
    let lindex = arr[2];
    this.data.cities[index].list[lindex].ischecked = !this.data.cities[index].list[lindex].ischecked;
    this.setData({
      cities: this.data.cities
    })
    console.log(this.data.cities);
    this.setData({
      selectid: arr[0],
    })

    //console.log(e.currentTarget.dataset.replyType);
    //临时变量
    //★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
    if (this.data.cities[index].list[lindex].ischecked) {
      this.data.selecteduser.push({
        id: arr[0],
      });
    } else {
      console.log(arr[0] + "反选aaa");
      for (let i = 0; i < this.data.selecteduser.length; i++) {
        if (this.data.selecteduser[i].id == arr[0]) {
          this.data.selecteduser.splice(i, 1);
        }
      }
    }
    //★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
    this.setData({
      count: this.data.selecteduser.length
    })
    console.log(this.data.selecteduser);
  },
  onShareAppMessage: function () {
    return {
      title: '用邦分干了这杯事业，快来使用企汇邦……',
      desc: '邦分管理',
      path: '/pages/index/index',
      imageUrl: '../../images/minproTranspond.png',
      success: function (res) {
        console.log(res)
      },
      fail: function (err) {
        console.log('失败')
        console.log(err)
      }
    }
  },
  selectedeventseach(e) {
    let arr = e.currentTarget.dataset.replyType.split('|');
    let index = arr[1];
    this.data.searchuserlist[index].ischecked = !this.data.searchuserlist[index].ischecked;
    this.setData({
      searchuserlist: this.data.searchuserlist
    })
    console.log(this.data.searchuserlist);
    this.setData({
      selectid: arr[0],
    })
    //console.log(e.currentTarget.dataset.replyType);
    //临时变量
    //★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
    if (this.data.searchuserlist[index].ischecked) {
      this.data.selecteduser.push({
        id: arr[0],
      });
    } else {
      console.log(arr[0] + "反选bbb");
      for (let i = 0; i < this.data.selecteduser.length; i++) {
        if (this.data.selecteduser[i].id == arr[0]) {
          this.data.selecteduser.splice(i, 1);
        }
      }
    }
    //★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
    this.setData({
      count: this.data.selecteduser.length
    })
    console.log(this.data.selecteduser);
    //判断列表中是否符合选中和不选中的状态
    this.updateallliststatus();
  },
  updateallliststatus() {
    console.log('到这里了嘛？');
    console.log(this.data.cities);
    console.log(this.data.selecteduser);
    // for(let i=0;i<this.data.cities.length;i++){
    //   for(let j=0;j<this.data.cities[i].list.length;j++){
    //     for(let k=0;k<this.data.selecteduser.length;k++){
    //       console.log(this.data.cities[i].list[j].id);
    //       console.log(this.data.selecteduser[k].id);
    //       if (this.data.cities[i].list[j].id == this.data.selecteduser[k].id){
    //         this.data.cities[i].list[j].ischecked = true;
    //       }else{
    //         this.data.cities[i].list[j].ischecked = false;
    //       }
    //     }
    //   }
    // }

    for (let i = 0; i < this.data.cities.length; i++) {
      for (let j = 0; j < this.data.cities[i].list.length; j++) {
        for (let k = 0; k < this.data.selecteduser.length; k++) {
          console.log(this.data.cities[i].list[j].id + '=' + this.data.selecteduser[k].id + '吗?' + (this.data.cities[i].list[j].id == this.data.selecteduser[k].id));
          this.data.cities[i].list[j].ischecked = (this.data.cities[i].list[j].id == this.data.selecteduser[k].id);
        }
      }
    }


    if (this.data.selecteduser.length == '0') {
      for (let i = 0; i < this.data.cities.length; i++) {
        for (let j = 0; j < this.data.cities[i].list.length; j++) {
          this.data.cities[i].list[j].ischecked = false;
        }
      }
    }

    this.setData({
      cities: this.data.cities
    })
  },
  onChange(event) {
    console.log(event.detail, '点击右侧菜单回调日期')
  },
  onReady() {
    this.getinformations();
  },
  onLoad(option) {
    this.setData({
      mutuid: option.id,
    })
    let _this = this;
  },
  convertdata() {
    let storeCity = new Array(26);
    const words = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    words.forEach((item, index) => {
      storeCity[index] = {
        key: item,
        list: []
      }
    })
    this.data.cities.forEach((item) => {
      let firstName = item.pinyin.substring(0, 1);
      let index = words.indexOf(firstName);
      storeCity[index].list.push({
        id: item.id,
        name: item.name,
        key: firstName,
        post: item.postname,
        img: item.img,
        ischecked: false,
        wechat_name: item.wechat_name
      });
    })
    this.data.cities = storeCity;
    console.log(storeCity);
    this.setData({
      cities: this.data.cities
    })
  },
  // changeSearch(e) {
  //     let _this = this;
  //     api.$http(function(res) {
  //         console.log(res);
  //         _this.setData({
  //             searchuserlist: res.data.message
  //         })        
  //     }, function(err) {
  //         console.log(err)
  //     }, '/WeChat/Applet/getUserByName', {
  //         session_key: app.apiData.session_key,
  //         name: e.detail.value
  //     }, 'POST')
  // },
  changeSearch(e) {
    this.searchgetinformations(e.detail.value);
  },
  otherevents: util.throttle(function (e) {
    //wx.setStorageSync('selectusersbuff', this.data.selecteduser);
    wx.navigateBack();

    // 往上一级页面传参
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; // 当前页面
    var prevPage = pages[pages.length - 2]; // 上一级页面

    // 直接调用上一级页面Page对象，存储数据到上一级页面中
    prevPage.setData({
      planusers:this.data.selecteduser,
    });    
  }, 5000),
  alertsuccess(_str) {
    $Toast({
      content: _str,
      type: 'success'
    });
  },
  sendmsg() {

  },
  getinformations() {
    let _this = this;
    api.$httpcom(function (res) {
      _this.data.cities = [];
      let item = res.data.message;

      for (var i = 0; i < res.data.message.length; i++) {
        if (item[i].wechat_name) {
          _this.data.cities.push({
            id: item[i].id,
            name: item[i].name,
            pinyin: item[i].letter,
            post: item.postname,
            img: item[i].user_img,
            ischecked: false,
            wechat_name: item[i].wechat_name
          })
        }
      }
      //console.log(_this.data.cities)
      //console.log('asdkjfaslkfjasldjfaslkfjas;lkfjaslkfjaslkdfj')
    }, function (err) {
      console.log(err)
    }, '/WeChat/Applet/getUserList', {
        session_key: app.apiData.session_key
      }, 'POST', function () {
        setTimeout(function () {
          _this.convertdata();
          _this.setData({
            isshow: false
          })
        }, 100)
      });
  },
  searchgetinformations(_str) {
    console.log();
    if (_str == '') {
      this.setData({
        searchuserlist: []
      })
      return;
    }
    let _this = this;
    _this.setData({
      searchuserlist: []
    })
    api.$http(function (res) {
      console.log(res);
      for (let i = 0; i < res.data.message.length; i++) {
        _this.data.searchuserlist.push({
          id: res.data.message[i].id,
          name: res.data.message[i].name,
          pinyin: res.data.message[i].letter,
          post: res.data.message.postname,
          img: res.data.message[i].user_img,
          ischecked: false,
          wechat_name: res.data.message[i].wechat_name
        })
        _this.setData({
          searchuserlist: _this.data.searchuserlist
        })
      }
      for (let i = 0; i < _this.data.searchuserlist.length; i++) {
        for (let j = 0; j < _this.data.selecteduser.length; j++) {
          if (_this.data.searchuserlist[i].id == _this.data.selecteduser[j].id) {
            _this.data.searchuserlist[i].ischecked = true;
          }
        }
      }
      _this.setData({
        searchuserlist: _this.data.searchuserlist
      })
    }, function (err) {
      console.log(err)
    }, '/WeChat/Applet/getUserByName', {
        session_key: app.apiData.session_key,
        name: _str
      }, 'POST')
  }
});