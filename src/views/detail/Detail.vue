<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <ul>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper-plugin'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'

import { getDetail,Goods,Shop } from 'network/detail'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo
  },
  data(){
    return {
      iid: null,
      topImages:[],
      goods: {},
      shop:{}
    }
  },
  created(){
    this.iid = this.$route.params.iid
    getDetail(this.iid).then( res => {
       let data = res.result
       console.log(res)
       this.topImages = data.itemInfo.topImages;
       this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
       this.shop = new Shop(data.shopInfo)
    })
  }
}
</script>

<style>

</style>