<template>
  <div class="vux-form-preview weui-form-preview">
    <div class="weui-form-preview__hd">
      <!--<input v-if="hasCheck" type="checkbox" style="float:left">-->
      <checker v-if="hasCheck"
      v-model="v"
      default-item-class="demo5-item"
      selected-item-class="demo5-item-selected"
      >
      <checker-item style="float:left" @on-item-click="onItemClick(checkItem.onItemClick,v,name)" v-for="i in [1]" :key="i" :value="i">选择</checker-item>
      </checker>
      <label class="weui-form-preview__label" v-html="headerLabel"></label>
      <em class="weui-form-preview__value" v-html="headerValue || '&nbsp;'"></em>
    </div>
    <div class="weui-form-preview__bd">
      <div class="weui-form-preview__item" v-for="item in bodyItems">
        <label class="weui-form-preview__label">{{item.label}}</label>
        <span class="weui-form-preview__value">{{item.value}}</span>
      </div>
    </div>
    <div class="weui-form-preview__ft">
      <a class="weui-form-preview__btn" :class="{'weui-form-preview__btn_default': button.style==='default', 'weui-form-preview__btn_primary': button.style === 'primary'}" href="javascript:" v-for="button in footerButtons" @click="onButtonClick(button.onButtonClick, button.link)">{{button.text}}</a>
    </div>
  </div>
</template>

<script>
import { go } from '../../libs/router'
import {Checker,CheckerItem,TransferDom} from 'vux'

export default {
  directives: {
    TransferDom
  },
  components:{
    Checker,
    CheckerItem
  },
  name: 'form-preview',
  props: ['headerLabel', 'headerValue', 'bodyItems', 'footerButtons', 'name','hasCheck',"checkItem"],
  data(){
    return {
      v:0
    }
  },
  methods: {
    onButtonClick (cb, link) {
      cb && cb(this.name)
      if (link) {
        go(link, this.$router)
      }
    },
    // onItemClick (value, disabled) {
    //   console.log(value, disabled)
    //   this.v = this.v == 0 ? 1 : 0
      
      // console.log(this.v)
      // if (!this.disabled) {
      //   this.showPopup = false
      // }
    // }
    onItemClick(cb,v,name){
      v = v == 0 ? 1 : 0
      cb && cb(v,name)
      // console.log(this.v)
      
      // console.log(name)
    }
  }
}
</script>

<style lang="less">
@import '../../styles/weui/widget/weui_cell/weui_form/weui-form-preview.less';
.vux-form-preview {
  overflow: hidden;
}

.demo5-item {
  width: 40px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 6px;
}
.demo5-item-selected {
  background: #ffffff url(../../../assets/image/active.png) no-repeat right bottom;
  border-color: #ff4a00;
}

</style>
