<template>
  <div class="my-normalmanagement-show">
      <el-form class="my-normalmanagement-show-form" ref="form" :model="form" label-width="100px">
          <el-form-item label="加入组别序号">
            <el-input v-model="form.groupID"></el-input>
          </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">确认</el-button>
        <el-button type="primary" @click="Apply()">申请组长</el-button>
      </el-form-item>
      </el-form>
    </div>
</template>
<script>
export default {
  name: 'normalworking',
  data() {
    return {
      form: {
        groupID: ''
      }
    }
  },
  methods: {
    Apply() {
      var that = this
      var data = {
        username: window.document.cookie
      }
      console.log(data)
      jQuery.post(
        'http://localhost:3000/users/apply',
        data,
        function (res) {
          console.log(res)
          that.$message({
            message: '已申请',
            type: 'success'
          })
        }
      )
    },
    onSubmit() {
      var that = this
      var data = {
        username: window.document.cookie,
        groupID: this.form.groupID
      }
      jQuery.post(
        'http://localhost:3000/users/join',
        data,
        function(res) {
          console.log(res)
          that.$message({
            message: '已加入该组',
            type: 'success'
          })
        }
      )
    }
  }
}
</script>
<style>
.my-normalmanagement-show{
  padding-top: 3rem;
  display: flex;
  width: 90%;
  margin: 2rem 2rem;
};
.my-normalmanagement-show-form{
  width: 90%;
}
</style>
