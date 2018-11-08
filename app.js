//app.js
App({
    apiData: {
        GetLincesShow: false, //是否
        code: '', //登录需要的code
        api: 'https://devqypyp.xiaohuibang.com', //接口根地址
        session_key: '', //response.data.message.session_key
        open_id:'',
        app_id:'wx416b34cf4f1994cf',
        userstatus: true,
        Company_Id: '', //response.data.message.company_id
        isAdmin: 0,
        nickName: '',
        invite_id: '',
        company_name: '',
        creatOrg: {
            mutualMergeArr: [],
            selfMergeArr: [],
            createOrgName: '',
            showSelfTip: true,
            showMutualTip: true,
            mutualHangyeBehaviorArr: [],
            mutualZidingyiBehaviorArr: [],
            selfHangyeBehaviorArr: [],
            selfZidingyiBehaviorArr: []
        },
        OPENID: '',
        ACCESSKEY: '',
        commid:''
    },
    onLaunch: function() {
        console.log('onlaunch')
        var _this = this
            // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
            //wx.setStorageSync('logs', logs)

        //获取access_key
        // wx.request({
        //   url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx416b34cf4f1994cf&secret=2001552fd687f182c191cabb4e32f2cb", //接口地址
        //   method: "GET",
        //   header: {
        //     'content-type': 'application/json' // 默认值
        //   },
        //   success: function (res) {
        //     console.log('此处access_key赋值');
        //     _this.apiData.ACCESSKEY = res.data.access_token;
        //   },
        //   fail: function (err) {
        //     console.log(err);
        //   },
        // })
    },
    globalData: {
        userInfo: null,
        isIpx: false,
    },
    config: {
        title_height: "64",
        statusbarHeight: "24",
        titleIcon_height: "32",
        titleIcon_width: "87",
        title_top: "24",
        title_text: "xxx", // iphone X + 24        
        prefix: 24,
        x_statusbarHeight: '48',
        x_title_height: '88'
    }
})