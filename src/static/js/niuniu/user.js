import Vue from "vue";
import $ from "jquery";
var l=function (str) {
    console.log(str)
}
var app=new Vue({
    el:"#app",
    data:{
        status:{
            0:"未准备的",
            100:"等待准备",//开始准备,
            101:"已准备",//准备结束
            200:"等待下注",//开始下注,
            201:"已下注",//下注结束
            300:"等待翻牌",//开始翻拍
            301:"已翻牌",//翻拍结束
            400:"等待摊牌",//开始摊牌
            401:"已摊牌"//摊牌结束
        },
        role:{
          1:"普通玩家",
          2:"庄家"
        },

        timerStatus:{
            readying:"开始准备",
            settingWager:"开始下注",
            openCard:"开始翻牌",
            showdown:"开始摊牌"
        },
        timer:{
            timerType:"",
            event:"",
            remaining:0
        },
        gameInfo:{
            game:{
                gameCount:12,
                gameCurrentCount:2,
                maxPlayerNum:9,
                roomid:"88888888"
            },
            otherGamers:[
                // {
                //     isOnline:true,
                //     id:'1',
                //     nickName:'x',
                //     avatarUrl:'https://zhizhi-web.oss-cn-shenzhen.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20180812033350.jpg',
                //     cards:[
                //         {'color':2,'json':'{size:12, color:2, isVisible:true}','size':12},
                //         {'color':2,'json':'{size:2, color:2, isVisible:true}','size':2},
                //         {'color':2,'json':'{size:1, color:2, isVisible:true}','size':1},
                //         {'color':3,'json':'{size:10, color:3, isVisible:true}','size':10},
                //         {'color':1,'json':'{size:9, color:1, isVisible:true}','size':9}
                //     ],
                //     status:'301',
                //     allMultiple:'1',
                //     gameResult:{
                //         'cardList':[
                //             {'color':2,'json':'{size:12, color:2, isVisible:true}','size':12},
                //             {'color':2,'json':'{size:2, color:2, isVisible:true}','size':2},
                //             {'color':2,'json':'{size:1, color:2, isVisible:true}','size':1},
                //             {'color':3,'json':'{size:10, color:3, isVisible:true}','size':10},
                //             {'color':1,'json':'{size:9, color:1, isVisible:true}','size':9}
                //         ],
                //         'currentCardTypeMult':1,
                //         'haveOX':true,
                //         'remainder':2
                //     },
                //     balance:-2
                // },
            ],
            my:{
                // isOnline:true,
                // id:'1',
                // nickName:'x',
                // avatarUrl:'https://zhizhi-web.oss-cn-shenzhen.aliyuncs.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20180812033350.jpg',
                // cards:[
                //     {'color':2,'json':'{size:12, color:2, isVisible:true}','size':12},
                //     {'color':2,'json':'{size:2, color:2, isVisible:true}','size':2},
                //     {'color':2,'json':'{size:1, color:2, isVisible:true}','size':1},
                //     {'color':3,'json':'{size:10, color:3, isVisible:true}','size':10},
                //     {'color':1,'json':'{size:9, color:1, isVisible:true}','size':9}
                // ],
                // status:'301',
                // allMultiple:'1',
                // gameResult:{
                //     'cardList':[
                //         {'color':2,'json':'{size:12, color:2, isVisible:true}','size':12},
                //         {'color':2,'json':'{size:2, color:2, isVisible:true}','size':2},
                //         {'color':2,'json':'{size:1, color:2, isVisible:true}','size':1},
                //         {'color':3,'json':'{size:10, color:3, isVisible:true}','size':10},
                //         {'color':1,'json':'{size:9, color:1, isVisible:true}','size':9}
                //     ],
                //     'currentCardTypeMult':3,
                //     'haveOX':true,
                //     'remainder':10
                // },
                // balance:-2
            },
            bills:null
        },
    },
    filters:{
        getCardPath:function (obj) {
            return "../../static/images/poker/poker_"+obj.size+"_"+obj.color+".png"
        },
        getResultPath:function (size) {
            return "../../static/images/card_type/card_type_"+size+".png";
        },
        userStatus:function (status) {
            return '../../static/images/status/status_'+status+'.png'
        },
        aa:function (player,mult) {

            if(player.gameResult!=null && player.gameResult.currentCardTypeMult==mult){
                return true;
            }else{
                return false
            }



        }
    },
    methods:{

        setWager:function (mult) {
            var status=parseInt(this.gameInfo.my.status);
            switch (status){
                case 200:setWager(mult);break;
                case 300:openCard(mult);break;
            }
        },
        readying:function () {
            readying();
        },
        showdown:function () {
            setShowdown();
        },
        timerRelayout:function () {
            var h=$(window).height();
            var w=$(window).width();
            var top=(h-70)/2;
            var left=(w-40)/2;
            $(".timer").css({"top":200,"left":left});
        }
    },
    computed:{

    },
    mounted:function () {
        //设置timer 位置
        var _this=this;
        $(function(){
            _this.timerRelayout();
            $(window).resize(_this.timerRelayout)
        });
        //设置

    },
    updated:function () {

    }
});

var msg=function (title,msg) {
    $(".msg-cntr .title").text(title);
    $(".msg-cntr .msg").html(msg);
    $(".msg-cntr ").show();
}

var getApiDomain=function () {
    var domain="";
    var url=location.href;
    if(url.indexOf("localhost")!=-1 || url.indexOf("192.168")!=-1){
        domain="192.168.99.217:8080"
    }else if(url.indexOf("xiejin.ink")){
        domain="api.xiejin.ink"
    }

    return domain;
}


/***客服端消息和事件处理***/
var getQueryString=function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


//获取用户请求信息
//userid 在本地测试有效 使用微信登录时候自动使用为openid
var userid=getQueryString("userid");
//房间id 必填
var roomid=getQueryString("roomid");
//code 用于获取微信信息 线上必填
var code=getQueryString("code");
console.log("code:"+code)




//进入房间

function joinRoom(roomid){
    websocket.send(formatMsg('join',roomid));
}
//准备
function readying(){
    websocket.send(formatMsg("readying","-"));
}

//设置准备时第一次下注倍数
function setWager(mult){
    websocket.send(formatMsg("setWager",mult));
}
//设置准备翻牌时地二次倍数
function openCard(mult){
    websocket.send(formatMsg("openCard",mult));
}

//设置准备翻牌时地三次倍数
function setShowdown(){
    websocket.send(formatMsg("setShowdown","-"));
}

//获取房间及用户信息
function getCurrentRoomInfo(){
    websocket.send(formatMsg("getCurrentRoomInfo","-"));
}

function formatMsg(action,content){
    return "{action:'"+action+"',content:'"+content+"'}";
}


var createSocket=function(code){

    //判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
        // websocket = new WebSocket("ws://zhizhi.ink/nn/login?nickName="+nick+"&id="+id);//+"&roomid="+roomid
        websocket = new WebSocket("ws://"+getApiDomain()+"/nn/login?code="+code+"&userid="+userid);
    }else{
        return;
    }
    //连接成功建立的回调方法
    websocket.onopen = function () {
        console.log("WebSocket连接成功");
        // 连接成功后进入房间
        joinRoom(roomid)
    }

    //接收到消息的回调方法
    websocket.onmessage = function (event) {
        var reArray;
        var timeStamp=0;
        var resp;
        console.log(event.data);
        //把所有的json串替换成对象格式
        resp=event.data.replace(/\\/g,"").replace(/\"{/g,"{").replace(/}\"/g,"}").replace(/\\"{/g,"{").replace(/}\\"/g,"}");
        reArray=resp.split("#9879874654564987984654#");

        resp=reArray[0];
        // timeStamp=parseInt(reArray[1])
        //
        // if(timeStamp<lastMsgTimeStamp){
        //     return;
        // }
        // lastMsgTimeStamp=timeStamp;

        //解析json
        resp=eval("("+resp+")");

        if(resp==null)return;
        if(resp.status==200||resp.status=='200'){
            var func= msgHandler[resp.data.msgType];
            if(resp.data.msgType=="showdown"){

            }
            if(typeof(func) == "function"){
                func(resp.data);
            }

        }else{
            msg("出错了",resp.data)
        }

    }

    websocket.onerror=function (e) {
        console.log("连接出错："+e)
    }
}

//创建sokect连接
var websocket = null;
var lastMsgTimeStamp=0;

//打开页面创建连接
createSocket(code);


var msgHandler={
    //获取房间信息
    "currentGameInfo":function(data){
        app.gameInfo=data.msg
    },
    // 其他人进入房间
    otherJoinedRoom:function(){
        //获取房间所有信息
        getCurrentRoomInfo();
    },
    //倒计时
    "timer":function(data){
        app.timer=data.msg;

    },
    //准备模块
    readier:function(data){
        getCurrentRoomInfo();
    },
    //下注模块
    setWager:function(data){
        getCurrentRoomInfo();
    },
    // 指定庄家
    gamerSetWager:function (data) {
        getCurrentRoomInfo();
    },
    //发牌模块
    cards:function(data){
        app.gameInfo.my.cards=data.cards;
    },
    //翻牌模块
    openCard:function(data){
        getCurrentRoomInfo();
    },
    //摊牌模块 到这里
    showdown:function(data){
        getCurrentRoomInfo();
    },
    mycards:function(data){
        getCurrentRoomInfo();
    },
    gamerOpened:function () {
        getCurrentRoomInfo();
    },
    //游戏结束模块
    endGameBills:function(data){
        getCurrentRoomInfo();
    },
    //进入房间成功
    joinedRoom:function(){
        //获取房间所有信息
        getCurrentRoomInfo();
    }


}


$(function () {
    //初始化消息框
    $(".msg-cntr .close").click(function () {
        $(".msg-cntr").hide()
    })

    $(".otherGamerGrap").on("click",".avatar-wrap",function(){
        var userblock=$(this).parents(".user-block");
        var nickname=$(userblock).find(".nickname").text();
        msg(nickname,'<p class="item">发送文字消息</p>\n' +
            '            <p class="item">发送语音</p>\n' +
            '            <p class="item">请他出去</p>')
    })
})