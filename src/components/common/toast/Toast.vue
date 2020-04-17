<template>
  <div class="toast" v-show="isShow">
    <div class="content">
      {{message}}
    </div>
  </div>
</template>

<script>
export default {
  name:"Toast",
  data(){
    return {
      message:"",
      isShow:false
    }
  },
  methods:{
    show(message,duration){
      this.message = message
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
      },duration)
    }
  }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 14px 20px;
    background-color: rgb(61,61,61);
    color: #fff;
    z-index: 10;
    border-radius: 5px;
  }
</style>