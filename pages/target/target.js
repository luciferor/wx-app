//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    current: 'tab1',
    currentIndex: 0,
    "firstList": ["不二家棒棒糖", "清风湿至今", "床上四件套", "其他噢", "我要加一百分", "野心勃勃", "不二家棒棒糖", "清风湿至今", "床上四件套", "其他噢", "我要加一百分", "野心勃勃"],
    "secondList": ["帮助他人", "保持桌面清洁", "有责任心", "乱丢垃圾", "随地吐痰", "不讲卫生", "帮助他人", "保持桌面清洁", "有责任心", "乱丢垃圾", "随地吐痰", "不讲卫生","帮助他人", "保持桌面清洁", "有责任心", "乱丢垃圾", "随地吐痰", "不讲卫生"],
    rankTargetNum: 0,//排名目标
    scoreTargetNum: 0,//邦分目标
    customTargetNum: 0,//自定义目标
    showApplyBox : false,
    showTypeBox : false,
    showRankBox: false,
    showNumBox: false,
    newTargetType: '目标类型',
    newTargetRank: '日排名',
    newTargetNum : '第一名',
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
  handleAnimalChange(_value) {
    console.log(_value);
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
    let currentPageIndex =
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
      newTargetType: this.data.typeAction[index].name,
      showTypeBox: false
    })
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
  //选择目标类型点击处理
  handleNumClickItem({ detail }) {
    let index = detail.index;
    this.setData({
      //拿到当前索引并动态改变
      newTargetNum: this.data.numAction[index].name,
      showNumBox: false
    })
  }
})