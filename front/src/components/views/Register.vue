<template>
  <div>
    <router-view v-if="show"/>
    <div v-else class="my-Register-page">
      <div class="my-Register-title">用户注册</div>
      <el-form ref="form" :model="form" label-width="40px">
        <el-form-item label="账号" >
          <el-input v-model="form.username" style="width:20rem" ></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="form.password" type="password" style="width:20rem" ></el-input>
        </el-form-item>
        <el-form-item label="确认" >
          <el-input v-model="form.password2" type="password" style="width:20rem" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">立即注册</el-button>
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
        password: '',
        password2: ''
      }
    }
  },
  methods: {
    redirect(pathname) {
      this.$router.push({name: pathname})
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.password !== this.form.password2) {
            this.$message({
              message: '两次输入密码不一致',
              type: 'warning'
            })
          } else {
            var that = this
            jQuery.post(
              'http://localhost:3000/users/regist',
              this.form,
              function (res) {
                console.log(res)
                that.$message({
                  message: '提交成功',
                  type: 'success'
                })
              }
            )
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}

</script>
<style>
.my-Register-page{
  margin: 5rem;
  width: 80rem;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
}
.my-Register-title{
  font-size: 2rem;
  font-weight: bold;
  margin: 2rem;
  color: rgb(77, 77, 77);
}
</style>
