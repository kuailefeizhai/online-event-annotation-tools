<template>
  <div class="my-bottom" :style="{width:adjustWidth}">
    <div class="my-copy" :style="{width:adjustWidth}">Copyright ©2019 HUSTER,Wuhan,China.All Right Reserved</div>
  </div>
</template>
<script>
export default {
  name: 'BottomBar',
  data() {
    return {
      adjustWidth: '',
      fit: 'cover'
    }
  },
  methods: {
  }
}
</script>

<style>
body{
  margin:0px;
  height: 1rem;
}
.my-bottom{
  bottom: 0px;
  padding-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.my-copy{
  width: 100%;
  display: flex;
  flex-direction: column;
  color:#525252;
  align-items: center;
  font-size: 0.7rem;
  padding: 0.5rem 0rem;
}
</style>
