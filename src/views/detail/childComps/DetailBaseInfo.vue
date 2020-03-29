<template>
  <div v-if="Object.keys(goods).length !==0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name:'DetaiBaseInfo',
  props:{
    goods:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .base-info{
    margin-top: 15px;
    padding: 0 12px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-title{
    color:#222;
    font-size: 18px;
  }
  .info-price{
    margin-top: 10px;
  }
  .info-price .n-price{
    font-size: 24px;
    color:var(--color-high-text);
  }
  .info-price .o-price{
    font-size: 15px;
    margin-left: 5px;
    text-decoration: line-through;
    vertical-align: super;
  }
  .info-price .discount{
    font-size: 12px;
    padding: 3px 8px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 15px;
    vertical-align: super;
  }
  .info-other{
    margin-top: 15px;
    line-height: 30px;
    display: flex;
    font-size: 14px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-around;
  }
  .info-service{
    display: flex;
    justify-content: space-around;
    line-height: 60px;
  }
  .info-service-item img{
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
    right: 8px;
  }
  .info-service-item span{
    font-size: 13px;
    color: #333;
  }

</style>