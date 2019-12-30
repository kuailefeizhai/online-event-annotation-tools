<template>
  <div class="my-allmessage">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="username"
        label="账号名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="password"
        label="账号密码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="groupID"
        label="小组序号"
        width="280">
      </el-table-column>
      <el-table-column
        prop="identity"
        label="是否为组长"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'AccountMessage',
  data() {
    return {
      value: '',
      tableData: [{
        username: '',
        password: '',
        groupID: '',
        identity: ''
      }]
    }
  },
  methods: {
  },
  mounted() {
    var that = this
    jQuery.post(
      'http://localhost:3000/users/AccountMessage',
      function (res) {
        console.log(res.AccountMessage)
        that.tableData = res.AccountMessage
      }
    )
  }
}
</script>

<style>
.my-allmessage{
  width: 60rem;
  padding: 5rem 10%;
}
</style>
