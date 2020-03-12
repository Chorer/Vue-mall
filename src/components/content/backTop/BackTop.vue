<template>
  <div class="back-top">
    <!-- <img src="~assets/img/common/top.png" alt=""> -->
    <svg viewBox="0 0 24 24">
      <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
    </svg>
  </div>  
</template>

<script>
export default {
  name:'BackTop'
}
</script>

<style scoped>
  .back-top{
    width: 52px;
    height: 52px;
    position: fixed;
    z-index: 9;
    right: 12px;
    bottom: 60px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
    background-color: var(--color-tint);
    border-radius: 50%;
  }
  .back-top svg{
    display: block;
    fill: currentColor;
    height: 24px;
    margin: 13px auto 0;
    width: 24px;
    color: #fff;
  }
  /* .back-top img{
    width: 55px;
    height: 55px;
  } */
</style>