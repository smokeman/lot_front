import io from 'socket.io-client'

const USER = {
    userid:null,
    username:null,
    nick:null,
    openid:null,
    socket:null,
    mch_id:null,
    mch_name:null,
    usertype:null,
    userinfo:{},
    init:function(_user){

        this.socket = io.connect('ws://127.0.0.1:4000')

        // this.nick = _user.nick
        // this.mch_id = _user.mch_id
        // this.mch_name = _user.mch_name
        // this.usertype = _user.usertype
        this.userinfo.nick = _user.nick
        this.userinfo.mch_id = _user.mch_id
        this.userinfo.mch_name = _user.mch_name
        this.userinfo.usertype = _user.usertype

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