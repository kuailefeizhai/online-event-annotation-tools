<template>
  <div>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" >
      <el-menu-item index="0" @click="redirect('Uploading')">
        <i class="el-icon-menu"></i>
        <span slot="title">上传文本</span>
      </el-menu-item>
      <el-menu-item index="1" @click="redirect('Markingmanagement')">
        <i class="el-icon-menu"></i>
        <span slot="title">文本打标</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>

export default {
  name: 'LeftBarL',
  data() {
    return {
      isCollapse: false
    }
  },

  methods: {
    redirect(pathname) {
      this.$router.push({name: pathname})
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
