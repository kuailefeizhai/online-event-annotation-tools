<template>
  <div class="my-allmessage">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="username"
        label="账号名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="账号确认"
        width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.title" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="组长申请"
        width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="Agree(scope.row)">同意</el-button>
          <el-button type="text" size="small" @click="Refuse(scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'RequestList',
  data() {
    return {
      value: '',
      tableData: [{
        username: ''
      }]
    }
  },
  methods: {
    Agree(data) {
      var that = this
      console.log(data)
      jQuery.post(
        'http://localhost:3000/users/approveApply',
        data,
        function (res) {
          console.log(res)
          that.$message({
            message: '已同意',
            type: 'success'
          })
        }
      )
    },
    Refuse(data) {
      var that = this
      console.log(data)
      jQuery.post(
        'http://localhost:3000/users/disapproveApply',
        data,
        function (res) {
          console.log(res)
          that.$message({
            message: '已拒绝',
            type: 'success'
          })
        }
      )
    }
  },
  mounted() {
    var that = this
    jQuery.post(
      'http://localhost:3000/users/leaderApply',
      function (res) {
        console.log(res.leader)
        that.tableData = res.leader
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
