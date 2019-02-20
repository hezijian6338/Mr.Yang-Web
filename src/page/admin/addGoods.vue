<template>
  <div id="main">
    <mavon-editor v-model="value" />
    <!-- {{value}} -->
    <div v-html="value"
         readModel="true"></div>

    <mavon-editor class="md"
                  :value="value"
                  :subfield="prop.subfield"
                  :defaultOpen="prop.defaultOpen"
                  :toolbarsFlag="prop.toolbarsFlag"
                  :editable="prop.editable"
                  :scrollStyle="prop.scrollStyle"></mavon-editor>
  </div>

</template>

<script>
export default {
  data () {
    return {
      value: ''
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
  }
}
</script>
