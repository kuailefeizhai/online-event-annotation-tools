<template>
  <div>
    <router-view v-if="show"/>
    <div v-else class="my-login-page">
      <div class="my-login-title">管理员登录</div>
      <el-form ref="form" :model="form" label-width="40px">
        <el-form-item label="账号">
          <el-input v-model="form.username" style="width:20rem"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" style="width:20rem"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {
  },
  data() {
    return {
      show: false,
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      var that = this
      jQuery.post(
        'http://localhost:3000/users/admin',
        this.form,
        function (res) {
          console.log(res)
          if (res.code !== '-1') {
            that.$message({
              message: '登录成功',
              type: 'success'
            })
            that.$router.push({ name: 'Adminform' })
            that.show = true
          } else {
            that.$message({
              message: '登录失败',
              type: 'warning'
            })
          }
        }
      )
    }
  }
}
</script>

<style>
.my-login-page{
  margin: 5rem;
  width: 80rem;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
}
.my-login-title{
  font-size: 2rem;
  font-weight: bold;
  margin: 2rem;
  color: rgb(77, 77, 77);
}
</style>
