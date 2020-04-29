<template>
  <div class="list">
    <div class="list-item" v-for="(item,index) in list" :key="index">
      <span class="list-icon">
        <svg-icon :icon-name="item.icon" :icon-color="item.color"></svg-icon>
      </span>
      <span class="list-text">{{item.text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'listView',
  props:{
    list:{
      type:Array,
      default:[]
    }
  }
}
</script>

<style scoped>
  .list {
    background-color: #fff;
    font-size: 15px;
  }
  .list-item {
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
  }
  .list-item .list-icon {
    margin: 0 12px;
    vertical-align: sub;
  }
</style>