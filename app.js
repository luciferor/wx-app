//app.js
App({
    apiData: {
        GetLincesShow: false, //是否
        code: '', //登录需要的code
        api: 'https://devqypyp.xiaohuibang.com', //接口根地址
        session_key: '', //response.data.message.session_key
        userstatus: true,
        Company_Id: '', //response.data.message.company_id
        isAdmin: 0,
        nickName: '',
        invite_id: '',
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
        }
    },
    onLaunch: function() {
        console.log('onlaunch')
        var _this = this
            // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        //获取access_key
        
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