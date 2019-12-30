<template>
    <div class="AboutUs">
      <div class="my-head-first-row">
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="font-weight: bold;font-size: 1.2rem;">
          <span>基本信息</span>
        </div>
        <div class="text item">
          <span class="my-lable-blue">/</span>
          <span style="font-weight: bold;">课设名称：在线事件打标工具</span>
        </div>
        <div class="text item">
          <span class="my-lable-blue">/</span>
          <span style="font-weight: bold;">组员1：李培森</span>
        </div>
        <div class="text item">
          <span class="my-lable-blue">/</span>
          <span style="font-weight: bold;">组员2：周 瑜</span>
        </div>
        <div class="text item">
          <span class="my-lable-blue">/</span>
          <span style="font-weight: bold;">组员3：黄 澳</span>
        </div>
        <div class="text item">
          <span class="my-lable-blue">/</span>
          <span style="font-weight: bold;">指导老师：王 邦</span>
        </div>
      </el-card>
      </div>
      <div class="my-passage-item-inner-col">
        <div class="my-passage-item-title">
          项目简介
        </div>
        <div class="my-passage-item-content">
        一个可以在网页上对事件进行标注的工具，有管理员，组长，普通用户三种身份，普通用户可以选择组长加入，组长账号可以向管理员申请。组长能通过该工具判断事件的一致性，形成对事件的最终标记。
        </div>
      </div>
      <div class="my-passage-join-button" @click="redirect('Register')">
         开始使用
      </div>
    </div>
</template>
<script>
export default {
  name: 'AboutUs',
  data() {
    return {
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
  margin: 0px;
  height: 1rem;
  text-align:center；
}
.my-passage-item-inner-col{
  display: flex;
  flex-direction: column;
  width: 30rem;
  margin-left: 5rem;
}
.my-lable-blue{
  display: inline-block;
  font-weight: bold;
  font-size: 1.1rem;
  color: rgb(243, 45, 45);
  width: 1rem;
}
.my-head-first-row{
  width: 80rem;
  display: flex;
  flex-direction: row;
}
.my-passage{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* padding-left: 4rem; */
}
.my-passage-title{
  font-size: 1.8rem;
  font-weight: bold;
  margin: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.my-passage-item-title{
  display: flex;
  justify-content: flex-start;
  padding-bottom: 0.2rem;
  border-bottom: 1px rgb(143, 143, 143) solid;
  font-size: 1.2rem;
  font-weight: bold;
}
.my-passage-item-content{
  padding: 1.8rem;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-indent:2em;
}
.my-passage-join-button{
  font-size: 1.5rem;
  width: 15rem;
  background:crimson ;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  height: 4rem;
  color:white;
  border-top-right-radius: 10rem;
  border-bottom-left-radius: 10rem;
  margin: 3rem;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
  margin: 2rem;
}
</style>
