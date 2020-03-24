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
import {swiper,swiperSlide} from 'vue-awesome-swiper'
require("swiper/dist/css/swiper.css");

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
  components:{
    swiper,
    swiperSlide
  },
  data() {  
    const that = this
    return {
      loadonce: false,
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