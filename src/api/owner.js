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
    wine:{},
    wine_id:null,
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

        // user.socket.on('wine_get',function(ret){
        //     owner.wineArr.push(ret)
        // })

    },

    start:function(_setting){
        this.setting = _setting
        // 告诉用户可以参加
        user.socket.emit('start',_setting)
    },

    // 第一步保存酒单数据－返回id号供玩家扫描
    // wine_add:function(_wine_info){
    //     user.socket.emit('wine_add',_wine_info)
    //     user.socket.on('wine_add',function(_wine_id){
    //         owner.wine_id = _wine_id
    //     })
    // },

    // 取酒查询:用户展示二维码，店家扫描后得到信息，存储到变量，让app看到
    // wine_get:function(_wine_id){
    //     user.socket.emit('wine_getbyid',_wine_id)
    //     user.socket.on('wine_getbyid',function(_wine){
    //         owner.wine = _wine
    //         owner.wine_id = _wine.wine_id
    //     })
    // },
    // 取酒取人:更新状态
    // wine_update:function(){
    //     user.socket.emit('wine_updatebyid',owner.wine_id)
    // },

    // 商家保存酒单,监听用户扫码
    // wine_listening:function(){
        
    // }

}

export default owner