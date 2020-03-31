<template>
  <goods-list :goods="recommend"></goods-list>
</template>

<script>
import GoodsList from 'components/content/goods/GoodsList'

export default {
  name:'DetailRecommend',
  props:{
    recommend:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    GoodsList
  }
}
</script>

<style>

</style>