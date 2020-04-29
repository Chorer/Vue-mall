<template>
  <div>
    <grid-view :cols="3" :lineSpace="15" :v-padding="20" v-if="subcategories.list">
      <div class="item" v-for="(item,index) in subcategories.list" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" class="item-img" @load="imgLoad">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from 'components/common/gridView/GridView'

export default {
  name:'TabContentCategory',
  components:{
    GridView
  },
  props:{
    subcategories:{
      type:Object,
      default:{}
    }
  },
  methods:{
    imgLoad(){
      this.$emit('imgLoaded')  
    }
  }
}
</script>

<style scoped>
  .item {
    text-align: center;
    font-size: 12px;
  }
  .item-img {
    width: 80%;
  }
  .item-text {
    margin-top: 15px;
  }
</style>