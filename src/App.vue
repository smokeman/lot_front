<template>
  
  <div id="app">
    <ViewBox>
      <x-header :title="$route.meta.title" slot="header" class="header">
        <span slot="overwrite-left"></span>
        <span slot="right"></span>
      </x-header>
      <x-header :title="$route.meta.title" :left-options="options" class="header"></x-header>
      <div class="content">
        <router-view></router-view>
      </div>
      <Tabbar slot="bottom">
        <TabbarItem selected link="/lottery">
          <span slot="icon">
            <img src="./assets/icon_nav_article.png"></img>
          </span>
          <span slot="label">抽奖{{ user.mch_id != 0 ? '当前门店:' + user.mch_name : ''}}</span>
        </TabbarItem>
        <!--<TabbarItem link="/news">
          <span slot="icon">
            <img src="./assets/icon_nav_button.png"></img>
          </span>
          <span slot="label">发现</span>
        </TabbarItem>-->
        <TabbarItem link="/wine_mch">
          <span slot="icon">
            <img src="./assets/wine.png"></img>
          </span>
          <span slot="label">存酒商家</span>
        </TabbarItem>
        <TabbarItem link="/wine_player">
          <span slot="icon">
            <img src="./assets/wine.png"></img>
          </span>
          <span slot="label">存酒玩家</span>
        </TabbarItem>
        <TabbarItem link="/setting">
          <span slot="icon" link="/news/game">
            <img src="./assets/icon_nav_cell.png"></img>
          </span>
          <span slot="label">设置</span>
        </TabbarItem>
        <TabbarItem link="/coupon">
          <span slot="icon">
            <img src="./assets/icon_nav_cell.png"></img>
          </span>
          <span slot="label">优惠券设置</span>
        </TabbarItem>
        <TabbarItem link="/coupon_pay">
          <span slot="icon">
            <img src="./assets/icon_nav_cell.png"></img>
          </span>
          <span slot="label">优惠券处理</span>
        </TabbarItem>
        <TabbarItem link="/my">
          <span slot="icon">
            <img src="./assets/icon_nav_msg.png"></img>
          </span>
          <span slot="label">我的</span>
        </TabbarItem>
        <TabbarItem link="/adminmy">
          <span slot="icon">
            <img src="./assets/icon_nav_msg.png"></img>
          </span>
          <span slot="label">员工我的</span>
        </TabbarItem>
        <TabbarItem link="/role">
          <span slot="icon">
            <img src="./assets/icon_nav_msg.png"></img>
          </span>
          <span slot="label">员工授权</span>
        </TabbarItem>
      </Tabbar>
    </ViewBox>
  </div>
</template>

<script>
  import { XHeader, Tabbar, TabbarItem, ViewBox } from 'vux'
  //   import router from './common/js/router.js';
  import router from './router/router.config.js'
  import { mapState, mapActions } from 'vuex'
  import user from './api/user.js'

  export default {
    data() {
      return {
        d:1,
        options:{showBack: false},
        user
      };
    },
    router,
    components: {
      XHeader,
      Tabbar,
      TabbarItem,
      ViewBox
    },
    // activated(){
    //   document.querySelector('#app').scrollTop = this.demoTop
    // },
    watch:{
      '$route.path':function(val,oldVal){
        if(val.slice(1).indexOf('/') === -1){
          // 说明是主页面
          this.options.showBack = false
        }else{
          // 说明是子页面
          this.options.showBack = true
          setTimeout(() => {
            this.box = document.querySelector('#demo_list_box')
            
            if (this.box) {
              // this.box.addEventListener("click",()=>{
              //   console.log(this.box.scrollTop)
              // },false)
              this.box.removeEventListener('scroll', this.handler, false)
              this.box.addEventListener('scroll', this.handler, false)
            }
            console.log(this.box)
          }, 1000)
        }
      },
      // 'user.mch_id':function(val,oldVal{})
    },
    beforeDestroy () {
      this.box && this.box.removeEventListener('scroll', this.handler, false)
    },
    mounted(){

      var openid = '',
          username = '',
          nick = '',
          head = '',
          role = '',
          mch_id = 0,
          mch_name = ''

      if(!document.querySelector("#name")){
        openid = "opxwxw9i2-AtcYCNqY6YNmu5ugkg"
        username = 'test'
        nick = "测试员工"
        head = "http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ericye6VnJHHcOyUEWPFhxUINAdBW34V60AF1klnRGoicTiaNpibeupB2HTGhOnOkwVG9zj4k2vNOIsTg/0"
        mch_id = 1
        mch_name = "1912"
        role = '1'
        console.log('null')
      }else{
        var userInfo = JSON.parse(document.querySelector("#name").innerHTML)
        openid = userInfo.openid
        username = userInfo.username
        nick = userInfo.nickname
        head = userInfo.headimgurl
        mch_id = userInfo.mch_id
        mch_name = userInfo.mch_name
        role = userInfo.role
        console.log('have')
      }

      // localStorage.setItem("openid", openid)
      // localStorage.setItem("nick", nick)
      // localStorage.setItem("head", head)
      // localStorage.setItem("mch_id", mch_id)
      // localStorage.setItem("mch_name", mch_name)
      // localStorage.setItem("role",role)

      var DOMAIN_DOMAIN = "http://chat.ha.aoxing.aoxingtec.cn/wx_scan";
      // function initJsapi() {
      var url = encodeURIComponent(location.href.split('#')[0]);
      $.getJSON(DOMAIN_DOMAIN , {'url': url}, function (r) {
          wx.config({
              debug: false,
              appId: r.appId,
              timestamp: r.timestamp,
              nonceStr: r.nonceStr,
              signature: r.signature,
              jsApiList: [
                  'checkJsApi',
                  'scanQRCode',
                  // 'onMenuShareAppMessage'
                  // 所有要调用的 API 都要加到这个列表中
              ]
          });
          // initWxShareOption();
      });

      user.init({
        openid,nick,mch_id,mch_name,head,role
      })

    },
    computed: mapState({
      demoTop: state => state.vux.demoScrollTop,
      // direction: state => state.vux.direction
    })
    
      // ...mapState({
      //   route: state => state.route,
      //   path: state => state.route.path,
      //   deviceready: state => state.app.deviceready,
      //   demoTop: state => state.vux.demoScrollTop,
      //   isLoading: state => state.vux.isLoading,
      //   direction: state => state.vux.direction
      // })
    
    // methods:{
    //   ...mapActions([
    //     'updateDemoPosition'
    //   ])
    // }
  };
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

html,body {
  width: 100%;
  height: 100%;
  overflow-x: hidden
}

#app {
  height: 100%;

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
  }

  .content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 46px;
    overflow: hidden;
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 999;
  }

  /* .slide-enter-active, .slide-leave-active {
    transition: transform 0.3s;
  }
  .slide-enter {
    transform: translate3d(100%, 0, 0);
  }
  .slide-leave-to {
    transform: translate3d(-100%, 0, 0);
  } */
}

</style>
