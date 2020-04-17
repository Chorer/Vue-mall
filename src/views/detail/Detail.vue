<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar" @titleClick="titleClick" ref="navbar"></detail-nav-bar>
    <scroll class="content" 
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            >
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <detail-recommend :recommend="recommend" ref="recommend"></detail-recommend>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShow"/>
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
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'

import { getDetail,getRecommend,Goods,Shop,GoodsParam } from 'network/detail'
import { itemImgListenerMixin } from 'common/mixin'
import { debounce } from 'common/utils'
import { backTopMixin } from 'common/mixin'
import { mapActions } from 'vuex'

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
    DetailBottomBar,
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
      recommend:[],
      jumpOffsetTop:[],
      getThemeTopY:null,
      currentIndex:0
    }
  },
  methods:{
    ...mapActions(['addCart']),
    imageLoad(){
      this.newRefresh()
      this.getThemeTopY()
    },
    titleClick(index){
      this.$refs.scroll.scrollToTop(0,-this.jumpOffsetTop[index],100)
    },
    contentScroll(position){
      // 1. 动态控制按钮显示
      this.showBack(position)
      // 2. 联动选项卡
      const positionY = -position.y
      for(let i = 0;i<this.jumpOffsetTop.length-1;i++){
        if(this.currentIndex != i && (positionY >= this.jumpOffsetTop[i] && positionY <= this.jumpOffsetTop[i+1]))
        {
          this.currentIndex = i
          this.$refs.navbar.currentIndex = this.currentIndex  
        }
      }
    },
    addToCart(){
      // 1. 收集商品信息到对象中
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.realPrice = this.goods.realPrice
      product.iid = this.iid
      // 2. 添加到购物车
      // this.$store.dispatch('addCart',product)
      this.addCart(product).then( res => {
        this.$toast.show(res,1500)
      })
    }
  },
  mixins:[itemImgListenerMixin,backTopMixin],
  created(){
    this.iid = this.$route.params.iid
    getDetail(this.iid).then( res => {
       // 获取数据
       let data = res.result
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
    // 防抖处理
    this.getThemeTopY = debounce(() => {
      this.jumpOffsetTop = []
      this.jumpOffsetTop.push(0)
      this.jumpOffsetTop.push(this.$refs.params.$el.offsetTop)
      this.jumpOffsetTop.push(this.$refs.comment.$el.offsetTop)
      this.jumpOffsetTop.push(this.$refs.recommend.$el.offsetTop)
      this.jumpOffsetTop.push(Number.MAX_VALUE)
    })
  },
  destroyed() {
    this.$bus.$off('itemImgLoad',this.itemImgListener)
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