/**
 * POST请求，
 * URL：接口
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 * 参数：接口地址：url,接口参数：params
 */
function $http(_dosuccess,_dofail,_url,_params,_method){//参数说明，成功回调函数dosuccess(res)，接口地址"/xxxx"，参数({,,,})，请求类型（post/get）
  wx.request({
    url: "https://devqypyp.xiaohuibang.com" + _url, //仅为示例，并非真实的接口地址
    method: _method,
    data: _params,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (ress) {
      _dosuccess(ress);
    },
    fail:function(err){
      _dofail(err);
    }
  })
}

<<<<<<< HEAD
//
=======

>>>>>>> 42517a5eaf6e3d9b8ac0ffe3ba73a5598d54eee2
/**
 * POST请求，
 * URL：接口
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
<<<<<<< HEAD
 * docomplete:完成回调函数
 * 参数：接口地址：url,接口参数：params
 */
function $httpcom(_dosuccess, _dofail, _url, _params, _method,_docomplete) {//参数说明，成功回调函数dosuccess(res)，接口地址"/xxxx"，参数({,,,})，请求类型（post/get）
=======
 * 参数：接口地址：url,接口参数：params
 */
function $https(_url, _params, _method,_dosuccess, _dofail) {//参数说明，成功回调函数dosuccess(res)，接口地址"/xxxx"，参数({,,,})，请求类型（post/get）
>>>>>>> 42517a5eaf6e3d9b8ac0ffe3ba73a5598d54eee2
  wx.request({
    url: "https://devqypyp.xiaohuibang.com" + _url, //仅为示例，并非真实的接口地址
    method: _method,
    data: _params,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (ress) {
      _dosuccess(ress);
    },
    fail: function (err) {
      _dofail(err);
<<<<<<< HEAD
    },
    complete:function(){
      _docomplete();
=======
>>>>>>> 42517a5eaf6e3d9b8ac0ffe3ba73a5598d54eee2
    }
  })
}

//将模块接口暴露出来
module.exports = {
  $http: $http,
<<<<<<< HEAD
  $httpcom:$httpcom,
=======
  $https:$https
>>>>>>> 42517a5eaf6e3d9b8ac0ffe3ba73a5598d54eee2
}