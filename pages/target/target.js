//index.js
var api = require('../../utils/api.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    current: 'tab1',
    currentIndex: 0,
    rankTargetList: [],
    scoreTargetList: [],
    customTargetList:[],
    rankTargetNum : 0,
    scoreTargetNum: 2,
    customTargetNum : 3,
    totalTargetNum : 5,
    showApplyBox : false,
    showTypeBox : false,
    showRankBox: false,
    showNumBox: false,
    newTargetType: '目标类型',
    newTargetRank: '日排名',
    newTargetNum : '第一名',
    targetType:1,//申请类型
    giftType:1,//礼品类型
    rank:1,//排名
    targetTitle:'',//目标名称
    gift_score: 0,//兑换所需邦分
    typeAction: [
      {
        name: '排名目标',
      },
      {
        name: '邦分目标'
      },
    ],
    rankAction: [
      {
        name: '日排名',
      },
      {
        name: '周排名'
      },
      {
        name: '月排名'
      }
    ],
    numAction: [
      {
        name: '第一名',
      },
      {
        name: '第二名'
      },
      {
        name: '第三名'
      }
    ],
  },
  //获取目标列表(1:排名2:邦分3:自定义)
  getNoticeList(types, pages) {
    let _this = this;
    api.$https('/targetlist/target', {
      session_key: app.apiData.session_key,
      type: types,
    }, 'POST', function (data) {
      if (data.data.success) {
        _this.dosuccess(types, data.data.message)
      }
    }, function () {
      console.log(请求失败);
    });
  },
  //获取目标列表结果处理
  dosuccess(types,data){
      console.log(data)
      if(type == 1){
        this.setData({
          rankTargetList:data
        });
      }else if(type ==2){
        this.setData({
          scoreTargetList: data
        });
      }else if(type == 3){
        this.setData({
          customTargetList: data
        });
      }
  },
  //用户输入数据的改变
  inputValue(e){
    this.setData({
      targetTitle: e.detail.value
    });
  },

  inputScoreValue(e){
    this.setData({
      gift_score: e.detail.value
    });
  },

  //申请自定义目标
  applyNotice() {
    let _this = this;
    console.log("====title" + _this.data.targetTitle)
    api.$https('/application/target', {
      session_key: app.apiData.session_key,
      type: _this.data.targetType,
      title: _this.data.targetTitle,
      gift_type:_this.data.giftType,
      rank:_this.data.rank,
      gift_score:''
    }, 'POST', function (data) {
      console.log(data.data.message);
      if (data.data.success) {
        
      }
    }, function () {
      console.log(请求失败);
    });
  },

  //swiper切换时会调用
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      console.log(e.detail.source);
      this.setData({
        currentIndex: e.detail.current
      })
    }
  },
  //用户点击tab时调用
  titleClick: function (e) {
    let currentPageIndex = currentTarget.dataset.idx
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  },
  
  //申请提示框
  handleApplyOpen(){
      this.setData({
        showApplyBox : true
      });
  },
  handleClose(){
    this.setData({
      showApplyBox: false
    });
  },
  //关闭选择目标类型
  handleTypeCancel() {
    this.setData({
      showTypeBox: false
    });
  },
  //选择目标类型
  handleTypeOpen(){
    this.setData({
      showTypeBox: true
    });
  },
  //选择目标类型点击处理
  handleClickItem({ detail }){
    let index = detail.index;
    this.setData({
      //拿到当前索引并动态改变
      targetType:index+1,
      newTargetType: this.data.typeAction[index].name,
      showTypeBox: false
    });
  },
  //关闭排名类型
  handleRankCancel() {
    this.setData({
      showRankBox: false
    });
  },
  //选择排名类型
  handleRankOpen() {
    this.setData({
      showRankBox: true
    });
  },
  //选择排名类型点击处理
  handleRankClickItem({ detail }) {
    let index = detail.index;
    this.setData({
      //拿到当前索引并动态改变
      giftType:index+1,
      newTargetRank: this.data.rankAction[index].name,
      showRankBox: false
    })
  },
  //关闭名次类型
  handleNumCancel() {
    this.setData({
      showNumBox: false
    });
  },
  //选择名次类型
  handleNumOpen() {
    this.setData({
      showNumBox: true
    });
  },
  //选择名次类型点击处理
  handleNumClickItem({ detail }) {
    let index = detail.index;
    this.setData({
      //拿到当前索引并动态改变
      rank:index+1,
      newTargetNum: this.data.numAction[index].name,
      showNumBox: false
    })
  }
})