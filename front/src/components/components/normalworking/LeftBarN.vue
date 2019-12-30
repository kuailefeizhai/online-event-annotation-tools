<template>
  <div>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" >
      <el-menu-item index="0" @click="redirect('normalmanagement')">
        <i class="el-icon-menu"></i>
        <span slot="title">账号管理</span>
      </el-menu-item>
     <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">文本打标</span>
        </template>
        <el-menu-item-group>
          <span slot="title">文件列表</span>
          <el-menu-item v-for="item in files" :index="item.DocumentID" @click="addIndex(item.filename)">{{item.filename}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import merge from 'webpack-merge'
export default {
  name: 'LeftBarN',
  data() {
    return {
      isCollapse: false,
      Nowname: '',
      files: [{
        filename: '',
        DocumentID: ''
      }]
    }
  },

  methods: {
    addIndex(filename) {
      console.log(filename)
      this.$router.push({name: 'Marking'})
      this.$router.push({
        query: merge(this.$route.query, {'filename': filename})
      })
    },
    redirect(pathname) {
      this.$router.push({name: pathname})
    },
    created() {
      var that = this
      var data = {
        username: window.document.cookie
      }
      jQuery.get(
        'http://localhost:3000/label/fileList',
        data,
        function(res) {
          console.log(res)
          that.files = res.files
        })
    }
  }
}
</script>

<style>
body{
  margin:0px;
  height: 1rem;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.my-adminleft-bar-title{
  margin: 2rem;
  font-weight: bold;
  font-size: 1.2rem;
  color: rgb(36, 36, 36);
}
.my-adminleft-bar{
  width: 15rem;
  margin-bottom: 2rem;
}
</style>
