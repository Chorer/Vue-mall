<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot='center'>购物街</div>
    </nav-bar>
    <tab-control 
      class="tab-control"
      :titles="['流行','新款','精选']" 
      @tabClick='tabClick'
      ref="tabcontrolMock"
      v-show="isMockShow"
    />
    <scroll class="content" ref="scroll" 
      :probe-type="3" 
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
      >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control 
        class="tab-control"
        :titles="['流行','新款','精选']" 
        @tabClick='tabClick'
        ref="tabcontrol"
        />
      <goods-list :goods = "showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"/>
  </div>
</template>

<script>
// import HomeSwiper from './childComps/HomeSwiper'
import HomeSwiper from './childComps/HomeSwiper-plugin'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata,getHomeGoods } from 'network/home'
import {debounce} from 'common/utils'

export default {
  name:'Home',
  components:{
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop': {page:0,list:[]},
        'new': {page:0,list:[]},
        'sell': {page:0,list:[]}
      },
      currentType:'pop',
      isShow: false,
      tabOffsetTop:0,
      isMockShow: false
    }
  },
  created(){
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    // 监听图片加载事件，动态刷新 BScroll 以更新可滚动高度，防止可滚动高度在一开始
    // 过小而无法滚动完全部图片
  },
  mounted(){
    // 对刷新函数进行防抖处理，防止频繁刷新
    let refresh = debounce(this.$refs.scroll.refresh,500)
    this.$bus.$on('itemImageLoad',() => {
      refresh()
    })
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  methods:{
    /*
    事件监听
    */
   tabClick(index){
     switch(index){
       case 0:
        this.currentType = 'pop'
        break
       case 1:
        this.currentType = 'new'
        break
       case 2:
        this.currentType = 'sell'  
        break
     }
     // 同步组件状态
     this.$refs.tabcontrol.currentIndex = index
     this.$refs.tabcontrolMock.currentIndex = index
   },
   backClick(){
     this.$refs.scroll.scrollToTop(0,0,500)
   },
   contentScroll(position){
     // 1.动态控制按钮显示
     this.isShow = -position.y > 1000
     // 2.动态控制 mock 导航条显示
     this.isMockShow = -position.y > this.tabOffsetTop
   },
   loadMore(){
     this.getHomeGoods(this.currentType)
     this.$refs.scroll.finishPullUp()
   },
   swiperImageLoad(){
     // 轮播图已有一张图片加载完毕，可以获取正确的 offsetTop
     this.tabOffsetTop = this.$refs.tabcontrol.$el.offsetTop
   },
    /*
    网络请求
    */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = ++ this.goods[type].page
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
      }) 
    }
  }
}
</script>

<style scoped>
  #home{
    padding-top: 44px;
    position: relative;
    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color:#fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .content{
    /* 
    按照 BScroll 的要求，必须给 wrapper 一个小于 content 的高度，两种方法：
    1.直接设置 warpper 高度为首屏减去上下两个 tabbar
    2.设置 home 为首屏高度，好让 wrapper 相对于它绝对定位，通过上下值强行压缩
     wrapper 的高度，本来它是等于 content 的高度，但现在比 content 高度小
    */
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>