import io from 'socket.io-client'
// import ip from './ip.js'
const USER = {
    // userid:null,
    // username:null,

    openid:null,
    username:null,
    nick:null,
    mch_id:0,
    mch_name:'',
    role:null,

    socket:null,
    // userinfo:{},
    init:function(user){

        // this.socket = io.connect('ws://127.0.0.1:4000')
        // this.socket = io.connect(ip,{path: '/socket.io'})
        this.socket = io.connect("ws://" + '127.0.0.1:4000')

        this.openid = user.openid
        this.username = user.username
        this.nick = user.nick
        this.mch_id = user.mch_id
        this.mch_name = user.mch_name
        this.role = user.role

    },
    start:function(){
        this.socket.emit('login',{
		    nick:this.nick,
			mch_id:this.mch_id,
			mch_name:this.mch_name,
			role:this.role
		})
    },
    disconnect:function(user){

    }

}

export default USER