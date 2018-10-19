var app = getApp();
Page({
    data:{
        winHeight:"",//窗口高度
        currentTab:0, //预设当前项的值
        scrollLeft:0, //tab标题的滚动条位置
        typename:'',//加减分类型
        showModal: false,
        showtype:false,
        typelist: [
          {
            name: '自我加分',
          },
          {
            name: '自我减分'
          }
        ],
    },
    //===========================================================================================================选择加减分类型
    applyevent(){
      wx.navigateTo({
        url: '../../pages/selectuseres/selectuseres',
      })
    },
    closetype(){
      this.setData({
        showtype: false
      });
    },
    exittype({ detail }){
      const index = detail.index;
      this.setData({
        typename: this.data.typelist[index].name,
        showtype:false
      })
      
    },
    selecttype(){
      this.setData({
        showtype: true
      });
    },
    //===========================================================================================================选择加减分类型结束
    //============================================================================================================  选项卡js
    // 滚动切换标签样式
    switchTab:function(e){
        this.setData({
            currentTab:e.detail.current
        });
        this.checkCor();
    },
    // 点击标题切换当前页时改变样式
    swichNav:function(e){
        var cur=e.target.dataset.current;
        if(this.data.currentTaB==cur){return false;}
        else{
            this.setData({
                currentTab:cur
            })
        }
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor:function(){
    if (this.data.currentTab>4){
        this.setData({
        scrollLeft:300
        })
    }else{
        this.setData({
        scrollLeft:0
        })
    }
    },
    onLoad: function() {  
        var that = this; 
        //  高度自适应
        wx.getSystemInfo( {  
            success: function( res ) {  
                var clientHeight=res.windowHeight,
                    clientWidth=res.windowWidth,
                    rpxR=750/clientWidth;
            var  calc=clientHeight*rpxR-120;
                console.log(calc)
                that.setData( {  
                    winHeight: calc  
                });  
            }  
        });
    },  
    footerTap:app.footerTap,
    //============================================================================================================  选项卡js
    //点击按钮痰喘指定的hiddenmodalput弹出框========================================================================  开始
    showownerwin:function(){
        this.setData({
            showModal: true
        })
    },
    preventTouchMove: function(){
 
    },
    go: function(){ 
        this.setData({
            showModal: false
        })
    },
    //点击按钮痰喘指定的hiddenmodalput弹出框========================================================================  结束
    //============================================================================================================  加减分类型选择开始
    bindPickerChange:function(e){
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
        index: e.detail.value
        })
    }
    //============================================================================================================  加减分类型选择结束
})