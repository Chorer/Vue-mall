<template>
  <div class="profile">
    <nav-bar class="nav-bar"><div slot="center">我的商城</div></nav-bar>
    <user-info></user-info>
    <account :user-account="userAccount"></account>
    <list-view :list="userList" class="user-list"></list-view>
    <list-view :list="serviceList" class="service-list"></list-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import userInfo from './childComps/userInfo'
import listView from './childComps/listView'
import account from './childComps/account'

export default {
  name:'Profile',
  components:{
    NavBar,
    userInfo,
    account,
    listView
  },
  data(){
    return {
      userAccount:[
        {num:'0.00',unit:'元',info:'我的余额'},
        {num:0,unit:'个',info:'我的优惠'},
        {num:0,unit:'分',info:'我的积分'}
      ],
      userList:[
        {icon:'message',text:'我的消息',color:'#909090'},
        {icon:'bag',text:'积分商城',color:'#fc7b53'},
        {icon:'membership',text:'会员卡',color:'#ffc636'}
      ],
      serviceList:[
        {icon:'shop',text:'我的购物车',color:'#ff8198'},
        {icon:'app',text:'下载购物app',color:'#ff8198'}
      ]
    }
  }
}
</script>

<style scoped>
  .profile {
    background-color: #f2f2f2;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: bold;
  }
  .user-list,.service-list {
    margin-top: 12px;
  }
</style>