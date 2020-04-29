<template>
  <div class="user-info">
    <a href="#" class="clear-fix">
      <div class="avatar left">
        <svg-icon class="avatar-icon" icon-name="avatar" icon-color="#DCDCDC"></svg-icon>
      </div>
      <div class="login left">
        <div>登录/注册</div>
        <div>
          <svg-icon class="phone-icon" icon-name="phone" icon-color="#fff"></svg-icon>
          <span>暂未绑定手机号码</span>
        </div>
      </div>
      <div class="arrow right">
        <svg-icon icon-name="rightarrow" icon-color="#fff"></svg-icon>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name:'userInfo'
}
</script>

<style scoped>
  .user-info {
    background-color: var(--color-tint);
    padding: 10px 14px;
    margin-top: -5px;
  }
  .avatar .avatar-icon {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }
  .login {
    margin: 10px;
    color: #fff;
  }
  .login .phone-icon {
    width: 20px;
    height: 20px;
    margin-left: -5px;
  }
  .login div {
    font-size: 16px;
  }
  .login span {
    font-size: 13px;
    vertical-align:super
  }
  .login div:first-of-type {
    margin-bottom: 4px;
  }
  .arrow {
    margin-top: 18px;
  }
</style>