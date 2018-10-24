var api = require('../../utils/api.js');
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
    selectid:1,//选中的id
    selecteduser:[],//选中的人
    count:0,//选中的人数
    othertype:'',
    buff:'',
    reasonr:'',
    searchuserlist:[],//搜索用户
  },
  selectedevent(e){
    this.setData({
      selectid: e.currentTarget.dataset.replyType,
    })
    //console.log(e.currentTarget.dataset.replyType);
    //临时变量
    this.data.selecteduser.push({
      id: e.currentTarget.dataset.replyType,
    });
    this.setData({
      count:this.data.selecteduser.length
    })
    console.log(this.data.selecteduser);
  },
  onChange(event) {
    console.log(event.detail, '点击右侧菜单回调日期')
  },
  onReady() {
    let _this = this;
    api.$http(function (res) {
      _this.data.cities = [];
      let item = res.data.message;
      for (var i = 0; i < res.data.message.length; i++) {
        if(item[i].user_img!=""){
          _this.data.cities.push({
            id: item[i].id,
            name: item[i].name,
            pinyin: item[i].letter,
            post: '暂无岗位',
            img: item[i].user_img
          })
        }
      }
      console.log(_this.data.cities)
    }, function (err) {
      console.log(err)
    }, '/WeChat/Applet/getUserList', {
        session_key: app.apiData.session_key
    }, 'POST'); 
  },
  onLoad(option){
    console.log(option);
    this.setData({
      othertype:option.type,
      buff:option.buff,
      reasonr:option.reasonr,
    })
    let _this = this;
    setTimeout(function(){
      _this.convertdata();
    },10000)
  },
  convertdata(){
    let storeCity = new Array(26);
    const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
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
        post: item.id,
        img: item.user_img
      });
    })
    this.data.cities = storeCity;
    console.log(storeCity);
    this.setData({
      cities: this.data.cities
    })
  },
  changeSearch(e){
    let _this = this;
    api.$http(function(res){
      _this.setData({
        searchuserlist:res.data.message
      })
    },function(err){
      console.log(err)
      },'/WeChat/Applet/getUserByName',
    {
      session_key:app.apiData.session_key,
      name:e.detail.value
    },'POST')
  },
  otherevents(){
    let _this = this;
    let selused='';
    for (let i = 0; i < _this.data.selecteduser.length;i++){
      selused += ";"+_this.data.selecteduser[i].id;
    }
    console.log(_this.data.selecteduser);
    api.$http(function (res) {
      console.log(res);
    }, function (err) {
      console.log(err);
    },'/WeChat/Applet/changeGradeApplyByOther',{
        session_key:app.apiData.session_key,
        bangfen:_this.data.buff,
        reason: _this.data.reasonr,
        type: _this.data.othertype == '加分' ? 'add' :'reduce',
        user_ids:selused.substr(1)
    },"POST")
  }
});