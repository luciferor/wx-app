//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  gotouserdynamicdes(){
    wx.navigateTo({
      url: '../../pages/userdynamic/userdynamic',
      success: (result)=>{
        console.log(result);
      },
      fail: ()=>{
        console.log("失败");
      },
      complete: ()=>{
        console.log("完成");
      }
    });
  },
  gotodwardymicdes(){
    wx.navigateTo({
      url: '../../pages/awarddynamic/awarddynamic',
      success: (result)=>{
        console.log(result);
      },
      fail: ()=>{
        console.log("失败");
      },
      complete: ()=>{
        console.log("完成");
      }
    });
  },
  rankingevents(){
    wx.navigateTo({
      url: '../../pages/ranking/ranking',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
})