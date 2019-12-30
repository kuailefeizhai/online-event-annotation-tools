<template>
  <div>
      <el-upload
  class="upload-file"
  drag
  :action="doUpload"
  :data="username">
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
</el-upload>
  </div>
</template>
<script>
export default {
  data() {
    return {
      doUpload: 'http://localhost:3000/users/upload',
      username: {username: window.document.cookie}
    }
  },
  methods: {
    submitUpload() {
      var that = this
      var data = {
        username: window.document.cookie
      }
      this.$refs.upload.submit()
      console.log(data)
      jQuery.post(
        'http://localhost:3000/users/upload',
        data,
        function (res) {
          console.log(res)
          that.$message({
            message: '已上传',
            type: 'success'
          })
        }
      )
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>
