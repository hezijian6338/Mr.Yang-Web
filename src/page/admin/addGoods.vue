<template>
  <div id="main">
    <div style="margin:8px">
      <van-progress :percentage="50" />
    </div>
    <div>
      <van-cell-group>
        <van-field v-model="goods.title"
                   label="产品标题"
                   placeholder="请输入产品标题"
                   required
                   clearable />
        <van-field v-model="goods.subtitle"
                   label="产品简要描述"
                   placeholder="请输入产品简要描述"
                   required
                   clearable
                   type="textarea"
                   rows="2"
                   autosize />
        <van-field v-model="goods.price"
                   label="商品默认价格"
                   @touchstart.native.stop="keyboardShow = true"
                   placeholder="请输入(千分位,例:5000 = ¥50)"
                   required
                   clearable />
      </van-cell-group>
      <van-number-keyboard :show="keyboardShow"
                           close-button-text="完成"
                           @blur="keyboardShow = false"
                           @input="onInput"
                           @delete="onDelete"
                           :z-index="3000" />
    </div>
    <div>
      <van-cell title="上传图片">
        <template slot="right-icon">
          <van-uploader :after-read="onRead"
                        accept="image/gif, image/jpeg">
            <van-icon v-if="!loading"
                      name="photograph"
                      size="30px" />
            <van-loading v-if="loading" />
          </van-uploader>
        </template>
      </van-cell>

      <!-- <div v-for="(item, index) in goods.thumb"
           :key="index"
           style="display: inline">
        <img :src="item"
             style="width: 50px;">
      </div> -->
      <van-button type="primary"
                  @click="imagePreview">图片预览</van-button>
    </div>
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
    <van-button type="primary"
                @click="confirm()">{{sku_id}}</van-button>

  </div>

</template>

<script>
import { Upload } from "../../api/upload.js";
import { ImagePreview } from 'vant';

export default {
  data () {
    return {
      loading: false,
      height: 300,
      keyboardShow: false,
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
      },
      goods: {
        "id": "",
        "product_id": "",
        "title": "",
        "subtitle": "",
        "price": 0,
        "market_price": 0,
        "express": "",
        "remain": 19,
        "thumb": [],
        "info": "",
        "goodsPromises": [
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        "sku_id": ""
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
    },
    sku_id () {
      return this.$store.state.product.sku.id
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
      this.goods.info = render
      // console.log(render)
    },
    onRead (file) {
      this.loading = true
      console.log(file);
      let params = new FormData(); //创建form对象
      params.append("file", file.file); //通过append向form对象添加数据//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      // console.log(params.get("file"));
      this.$dialog
        .confirm({
          title: "再次确认框",
          message: "是否上传此图片?"
        })
        .then(() => {
          // on confirm
          Upload(params).then(response => {
            this.goods.thumb.push(response.data);
            console.log(response.data);
            this.loading = false
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    onInput (value) {
      this.goods.price = parseInt(this.goods.price + '' + value)
    },
    onDelete () {
      this.goods.price = this.goods.price + ''
      this.goods.price = parseInt(this.goods.price.substring(0, this.goods.price.length - 1))
    },
    confirm () {
      this.goods.sku_id = this.sku_id
      console.log(this.goods)
      this.$store.dispatch('SetGoods', this.goods).then(res => {
        console.log('SetGoods')
        console.log(this.goods)
          this.$router.push({ path: "/admin/addProduct" })
      })
    },
    imagePreview () {
      ImagePreview(this.goods.thumb)
    }
  }
}
</script>
