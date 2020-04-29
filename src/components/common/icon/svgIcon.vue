<template>
  <svg :fill="iconColor" class="svg-icon">
    <use :xlink:href="iconNameCp" />
  </svg>
</template>
<script>
export default {
  name: 'svgIcon',
  props: {
    // 图标类型
    iconName: {
      type: String,
      required: true
    },
    // 图标颜色
    iconColor:{
      type:String,
      default:'#666'
    }
  },
  computed: {
    iconNameCp() {
      return `#icon-${this.iconName}`
    }
  } 
}
</script>

<style scoped>
  .svg-icon {
    width: 18px;
    height: 18px;
    overflow: hidden;
  }
</style>