<template>
  <div>
    <div class="my-leaderform-main-contain-col" :style="{width:adjustWidth}">
      <div class="my-leaderform-main-contain-row">
        <LeftBar/>
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
import LeftBarL from '@/components/components/leaderworking/LeftBarL.vue'

export default {
  name: 'leaderform',
  components: {
    LeftBar: LeftBarL
  },
  data() {
    return {
      adjustWidth: ''
    }
  }
}
</script>

<style>
.my-leaderform-main-contain-col{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.my-leaderform-main-contain-row{
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
