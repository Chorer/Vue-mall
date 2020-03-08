<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if='! isActive'><slot name='item-icon'></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name:'TabBarItem',
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  methods:{
    itemClick(){
      // this.$router 总路由对象
      this.$router.replace(this.path);
    }
  },
  computed:{
    isActive(){
      // this.$route 当前活跃路由对象
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor}:{}
    }
  }
}
</script>

<style>
.tab-bar .tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 12px;
}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  margin: 3px 0;
  vertical-align: middle;
}
</style>