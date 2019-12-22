<template>

  <div>

    <div class="register_form">

      <input type="text"  class="qxs-ic_user qxs-icon"  placeholder="用户名" v-model="userName">

      <input type="text"  class="qxs-ic_password qxs-icon"  placeholder="请输入密码" v-model="pass">
      <input type="text"  class="qxs-ic_password qxs-icon"  placeholder="请确认密码" v-model="checkpass">

      <!--<button class="login_btn el-button el-button&#45;&#45;primary is-round" type="primary" round>登录</button>-->

      <el-button class="register_btn" @click.native="register" type="primary" round :loading="isBtnLoading">注册</el-button>

      </div>

    </div>

  </div>

</template>


<script>

//  import { userLogin } from '../../api/api';
  export default {

    data() {
    }
  }
</script>


<style>

  .register_form {

    padding-top: 10%;

    padding-left: 10%;

    padding-right: 10%;

  }

  .qxs-ic_user {

    background: url("../../assets/user.gif") no-repeat;

    background-size: 13px 15px;

    background-position: 3%;

  }

  .qxs-ic_password {

    background: url("../../assets/password.gif") no-repeat;

    background-size: 13px 15px;

    background-position: 3%;

    margin-bottom: 20px;

  }

  .login_btn {

    width: 100%;

    font-size: 16px;

    background: -webkit-linear-gradient(left, #000099, #2154FA); /* Safari 5.1 - 6.0 */

    background: -o-linear-gradient(right, #000099, #2154FA); /* Opera 11.1 - 12.0 */

    background: -moz-linear-gradient(right, #000099, #2154FA); /* Firefox 3.6 - 15 */

    background: linear-gradient(to right, #000099 , #2154FA); /* 标准的语法 */

    filter: brightness(1.4);

  }

</style>
