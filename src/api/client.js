import io from 'socket.io-client'
const CHAT={
	// user:{
	// 	nick:null,
	// 	header:null,
	// 	openid:null,
	// 	mch_id:1,
	// 	status:0 // 0:未加入 1:加入 2:出结果
	// },
	mch_id:null,
	mch_name:null,
	usertype:null,

	msgObj:document.getElementsByClassName("body-wrapper")[0],
	username:null,
	userid:null,
	color:null,
	socket:null,
	onlineCount:0,
	onlineUsers:null,
	msgArr:[],
	playerArr:[],
	// 0等待、1进行中、2结束出结果
	status:0,
	lotteryArr:[],
	luckArr:[],
	lucker:[{nick:'whx'}],
	mchArr:[],
	lottery_id:null,
	listArr:[],
	isStart:false,
	//让浏览器滚动条保持在最低部
	// scrollToBottom:function(){
		// window.scrollTo(0, 900000);
	// },
	//退出，本例只是一个简单的刷新
	logout:function(){
		this.socket.disconnect();
		// location.reload();
	},
	//提交聊天消息内容
	submit:function(msg){
		if(msg != ''){
			let obj = {
				userid: this.userid,
				username: this.username,
				msg: msg,
				color: this.color
			};
			this.socket.emit('message', obj);
		}else{
			console.log('msg is null')
		}
		
		return false;
	},
	genUid:function(){
		return new Date().getTime()+""+Math.floor(Math.random()*899+100);
	},
	//更新系统消息，本例中在用户加入、退出的时候调用
	updateSysMsg:function(o, action){
		//当前在线用户列表
		this.onlineUsers=o.onlineUsers;
		//当前在线人数
		this.onlineCount = o.onlineCount;
		//新加入用户的信息
		var user = o.user;

		//更新在线人数
		var userhtml = '';
		var separator = '';
		// for(key in onlineUsers) {
	 //        if(onlineUsers.hasOwnProperty(key)){
		// 		userhtml += separator+onlineUsers[key];
		// 		separator = '、';
		// 	}
	 //  }
		// d.getElementById("onlinecount").innerHTML = '当前共有 '+onlineCount+' 人在线，在线列表：'+userhtml;
		
		// //添加系统消息
		// var html = '';
		// html += '<div class="msg-system">';
		// html += user.username;
		// html += (action == 'login') ? ' 加入了聊天室' : ' 退出了聊天室';
		// html += '</div>';
		// var section = d.createElement('section');
		// section.className = 'system J-mjrlinkWrap J-cutMsg';
		// section.innerHTML = html;
		// this.msgObj.appendChild(section);
		// this.scrollToBottom();
	},
	// changeInfo(){
	// 	this.userid = localStorage.getItem('userid');
	// 	this.username = localStorage.getItem('name');
	// 	this.color = localStorage.getItem('color');
	// 	this.weichat = localStorage.getItem('weichat');
	// 	this.socket.emit('changeInfo', {userid:this.userid, username:this.username,color:this.color,weichat:this.weichat});
	// },
	start(setting){
		// 通知server本商户为开启状态[2-font]
		console.log("[start]2-1:["+setting.mch_id+"]商户开启了,规则为[金额:'"+ setting.price +"'|中奖人数:"+ setting.luck_num +"|奖品:"+ setting.prize +"]")
		var _ = this
		// setTimeout(function(){
			_.socket.emit('start',setting)
		// },1000)
		
		// this.status = 1;
	},
	join(user){
		this.socket.emit('join',user,this.lottery_id)
	},
	init:function(usertype){
		/*
		客户端根据时间和随机数生成uid,这样使得聊天室用户名称可以重复。
		实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
		*/
		// this.userid = this.genUid();
		this.mch_id = localStorage.getItem("mch_id")
		this.mch_name = localStorage.getItem("mch_name")
		this.nick = localStorage.getItem("nick")

		/*
		usertype用户类型1、商户管理员 2、抽奖用户
		*/
		this.usertype = usertype


		// this.userid = localStorage.getItem('userid');
		// this.username = localStorage.getItem('name');
		// this.color = localStorage.getItem('color');
		// this.weichat = localStorage.getItem('weichat');

		// if (!this.userid) {
		// 	return
		// }

		// this.username = Math.floor(Math.random()*10);
		
		//连接websocket后端服务器
		// this.socket = io.connect('wss://node.redream.cn');
		// this.socket = io.connect('ws://115.159.189.179:8888');
		this.socket = io.connect('ws://127.0.0.1:4000');
		//告诉服务器端有用户登录
		console.log(this.mch_id)
		this.socket.emit('login',{
			nick:this.nick,
			mch_id:this.mch_id,
			mch_name:this.mch_name,
			usertype:this.usertype
		})

		// this.socket.emit('login', {mch_id:1,userid:this.userid, username:this.username,color:this.color,weichat:this.weichat});
		//心跳包，30s左右无数据浏览器会断开连接Heartbeat

		setInterval(() => {
			this.socket.emit('heartbeat', 1);
		},1000)
		//监听新用户登录
		// this.socket.on('login', function(obj){
			// console.log(obj);
			// CHAT.updateSysMsg(obj, 'logout');
			// CHAT.msgArr.push(obj)
		// });
		
		// this.socket.on('changeInfo', function(o){
			// CHAT.onlineUsers[o.userid]=o
			// console.log(o)
		// });
		//监听用户退出
		// this.socket.on('logout', function(o){
			// CHAT.updateSysMsg(o, 'logout');
		// });
		
		//监听消息发送
		// this.socket.on('message', function(obj){
			// var isme = (obj.userid == CHAT.userid) ? true : false;
			// CHAT.msgArr.push(obj)	
		// });

		this.socket.on('game_open',function(setting,lottery_id){
			// if(CHAT.mch_id == _mch_id){
				console.log("4-1:通知接收完成")
				CHAT.status = 1
				CHAT.price = setting.price
				CHAT.luck_num = setting.luck_num
				CHAT.prize = setting.prize
				CHAT.lottery_id = lottery_id
				console.log("4-2:改变了状态变为可参与")
			// }
		})

		this.socket.on('one_join',function(setting,lottery_id){
				CHAT.status = 1
				CHAT.price = setting.price
				CHAT.luck_num = setting.luck_num
				CHAT.prize = setting.prize
				CHAT.lottery_id = lottery_id
		})

		this.socket.on('notify',function(user){
			console.log("6:接收到通知")
			CHAT.msgArr.push(user)
			CHAT.playerArr.push(user)
		})

		this.socket.on('end',function(retArr,val){
			CHAT.status = 3
			if(val === 2){ //普通用户
				retArr.forEach((ret,i)=>{
					CHAT.luckArr.push(ret)
					console.log("lucker is =" + ret.nick)
				})
			}else{ //管理员
				CHAT.listArr.push(retArr)
				CHAT.isStart = false
			}
			
		})

	}
}	
export default CHAT