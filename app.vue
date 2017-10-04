<template>
    <div>
        <div>hello1{{ name }}</div>
        <v-title title="组件"></v-title>
        <div>dsdsada</div>
        <v-button @click.native="handleClick">点击按钮</v-button>
        <div class="test">sddddd</div>
        <p>
            <img src="./dist/1.png" alt="">
        </p>

    </div>
</template>
<script>

    // 局部组件，需要注册,use components
    import vTitle from './title.vue'
    import vButton from './button.vue'

    export default {
        components: {
            vTitle,
            vButton
        },
        data() {
            return {
                name: 'vue'
            }
        }
    }
</script>
<style lang="less" scoped>
    @bg-color:#000000;
    div{
        color:@bg-color;
    }
    .test {
        width: 100px;
        height: 100px;
        background: #f00;
        .test-item {
            width: 50px;
            height: 50px;
            background: #ff0;
        }
    } 
</style>