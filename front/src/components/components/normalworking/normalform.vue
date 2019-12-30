<template>
  <div>
    <div class="my-normalform-main-contain-col" :style="{width:adjustWidth}">
      <div class="my-adminform-main-contain-row">
        <LeftBar/>
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
import LeftBarN from '@/components/components/normalworking/LeftBarN.vue'

export default {
  name: 'normalform',
  components: {
    LeftBar: LeftBarN
  },
  data() {
    return {
      adjustWidth: ''
    }
  }
}
</script>

<style>
.my-normalform-main-contain-col{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.my-normalform-main-contain-row{
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
