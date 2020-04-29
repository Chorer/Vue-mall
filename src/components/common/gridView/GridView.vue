<template>
  <div class="grid-view" ref="gridView">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'GridView',
  props:{
    cols:{
      type:Number,
      default:2
    },
    hPadding:{
      type:Number,
      default:8
    },
    vPadding:{
      type:Number,
      default:8
    },
    itemSpace:{
      type:Number,
      default:8
    },
    lineSpace:{
      type:Number,
      default:8
    }
  },
  mounted(){
    // 一旦dom挂载好，马上调用布局函数，根据用户的定义进行自动布局
    setTimeout(this.autoLayout,20)
  },
  updated(){
    // 每次用户改变布局定义的时候，props会改变，钩子函数负责监听这个改变并重新调用一次布局函数
    this.autoLayout()
  },
  methods:{
    autoLayout(){
      let gridEl = this.$refs.gridView  // 获取父外盒子
      let children = gridEl.children    // 获取多个子项目
      // 设置父外盒子的左右padding
      gridEl.style.padding = `${this.vPadding}px ${this.hPadding}px`
      
      // 计算可以使得子项目等分的宽度：（总宽度-两个padding-2个子项目水平间距）/ 一行的子项目个数
      let itemWidth = (gridEl.clientWidth - this.hPadding * 2 - (this.cols - 1) * this.itemSpace) / this.cols
     
     // 设置每个子项目的样式
      for(let i = 0 ;i<children.length;i++){
        let item = children[i]
        item.style.width = itemWidth + 'px'  // 设置宽度
        if((i+1) % this.cols != 0) {
          // 如果不是最后一列，则每个子项目有一个右margin作为水平间距
          item.style.marginRight = this.itemSpace + 'px'
        }
        if(i >= this.cols){
          // 如果不是第一行，则每一行有一个上magrin作为垂直间距
          item.style.marginTop = this.lineSpace + 'px'
        }
      }
    }
  }
}
</script>

<style scoped>
  .grid-view {
    display: flex;
    flex-wrap: wrap;
  }
</style>