<template>
  <swiper :options="swiperOption"  ref="mySwiper"  v-if="banners.length!=0">  
      <!-- 这是轮播的图片 -->  
      <swiper-slide v-for="(item,index) in banners" :key="index">  
        <a :href="item.link">
          <img :src="item.image" alt=""> 
        </a>  
      </swiper-slide>  
      <!-- 这是轮播的小圆点 -->  
      <div class="swiper-pagination" v-for="(item,index) in  banners" :key="index" slot="pagination">
      </div>  
  </swiper>  
</template>

<script>
import {swiper,swiperSlide} from 'vue-awesome-swiper'
require("swiper/dist/css/swiper.css");

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
  components:{
    swiper,
    swiperSlide
  },
  data() {  
    const that = this
    return {
      swiperOption: {
        notNextTick: true,
        loop: true,
        initialSlide: 0,
        autoplay: {
          delay: 1500,
          disableOnInteraction: true
        },
        speed: 800,
        on: {
          slideChangeTransitionStart: function() {
            that.imgIndex= this.realIndex - 1;
          },
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets"
        }
      }
    }
  },  
  //定义这个swiper对象  
  computed: {  
      swiper() {  
        return this.$refs.mySwiper.swiper;  
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