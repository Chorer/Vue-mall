<template>
  <div class="cart-bottom-bar">
    <div class="full-check">
      <check-button class="check-button" :is-checked="isCheckedAll" @click.native="fullCheckedClick"></check-button>
      <span>全选</span>
    </div>
    <div class="full-price">合计：￥{{fullPrice}}</div>
    <div class="full-count" @click="calClick">去结算({{fullCount}})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'

export default {
  name:"cartBottomBar",
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    fullPrice(){
      return this.cartList.filter(item => item.checked).reduce(
        (preValue,item) => {
          return preValue + item.realPrice * item.count
        },0).toFixed(2)
    },
    fullCount(){
      return this.cartList.filter(item => item.checked).length
    },
    isCheckedAll(){
      return !this.cartList.length? false : !(this.cartList.find(item => !item.checked))
      // if(this.cartList.length === 0) return false
      // return !this.cartList.find(item => !item.checked)
    }
  },
  methods:{
    fullCheckedClick(){
      if(this.isCheckedAll){
        this.cartList.forEach(item => item.checked = false);
      } else {
        this.cartList.forEach(item => item.checked = true);  
      }
    },
    calClick(){
      if(!this.isCheckedAll){
        this.$toast.show('请先选择要购买的商品',1500)
      }
    }
  }
}
</script>

<style scoped>
  .cart-bottom-bar {
    width: 100%;
    height: 49px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    display: flex;
    align-items: center;
    line-height: 49px;
  }
  .full-check {
    width: 120px;
    display: flex;
    align-items: center;
  }
  .full-check .check-button {
    margin: 12px 4px 12px 12px;
    width: 20px;
    height: 20px;
    line-height: 20px;
  }
  .full-price {
    flex: 1;
  }
  .full-count {
    width: 120px;
    text-align: center;
    background-color: #ff4500;
    color: #fff;
  }
</style>