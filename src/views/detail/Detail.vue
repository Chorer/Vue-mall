<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <detail-recommend :recommend="recommend"></detail-recommend>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper-plugin'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailRecommend from './childComps/DetailRecommend'

import Scroll from 'components/common/scroll/Scroll'

import { getDetail,getRecommend,Goods,Shop,GoodsParam } from 'network/detail'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommend,
    Scroll
  },
  data(){
    return {
      iid: null,
      topImages:[],
      goods: {},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommend:[]
    }
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
    }
  },
  created(){
    this.iid = this.$route.params.iid
    getDetail(this.iid).then( res => {
       // 获取数据
       let data = res.result
       console.log(data)
       // 获取轮播图数据
       this.topImages = data.itemInfo.topImages;
       // 获取商品信息
       this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
       // 获取商家信息
       this.shop = new Shop(data.shopInfo)
       // 获取商品详细信息
       this.detailInfo = data.detailInfo
       // 获取参数信息
       this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
       // 获取评论信息
       if(data.rate.cRate !== 0) {
         this.commentInfo = data.rate.list[0]
       }
       // 获取推荐信息
       getRecommend().then(res => {
         this.recommend = res.data.list
       })
    })
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
  }
</style>