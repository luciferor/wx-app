var app = getApp();

/**
 * POST请求，
 * URL：接口
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 * 参数：接口地址：url,接口参数：params
 */
function $http(_dosuccess,_url,_params,_method){
  wx.request({
    url: "https://devqypyp.xiaohuibang.com" + _url, //仅为示例，并非真实的接口地址
    method: _method,
    data: _params,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (ress) {
      _dosuccess(ress);
    }
  })
}


/**
 * module.exports用来导出代码
 * js文件中通过var call = require("../util/api.js")  加载
 * 在引入引入文件的时候"  "里面的内容通过../../../这种类型，小程序的编译器会自动提示，因为你可能
 * 项目目录不止一级，不同的js文件对应的工具类的位置不一样
 */
//将模块接口暴露出来
module.exports = {
  $http: $http,
}