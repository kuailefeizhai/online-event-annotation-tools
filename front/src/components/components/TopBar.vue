<template>
  <div class="my-header" :style="{width:adjustWidth}">
    <div class="my-header-col">
      <el-menu  :default-active="activeIndex"
                class="el-menu-demo my-menu"
                mode="horizontal"
                @select="handleSelect">
        <div class="my-logo-text">
          <div class="my-title">在线事件打标工具</div>
        </div>
        <el-submenu index="2">
          <template slot="title">登录/注册</template>
          <el-menu-item index="2-1" @click="redirect('Login')">登录</el-menu-item>
          <el-menu-item index="2-2" @click="redirect('Register')">注册</el-menu-item>
        </el-submenu>
        <el-menu-item index="1" @click="redirect('AboutUs')">
          关于我们
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TopBar',
  data() {
    return {
      adjustWidth: '',
      activeIndex: '1',
      activeIndex2: '1',
      fit: 'scale-down'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    redirect(pathname) {
      this.$router.push({name: pathname})
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a {
text-decoration:none ;
color:rgb(156, 156, 156)
}
.my-header-col{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 120rem;
}
.my-title{
  white-space: nowrap;/*规定段落中的文本不进行换行 */
}
.my-header{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.my-logo-text{
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
  color: rgb(53, 53, 53);
  margin-right: 8rem;
}
.my-header-img{
  width: 100%;
  position: absolute;
  left: 0;
  top:0;
  z-index: 0;
}
.my-menu{
  display: flex;
  height: 3.7rem;
  justify-content: space-between;
  border: 0;
  padding: 0;
  margin: 0;
  /* width: 100%; */
  z-index: 10;
}
.my-notice{
  display: flex;
  align-items:center;
  margin-right: 1rem;
  font-size: 1.2rem;
}
body{
  margin:0px;
  height: 1rem;
}
.my-home-alert-img{
  width: 100%;
}
</style>
