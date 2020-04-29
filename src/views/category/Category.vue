<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <scroll class="tab-content" ref="scroll">
        <tab-content-category :subcategories="showSubcategory" @imgLoaded="imgLoaded"></tab-content-category>
        <tab-control :titles="['综合','新品','销量']" @tabClick="tabClick"></tab-control>
        <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import TabMenu from './childComps/TabMenu'
import TabContentDetail from './childComps/TabContentDetail'
import Scroll from 'components/common/scroll/Scroll'
import TabContentCategory from './childComps/TabContentCategory'
import { itemImgListenerMixin } from 'common/mixin'

import { getCategory,getSubcategory,getCategoryDetail } from 'network/category'

export default {
  name:'Category',
  components:{
    NavBar,
    TabMenu,
    TabContentDetail,
    TabContentCategory,
    TabControl,
    Scroll
  },
  mixins:[itemImgListenerMixin],
  data(){
    return {
      categories:[],
      categoryData:{},
      currentIndex:-1,
      currentType:'pop'
    }
  },
  computed:{
    showSubcategory(){
      if(this.currentIndex == -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail(){
      if(this.currentIndex == -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  created(){
    this._getCategory()
  },
  methods:{
    // 请求左侧数据，同时初始化右侧（进入即调用）
    _getCategory(){
      getCategory().then(res => {
        // 1.获取分类数据
        this.categories = res.data.category.list
        // 2.初始化每个分类的子数据
        for(let i = 0;i<this.categories.length;i++){
          this.categoryData[i] = {
            subcategories:{},
            categoryDetail:{
              'pop':[],
              'new':[],
              'sell':[]
            }
          }
        }
        // 3. 默认请求第一个分类的数据
        this._getSubcategory(0)
      })
    },
    // 请求右侧全部数据
    _getSubcategory(index){
      this.currentIndex = index
      const mailKey = this.categories[index].maitKey
      // 1. 请求右侧顶部数据
      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data
        // 数组转化为对象，实际上执行一次就可以
        this.categoryData = {...this.categoryData}
        // 2. 请求右侧底部数据
        this._getCategoryDetail('pop')
        this._getCategoryDetail('sell')
        this._getCategoryDetail('new')
      })
    },
    // 请求右侧底部数据
    _getCategoryDetail(type){
      const miniWallkey = this.categories[this.currentIndex].miniWallkey
      getCategoryDetail(miniWallkey,type).then(res => {
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
    },
    // 选中事件
    selectItem(index){
      this._getSubcategory(index)
    },
    // 选项卡切换事件
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'  
          break
        case 2:
          this.currentType = 'sell'  
          break
      }
    },
    imgLoaded(){           // 不做判断依然会多次调用，但是内部的refresh函数已经做了防抖处理，不会多次调用
      this.newRefresh()   // 调用scroll函数（已经做了防抖处理）
    }
  }
}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color:#fff;
    z-index: 10;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    display: flex;
  }
  .tab-content {
    flex:1;
    height: 100%;
  }
</style>