import user from './user.js'
import status from './status.js'
import dateformat from 'dateformat'

const actor = {
    hasLucker:null,
    stat:null,
    setting:null,
    luckerArr:[],
    userArr:[],
    lottery_id:null,
    create_time:null,
    second:null,
    downtime:'2017-10-03 16:00:00',
    init:function(_user){
        user.init(_user)
        // this.status = LOGIN

        user.socket.on('open',function(_setting,_lottery_id,_create_time){
            console.log('接收到通知－开启')
            console.log(_setting)
            actor.setting = _setting
            actor.stat = status.__ing
            actor.lottery_id = _lottery_id
            actor.create_time = _create_time
        })

        // 监听用户加入
        user.socket.on('join',function(_user){
            console.log("新加入了玩家")
            console.log(_user)
            actor.userArr.push(_user)
        })

        // 监听是否开奖中
        user.socket.on('ending',function(_stat){
            if(_stat == 0){
                // 未加入－但是房间在抽奖中
                actor.stat = status.__end_wait
            }
            // if(_stat == 1){
            //     actor.stat = status.__ending
            // }
        })

        // 获得开奖消息
        user.socket.on('end',function(_luckerArr){
            actor.luckerArr = _luckerArr
            // ACTOR.status = END
        })

        // 获得剩余秒
        user.socket.on('getSecond',function(_limit){
            actor.second = _limit
            console.log("1"+actor.second)
            // var jian = 30000 - _limit
            // console.log(jian)
            actor.downtime = dateformat(new Date(new Date().getTime() + 30000 - _limit),"yyyy-mm-dd HH:MM:ss")
            // console.log(dateformat(new Date(new Date().getTime()+30000),"yyyy-mm-dd HH:MM:ss"))
            // var newTime = new Date().getTime() + 30000 - _limit
            // var a = new Date(new Date().getTime() + 30000 - _limit)
            // if(jian < 30000){
            // actor.downtime = 
            // console.log('dsadas')
            
            // console.log(actor._limit)
            
        })

    },
    join:function(){
        user.socket.emit('join',user.userinfo,actor.lottery_id)
        console.log(user.userinfo)
        console.log(actor.lottery_id)
        console.log(this.lottery_id)
    },
    getSecond:function(){
        user.socket.emit('getSecond',user.userinfo.mch_id)
    }
}

export default actor