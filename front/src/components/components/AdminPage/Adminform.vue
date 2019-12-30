<template>
  <div>
    <div class="my-adminform-main-contain-col" :style="{width:adjustWidth}">
      <div class="my-adminform-main-contain-row">
        <LeftBar/>
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
import LeftBar from '@/components/components/AdminPage/LeftBar.vue'

export default {
  name: 'Adminform',
  components: {
    LeftBar: LeftBar
  },
  data() {
    return {
      adjustWidth: ''
    }
  }
}
</script>

<style>
.my-adminform-main-contain-col{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.my-adminform-main-contain-row{
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
