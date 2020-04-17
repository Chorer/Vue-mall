<template>
  <swiper :options="swiperOption"  ref="mySwiper"  v-if="banners.length!=0">  
      <!-- 这是轮播的图片 -->  
      <swiper-slide v-for="(item,index) in banners" :key="index">  
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad"> 
        </a>  
      </swiper-slide>  
      <!-- 这是轮播的小圆点 -->  
      <div class="swiper-pagination" v-for="(item,index) in  banners" :key="index" slot="pagination">
      </div>  
  </swiper>  
</template>

<script>
import "swiper/dist/css/swiper.css"

import { swiperMixin } from 'common/mixin'

export default {
  name:'HomeSwiper-plugin',
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }  
    }
  },
  mixins:[swiperMixin],
  methods:{
    imageLoad(){
      if(!this.loadonce){
        this.$emit('swiperImageLoad')
        this.imageLoad = true
      }
    }
  }
}  
</script>

<style scoped>
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