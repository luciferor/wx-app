var api = require('../../utils/api.js')
const { $Toast } = require('../../dist/base/index');
const util = require('../../utils/util.js');
var app = getApp();
Page({
    data: {
        cities: [
          // { "id":1, "name":"李白","pinyin":"Libai","post":"诗和远方" },
          // { "id": 2, "name": "陆游", "pinyin": "Luyou", "post": "诗和远方" },
          // { "id": 3, "name": "李清照", "pinyin": "Liqingzhao", "post": "诗和远方" },
          // { "id": 4, "name": "诸葛亮", "pinyin": "Zhugeliang", "post": "阴谋诡计" },
          // { "id": 5, "name": "杨贵妃", "pinyin": "Yangguifei", "post": "倾国倾城" },
          // { "id": 6, "name": "唐玄宗", "pinyin": "Tangxuanzong", "post": "王途霸业" },
          // { "id": 7, "name": "爱新觉罗弘毅", "pinyin": "Aixinjueluohongyi", "post": "王途霸业" },
          // { "id": 8, "name": "杜甫", "pinyin": "Dufu", "post": "诗和远方" },
          // { "id": 9, "name": "刘备", "pinyin": "Liubei", "post": "王途霸业" },
          // { "id": 10, "name": "商纣王", "pinyin": "Shangzhouwang", "post": "王途霸业" },
          // { "id": 11, "name": "爱因斯坦", "pinyin": "Aiyinsitan", "post": "星辰大海" },
          // { "id": 12, "name": "霍金", "pinyin": "Huojin", "post": "星辰大海" },
          // { "id": 13, "name": "张三丰", "pinyin": "Zhangsanfeng", "post": "与世无争" },
          // { "id": 14, "name": "孙悟空", "pinyin": "Shunwukong", "post": "妖王" },
          // { "id": 15, "name": "唐玄藏", "pinyin": "Tangxuanzang", "post": "得道高僧" },
          // { "id": 16, "name": "菩提祖师", "pinyin": "Putizushi", "post": "万道之祖" },
          // { "id": 17, "name": "安禄山", "pinyin": "Anlushan", "post": "乱臣贼子" },
          // { "id": 18, "name": "李世民", "pinyin": "Lishimin", "post": "王途霸业" },
          // { "id": 19, "name": "朱元璋", "pinyin": "Zhuyuanzhang", "post": "乞丐皇帝" },
          // { "id": 20, "name": "徐达", "pinyin": "Xueda", "post": "走狗坑" },
          // { "id": 21, "name": "牛顿", "pinyin": "Niudun", "post": "星辰大海" },
          // { "id": 22, "name": "爱迪生", "pinyin": "Aidisheng", "post": "星辰大海" },
          // { "id": 23, "name": "乔布斯", "pinyin": "Qiaobusi", "post": "英年早逝" },
          // { "id": 24, "name": "镇元子", "pinyin": "Zhenyuanzi", "post": "地仙之祖" },
          // { "id": 25, "name": "九阴真经", "pinyin": "Jiuyinzhenjing", "post": "绝世武功" },
          // { "id": 26, "name": "里亚蒂", "pinyin": "Liyadi", "post": "虚构人物" },
          // { "id": 27, "name": "葵花宝典", "pinyin": "Kuihuabaodian", "post": "绝世武功" },
        ],
        selectid: 1, //选中的id
        selecteduser: [], //选中的人
        count: 0, //选中的人数
        mutuid: '',
        searchuserlist: [],//搜索用户
        isshow: true,
    },
    selectedevent(e) {
        
        let arr = e.currentTarget.dataset.replyType.split('|');
        if (this.data.selecteduser.length == 1 && Number(this.data.selecteduser[0].id) != Number(arr[0])) {
            this.alertsuccess('只能选择一个用户');
            return;
        }

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
    onShareAppMessage: function(){
      return {
        title: '用邦分干了这杯事业，快来使用企汇邦……',
        desc: '邦分管理',
        path: '/pages/index/index',
        imageUrl: '../../images/minproTranspond.png',
        success: function(res) {
          console.log(res)
        },
        fail: function(err){
          console.log('失败')
          console.log(err)
        }
      }
    },
    selectedeventseach(e) {
        let arr = e.currentTarget.dataset.replyType.split('|');
        if (this.data.selecteduser.length == 1 && Number(this.data.selecteduser[0].id) != Number(arr[0])) {
          this.alertsuccess('只能选择一个用户');
          return;
        }
        let index = arr[1];
        this.data.searchuserlist[index].ischecked = !this.data.searchuserlist[index].ischecked;
        this.setData({
          searchuserlist:this.data.searchuserlist
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
    updateallliststatus(){
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
      
      for (let i = 0; i < this.data.cities.length; i++){
        for (let j = 0; j < this.data.cities[i].list.length; j++) {
          for (let k = 0; k < this.data.selecteduser.length; k++) {
            console.log(this.data.cities[i].list[j].id + '=' + this.data.selecteduser[k].id + '吗?' + (this.data.cities[i].list[j].id == this.data.selecteduser[k].id));
            this.data.cities[i].list[j].ischecked = (this.data.cities[i].list[j].id == this.data.selecteduser[k].id);
          }
        }
      }
      
      
      if (this.data.selecteduser.length == '0'){
        for(let i=0;i<this.data.cities.length;i++){
          for(let j=0;j<this.data.cities[i].list.length;j++){
            this.data.cities[i].list[j].ischecked = false;
          }
        }
      }
      
      this.setData({
        cities:this.data.cities
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
    changeSearch(e){
        this.searchgetinformations(e.detail.value);
    },
    otherevents: util.throttle(function (e) {
      let _this = this;
      let selused = '';
      for (let i = 0; i < _this.data.selecteduser.length; i++) {
        selused += ";" + _this.data.selecteduser[i].id;
      }
      console.log(_this.data.selecteduser);
      api.$http(function (res) {
        console.log(res);
        _this.alertsuccess(res.data.message);
        if (res.data.success) {
          setTimeout(function () { wx.navigateBack(); }, 1000)
        }
      }, function (err) {
        console.log(err);
      }, '/WeChat/Applet/finishMutualManaged', {
          session_key: app.apiData.session_key,
          id: this.data.mutuid,
          user_ids: selused.substr(1)
        }, "POST")
    }, 5000),
    alertsuccess(_str) {
        $Toast({
            content: _str,
            type: 'success'
        });
    },
    sendmsg(){
      //█████████████████████████████████████████████████████████将信息发送到公众号
      console.log('这里将发送信息到公众号');
      wx.request({
        url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/uniform_send?access_token=' + app.apiData.ACCESSKEY,
        method: 'POST',
        data: {
          'touser': 'ooOuZ5QAmmGSoc41FoIEXvcNwzLY',
          'template_id': '_abIgESCPWfj7o-5DEsWgUUN8tvVXZmg9Z3zWLbJahU',
          'page': 'index',
          'form_id': 'FORMID',
          'data': {
            'keyword1': {
              'value': '信息提示',
              'color': '操作成功！'
            },
            'keyword2': {
              'value': '信息提示',
              'color': '有人给您加分了'
            },

            'emphasis_keyword': 'keyword1.DATA',
            'emphasis_keyword': 'keyword2.DATA' 
          }
        },
        success: function (res) {
          //发送信息到微信
          console.log('发送信息到微信');
          console.log(res);
        }
      })
      //█████████████████████████████████████████████████████████将信息发送到公众号

    },
    getinformations(){
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
    searchgetinformations(_str){
        console.log();
        if (_str == '') {
          this.setData({
            searchuserlist: []
          })
          return;
        }
        let _this = this;
        _this.setData({
          searchuserlist:[]
        })
        api.$http(function(res) {
            console.log(res);
            for(let i=0;i<res.data.message.length;i++){
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
            for(let i=0;i<_this.data.searchuserlist.length;i++){
              for (let j = 0; j < _this.data.selecteduser.length;j++){
                if (_this.data.searchuserlist[i].id == _this.data.selecteduser[j].id){
                  _this.data.searchuserlist[i].ischecked = true;
                }
              }
            }
            _this.setData({
              searchuserlist: _this.data.searchuserlist
            })
        }, function(err){
            console.log(err)
        }, '/WeChat/Applet/getUserByName', {
            session_key: app.apiData.session_key,
            name: _str
        }, 'POST')
    }
});