<template>
  <div class="MarkingBody">
    <el-form class="my-file-Marking-form"  :model="form" label-width="100px">
      <el-form-item label="文件名称" >
        <el-input v-model="form.filename" ></el-input>
      </el-form-item>
      <el-form-item label="文本内容">
        <el-input v-model="form.content" :rows="5" type="textarea" class="my-file-Marking-form-font"></el-input>
      </el-form-item>
    </el-form>
        <textarea name="" class="textarea" ref="textarea" id="t1" style="min-height: 300px;min-width: 1000px;max-height: 1000000px; max-width: 100000px;" @click="getSelectPosition()"></textarea>
        <!-- 参数结果 -->
        <div>选中起始位置：<input type="text" id="txt2" value=""></div>
        <div>选中结束位置<input type="text" id="txt3" value=""><br/></div>
        <div>选中内容: <div id="txt4"></div></div><br/>
        <!-- 触发词标注框 -->
        <el-button type="primary" round @click="dialogFormVisible1 = true">触发词标注</el-button>
        <el-dialog title="请先标记触发词" :visible.sync="dialogFormVisible1">
          <el-form :model="submitform_trigger">
            <el-form-item label="触发词" :label-width="formLabelWidth">
              <el-input v-model="submitform_trigger.trigger" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Start" :label-width="formLabelWidth">
              <el-input v-model="submitform_trigger.start" autocomplete="off"></el-input>
            </el-form-item>
            '<el-form-item label="End" :label-width="formLabelWidth">
              <el-input v-model="submitform_trigger.end" autocomplete="off"></el-input>
            </el-form-item>'
            <el-form-item label="事件类型" :label-width="formLabelWidth">
              <el-select v-model="submitform_trigger.type" placeholder="请选择事件类型">
                <el-option label="会见会谈" value="会见会谈"></el-option>
                <el-option label="签署文件" value="签署文件"></el-option>
                <el-option label="设施启用" value="设施启用"></el-option>
                <el-option label="举行活动" value="举行活动"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit_trigger('submitform_trigger')">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 事件元素标注框 -->
        <el-button type="primary" round @click="dialogFormVisible2 = true">事件元素标注</el-button>
        <el-dialog title="请标记事件元素" :visible.sync="dialogFormVisible2">
          <el-form :model="submitform_argument">
            <el-form-item label="事件元素" :label-width="formLabelWidth">
              <el-input v-model="submitform_argument.content" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Start" :label-width="formLabelWidth">
              <el-input v-model="submitform_argument.start" autocomplete="off"></el-input>
            </el-form-item>
            '<el-form-item label="End" :label-width="formLabelWidth">
              <el-input v-model="submitform_argument.end" autocomplete="off"></el-input>
            </el-form-item>'
            <el-form-item label="元素角色" :label-width="formLabelWidth">
              <el-cascader v-model="submitform_argument.role" :options="options" :show-all-levels="false" @change="handleChange"></el-cascader>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit_argument('submitform_argument')">确 定</el-button>
          </div>
        </el-dialog>
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
      },
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      submitform_trigger: {
        trigger: '',
        type: '',
        start: '',
        end: ''
      },
      submitform_argument: {
        content: '',
        start: '',
        end: '',
        role: ''
      },
      formLabelWidth: '120px',
      options: [{
        label: '会见会谈',
        children: [{
          label: '参与方',
          value: '参与方'
        },
        {
          label: '时间',
          value: '时间'
        },
        {
          label: '地点',
          value: '地点'
        }]
      },
      {
        label: '签署文件',
        children: [{
          label: '签署方',
          value: '签署方'
        },
        {
          label: '文件',
          value: '文件'
        },
        {
          label: '签署时间',
          value: '签署时间'
        },
        {
          label: '签署地点',
          value: '签署地点'
        }
        ]
      },
      {
        label: '设施启用',
        children: [{
          label: '设施修建方',
          value: '设施修建方'
        },
        {
          label: '设施名称',
          value: '设施名称'
        },
        {
          label: '启用时间',
          value: '启用时间'
        },
        {
          label: '设施地点',
          value: '设施地点'
        }]
      },
      {
        label: '举行活动',
        children: [{
          label: '举办方',
          value: '举办方'
        },
        {
          label: '活动名称',
          value: '活动名称'
        },
        {
          label: '活动地点',
          value: '活动地点'
        },
        {
          label: '活动时间',
          value: '活动时间'
        }]
      }
      ]
    }
  },
  mounted() {
    var that = this
    that.form.filename = that.$route.query.filename // 该页面文件名通过路由从leftbar获取
    console.log(that.form.filename)
    jQuery.post(
      'http://localhost:3000/label/fileContent',
      {name: that.form.filename},
      function (res) {
        if (res.file.length === 0) {
          that.form.filename = that.$route.query.filename
        } else {
          that.form = res.file
        }
        console.log(that.form)
      }
    )
  },
  methods: {
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
      document.getElementById('txt2').value = selectStart
      this.getBstart = selectStart
      document.getElementById('txt3').value = selectEnd
      this.getBend = selectEnd
      document.getElementById('txt4').innerHTML = selectText
      this.getBtext = selectText
      this.submitform_trigger.trigger = selectText // 将获取到的文字内容读取到标注页面
      this.submitform_trigger.start = selectStart // 将获取到的起始位置读取到标注页面
      this.submitform_trigger.end = selectEnd
      this.submitform_argument.content = selectText
      this.submitform_argument.start = selectStart
      this.submitform_argument.end = selectEnd
      // this.$ls.set('selectText', selectText)  存到缓存
    }
  },
  onSubmit_trigger() {
    var that = this
    var data = {
      username: window.document.cookie,
      filename: this.form.filename,
      trigger: this.submitform_trigger.trigger,
      start: this.submitform_trigger.start,
      end: this.submitform_trigger.end,
      type: this.submitform_trigger.type
    }
    jQuery.post(
      'https://husteicstu.cn:3000/sign',
      data,
      function (res) {
        console.log(res)
        that.$message({
          message: '提交成功',
          type: 'success'
        })
      }
    )
    // this.dialogFormVisible1 = false
  },
  onSubmit_argument() {
    var that = this
    var data = {
      username: window.document.cookie,
      filename: this.form.filename,
      content: this.submitform_argument.content,
      start: this.submitform_argument.start,
      end: this.submitform_argument.end,
      role: this.submitform_argument.role
    }
    jQuery.post(
      'https://husteicstu.cn:3000/sign',
      data,
      function (res) {
        console.log(res)
        that.$message({
          message: '提交成功',
          type: 'success'
        })
      }
    )
    // this.dialogFormVisible2 = false
  },
  handleChange(value) {
    console.log(value)
  }

}
</script>
<style >
.my-file-Marking-form{
  width: 90%;
}
.my-file-Marking-form-font{
  font-family: "STSong";
  font-size: 0.9rem;
}
</style>
