import user from './user.js'
import status from './status.js'

const owner = {
    hasLucker:false,
    stat:null,
    userArr:[],
    luckerArr:[],
    listArr:[],
    // roomid:null,
    setting:{},
    init:function(_user){
        console.log('login')
        user.init(_user)

        // 监听用户加入
        user.socket.on('join',function(_user){
            owner.userArr.push(_user)
        })

        // 监听开奖结果
        user.socket.on('end',function(_list,_luckerArr){
            owner.listArr.push(_list)
            owner.luckerArr = _luckerArr
            // 已知得到奖品信息
            owner.hasLucker = true
        })
    },
    start:function(_setting){
        this.setting = _setting
        // 告诉用户可以参加
        user.socket.emit('start',_setting)
    }

}

export default owner