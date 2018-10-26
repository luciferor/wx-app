//index.js
var api = require('../../utils/api.js');
const { $Toast } = require('../../dist/base/index');
//获取应用实例
const app = getApp()

Page({
  data: {
    current: 'tab1',
    currentIndex: 0,
    rankTargetNum: 0,//排名目标
    scoreTargetNum: 0,//邦分目标
    customTargetNum: 0,//自定义目标
    rankTargetList: [],
    scoreTargetList: [],
    customTargetList:[],
    selectedranklist:[],//选择的排名目标
    selectscorelist:[],//选择的邦分目标
    allselectedlist:[],//所有的
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
  onReady:function(){
    this.setData({
      currentIndex:0
    })
    //加载初始数据
    this.getNoticeList(1,10);
    this.getNoticeList(2,10);
  },
  submitall(){
    let _this = this;
    //将两个数组合并
    for (let i = 0; i < this.data.selectedranklist.length;i++){
      this.data.allselectedlist.push({
        id: Number(this.data.selectedranklist[i].id),
        type: Number(this.data.selectedranklist[i].type)
      })
    }
    for (let i = 0; i < this.data.selectscorelist.length; i++) {
      this.data.allselectedlist.push({
        id: Number(this.data.selectscorelist[i].id),
        type: Number(this.data.selectscorelist[i].type)
      })
    }
    
    api.$http(function(res){
      console.log(res)
      _this.alertmsg(res.data.message);
      if(res.data.success){
        _this.resetall();
      }
    },function(err){
      console.log(err)
    },'/targetadd/target',{
        session_key:app.apiData.session_key,
        target: JSON.stringify(this.data.allselectedlist)
    },'POST')
  },
  resetall(){
    for (let i = 0; i < this.data.rankTargetList.length;i++){
      if (this.data.rankTargetList[i].ischecked) {
        this.data.rankTargetList[i].ischecked = false;
      }
    }
    for (let i = 0; i < this.data.scoreTargetList.length;i++){
      if (this.data.scoreTargetList[i].ischecked){
        this.data.scoreTargetList[i].ischecked = false;
      }
    }
    this.setData({
      rankTargetNum: 0,//排名目标
      scoreTargetNum: 0,//邦分目标
      selectedranklist: [],//选择的排名目标
      selectscorelist: [],//选择的邦分目标
      rankTargetList:this.data.rankTargetList,
      scoreTargetList:this.data.scoreTargetList
    })
  },
  //选择排名目标
  rankevents(e){
    console.log(e);
    let arr = e.currentTarget.id.split('|');
    let index = arr[1];
    this.data.rankTargetList[index].ischecked = !this.data.rankTargetList[index].ischecked;
    this.setData({
      rankTargetList: this.data.rankTargetList
    })
    //★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
    if (this.data.rankTargetList[index].ischecked) {
      this.data.selectedranklist.push({
        id: arr[0],
        type:'1'
      });
    } else {
      console.log(arr[0] + "反选aaa");
      for (let i = 0; i < this.data.selectedranklist.length; i++) {
        if (this.data.selectedranklist[i].id == arr[0]) {
          this.data.selectedranklist.splice(i, 1);
        }
      }
    }
    //★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
    this.setData({
      rankTargetNum: this.data.selectedranklist.length
    })
  },
  scoreevents(e){
    console.log(e);
    let arr = e.currentTarget.id.split('|');
    let index = arr[1];
    this.data.scoreTargetList[index].ischecked = !this.data.scoreTargetList[index].ischecked;
    this.setData({
      scoreTargetList: this.data.scoreTargetList
    })

    //★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
    if (this.data.scoreTargetList[index].ischecked) {
      this.data.selectscorelist.push({
        id: arr[0],
        type:'2'
      });
    } else {
      console.log(arr[0] + "反选aaa");
      for (let i = 0; i < this.data.selectscorelist.length; i++) {
        if (this.data.selectscorelist[i].id == arr[0]) {
          this.data.selectscorelist.splice(i, 1);
        }
      }
    }
    //★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
    this.setData({
      scoreTargetNum: this.data.selectscorelist.length
    })
  },
  //获取目标列表(1:排名2:邦分3:自定义)
  getNoticeList(types, pages) {
    console.log(types);
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
  //获取目标列表结果处理getNoticeList
  dosuccess(types,data){
    console.log(types);
      console.log(data)
      let type = types
      if(type == 1){
        this.setData({
          rankTargetList: []
        });
        for (let i = 0; i < data.length;i++){
          this.data.rankTargetList.push({
            id:data[i].id,
            name:data[i].title,
            ischecked:false,
            rank: data[i].rank,
            ranktitle: data[i].ranktitle,
            type:data[i].type,
            gift_type: data[i].gift_type,
            gift_score: data[i].gift_score
          })
        }
        this.setData({
          rankTargetList: this.data.rankTargetList
        });
        console.log('-------------------------------1');
        console.log(this.data.rankTargetList);
      }else if(type ==2){
        this.setData({
          scoreTargetList: []
        });
        for (let i = 0; i < data.length; i++) {
          this.data.scoreTargetList.push({
            id: data[i].id,
            name: data[i].title,
            ischecked: false,
            rank: data[i].rank,
            ranktitle: data[i].ranktitle,
            type: data[i].type,
            gift_type: data[i].gift_type,
            gift_score: data[i].gift_score
          })
        }
        this.setData({
          scoreTargetList: this.data.scoreTargetList
        });
        console.log('-------------------------------2');
        console.log(this.data.scoreTargetList.length>0);
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
    _this.setData({
      showApplyBox: false
    });
    api.$https('/application/target', {
      session_key: app.apiData.session_key,
      type: _this.data.targetType,
      title: _this.data.targetTitle,
      gift_type:_this.data.giftType,
      rank:_this.data.rank,
      gift_score:''
    }, 'POST', function (data) {
      if(data.data.success){
        $Toast({
          content: data.data.message
        });
        _this.setData({
          newTargetType: '目标类型',
          newTargetRank: '日排名',
          newTargetNum: '第一名',
          targetType: 1,//申请类型
          giftType: 1,//礼品类型
          rank: 1,//排名
          targetTitle: '',//目标名称
          gift_score: 0,//兑换所需邦分
        })
      }else{
        $Toast({
          content: data.data.message
        });
      }
    }, function () {
      $Toast({
        content: '申请失败，请重试'
      });
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
    this.setData({
      rankTargetNum: 0,//排名目标
      scoreTargetNum: 0,//邦分目标
      selectedranklist: [],//选择的排名目标
      selectscorelist: [],//选择的邦分目标
    })
    console.log(e.currentTarget.dataset.idx)
    let currentPageIndex = e.currentTarget.dataset.idx;
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
    //this.getNoticeList(e.currentTarget.id,10);
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
  },alertmsg(_str){
    $Toast({
      content: _str,
      type: 'success'
    });
  }
})