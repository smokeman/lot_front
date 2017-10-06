<template>
  <div style="height: 1000px">
    <x-input title="输入昵称" type="text" placeholder="" ref="u" :value="nick"></x-input>
    <x-button type="primary" @click.native="save" plain style="border-radius:99px;width: 94%">保存</x-button>
  </div>
</template>



<script>
import { Clocker,XInput,XDialog, XButton, Group, XSwitch, TransferDomDirective as TransferDom } from 'vux'
import CHAT from '../api/client.js'
export default {
  directives: {
    TransferDom
  },
  components: {
    Clocker,
    XInput,
    XDialog,
    XButton,
    Group,
    XSwitch
  },
  methods: {
    doShowToast () {
      this.$vux.toast.show({
        text: 'toast'
      })
    },
    save(){
      console.log('12')
      // localStorage.setItem('u',this.$refs.u.currentValue)
      if (localStorage) {
                localStorage.setItem('name',this.$refs.u.currentValue)
                localStorage.setItem('color','#d43937')
                localStorage.setItem('weichat','weichat')
                localStorage.setItem('userid','320705')
            }
            
            CHAT.init()
    }
  },
  data () {
    return {
      CHAT,
      nick:'',
      u:'',
      show: false,
      show2: false,
      showToast: false,
      showHideOnBlur: false,
      showScrollBox: false,
      showDialogStyle: false
    }
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/close';

.dialog-demo {
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: 350px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>
