import {debounce} from './utils';
import BackTop from 'components/content/backTop/BackTop'
import {swiper,swiperSlide} from 'vue-awesome-swiper'

// 图片加载
export const itemImgListenerMixin = {
  data(){
    return {
      itemImgListener:null,
      newRefresh:null
    }
  },
  mounted(){
    this.newRefresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  }
}

// 返回顶部
export const backTopMixin = {
  data(){
    return {
      isShow: false
    }
  },
  components:{
    BackTop
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollToTop(0,0,500)
    },
    showBack(position){
      this.isShow = -position.y > 1000
    }
  }
}

// 轮播图
export const swiperMixin = {
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