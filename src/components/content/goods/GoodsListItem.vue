<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'GoodsListItem',
  props:{
    goodsItem:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    showImage(){
      // return this.goodsItem.show.img || this.goodsItem.image
      // 注意顺序，undefined.img 会报错
      return this.goodsItem.image || this.goodsItem.show.img 
    }
  },
  methods:{
    imageLoad(){
      this.$bus.$emit('itemImageLoad')
    },
    itemClick(){
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
  .goods-item{
    width: 48%;
    position: relative;
    padding-bottom: 50px;
  }
  .goods-item img{
    width: 100%;
    border-radius:5px;
  }
  .goods-info{
    font-size: 13px;
    overflow: hidden;
    text-align: center;
    position: absolute;
    bottom: 10px;
    left: 0px;
    right: 0px;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price{
    color:var(--color-high-text);
    margin-right: 20px;
    font-size: 15px;
  }
  .goods-info .collect{
    position: relative;
  }
  .goods-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    width: 14px;
    height: 14px;
    top: 0px;
    background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
  }
</style>