<template>
  <div class="MarkingBody">
    <el-form class="my-department-show-form" ref="form" :model="form" label-width="100px">
      <el-form-item label="文件名称" >
        <el-input v-model="form.name" ></el-input>
      </el-form-item>
      <el-form-item label="文本内容">
        <el-input v-model="form.content" :rows="5"></el-input>
      </el-form-item>
    </el-form>
        <textarea name="" class="textarea" ref="textarea" id="t1" style="min-height: 300px;min-width: 1000px;max-height: 1000000px; max-width: 100000px;" @click="getSelectPosition()"></textarea>
        <!-- 参数结果 -->
        <div>焦点位置：<input type="text" id="txt1" value=""><br/></div>
        <div>选中起始位置：<input type="text" id="txt2" value=""></div>
        <div>选中结束位置<input type="text" id="txt3" value=""><br/></div>
        <div>选中内容: <div id="txt4"></div></div>
      </div>
</template>
<script>
export default {
  name: 'Marking',
  data() {
    return {
      form: {
        content: '',
        filename: ''
      }
    }
  },
  methods: {
    created() {
      var that = this
      this.form.filename = this.$route.query.filename
      jQuery.post(
        'http://localhost:3000/label/fileContent',
        {name: this.form.name},
        function (res) {
          if (res.department.length === 0) {
            that.form.filename = that.$route.query.filename
          } else {
            that.form = res.file
          }
          console.log(that.form)
        }
      )
    },

    getSelectPosition() {
      var nullvalue = -1
      var selectStart // 选中开始位置
      var selectEnd // 选中结束位置
      var position// 焦点位置
      var selectText// 选中内容
      const oTxt = this.$refs.textarea
      selectStart = oTxt.selectionStart
      selectEnd = oTxt.selectionEnd
      if (selectStart === selectEnd) {
        position = oTxt.selectionStart
        selectStart = nullvalue
        selectEnd = nullvalue
      } else {
        position = nullvalue
      }
      selectText = oTxt.value.substring(selectStart, selectEnd)
      document.getElementById('txt1').value = position
      document.getElementById('txt2').value = selectStart
      this.getBstart = selectStart
      document.getElementById('txt3').value = selectEnd
      this.getBend = selectEnd
      document.getElementById('txt4').innerHTML = selectText
      this.getBtext = selectText
      // this.$ls.set('selectText', selectText)  存到缓存
    }
  }
}
</script>
