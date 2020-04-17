<template>
  <swiper class="detail-swiper" :options="swiperOption"  ref="mySwiper"  v-if="topImages.length!=0">  
      <!-- 这是轮播的图片 -->  
      <swiper-slide v-for="(item,index) in topImages" :key="index">  
          <img :src="item" alt=""> 
      </swiper-slide>  
      <!-- 这是轮播的小圆点 -->  
      <div class="swiper-pagination" v-for="(item,index) in  topImages" :key="index" slot="pagination">
      </div>  
  </swiper>  
</template>

<script>
import "swiper/dist/css/swiper.css"

import { swiperMixin } from 'common/mixin'

export default {
  name:'DetailSwiper-plugin',
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }  
    }
  },
  mixins:[swiperMixin]
}  
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
  }
  .swiper-slide img{
    width: 100%;
  }
  .swiper-pagination /deep/ .swiper-pagination-bullet{
    background-color: #fff;
  }
  .swiper-pagination /deep/ .swiper-pagination-bullet-active{
    background-color: var(--color-tint);
  }
</style>