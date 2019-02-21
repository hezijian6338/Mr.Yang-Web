<template>
  <div id="main">
    <mavon-editor v-model="value"
                  ref="md"
                  :subfield="false"
                  @imgAdd="imgAdd"
                  @change="change"
                  :toolbars="toolbars" />
    <!-- <div v-html="html"
         readModel="true"></div> -->

    <!-- <mavon-editor class="md"
                  :value="value"
                  :subfield="prop.subfield"
                  :defaultOpen="prop.defaultOpen"
                  :toolbarsFlag="prop.toolbarsFlag"
                  :editable="prop.editable"
                  :scrollStyle="prop.scrollStyle"></mavon-editor> -->
  </div>

</template>

<script>
import { Upload } from "../../api/upload.js";

export default {
  data () {
    return {
      value: '',
      html: '',
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: false, // 上角标
        subscript: false, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: false, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: false, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: false, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    }
  },
  computed: {
    prop () {
      let data = {
        subfield: false,// 单双栏模式
        defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域 
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      }
      return data
    }
  },
  methods: {
    imgAdd (pos, file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('file', file);
      Upload(formdata).then(res => {
        this.$refs.md.$img2Url(pos, res.data)
        console.log(pos)
      })
    },
    change (value, render) {
      this.html = render
      // console.log(render)
    }
  }
}
</script>
