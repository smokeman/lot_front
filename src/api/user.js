import io from 'socket.io-client'
import ip from './ip.js'
const USER = {
    userid:null,
    username:null,
    nick:null,
    openid:null,
    socket:null,
    mch_id:0,
    mch_name:'',
    usertype:null,
    userinfo:{},
    init:function(_user){

        // this.socket = io.connect('ws://127.0.0.1:4000')
        // this.socket = io.connect(ip,{path: '/socket.io'})
        this.socket = io.connect("ws://" + ip)

        this.userinfo.openid = _user.openid
        this.userinfo.nick = _user.nick
        this.userinfo.mch_id = _user.mch_id
        this.userinfo.mch_name = _user.mch_name
        this.userinfo.usertype = _user.usertype

    },
    start:function(){
        this.socket.emit('login',{
		    nick:this.userinfo.nick,
			mch_id:this.userinfo.mch_id,
			mch_name:this.userinfo.mch_name,
			usertype:this.userinfo.usertype
		})
    },
    disconnect:function(user){

    }

}

export default USER