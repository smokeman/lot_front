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
          <span slot="label">抽奖</span>
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
      </Tabbar>
    </ViewBox>
  </div>
</template>

<script>
  import { XHeader, Tabbar, TabbarItem, ViewBox } from 'vux'
  //   import router from './common/js/router.js';
  import router from './router/router.config.js'
  import { mapState, mapActions } from 'vuex'

  export default {
    data() {
      return {
        d:1,
        options:{showBack: false}
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
            console.log('1111111111111111111111')
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
      }
    },
    beforeDestroy () {
      this.box && this.box.removeEventListener('scroll', this.handler, false)
    },
    mounted(){
      // console.log(mapActions)
        // this.handler = () => {
          // if (this.path === '/demo') {
            // this.box = document.querySelector('#demo_list_box')
            // this.updateDemoPosition(this.box.scrollTop)
          // }
      // }
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
