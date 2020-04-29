<template>
  <div class="account">
    <div class="account-item" v-for="(item,index) in userAccount" :key="index">
      <div class="account-number">
        <span class="account-balance">{{item.num}}</span>{{item.unit}}
      </div>
      <div class="account-info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'account',
  props:{
    userAccount:{
      type:Array,
      default:[]
    }
  }
}
</script>

<style scoped>
  .account {
    display: flex;
    font-size: 13px;
  }
  .account-item {
    padding: 18px;
    flex: 1;
    text-align: center;
    margin-right: 1px;
    background-color: #fff;
  }
  .account-info {
    margin-top: 8px;
  }
  .account-balance {
    color: #ff5f3e;
    font-size: 24px;
    font-weight: bold;
  }
</style>