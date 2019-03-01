<template>
  <div id="main">
    <div style="margin:8px">
      <van-progress :percentage="100" />
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
                   @touchstart.native.stop="keyboardSelected('price')"
                   placeholder="请输入(千分位,例:5000 = ¥50)"
                   required
                   clearable />
        <van-field v-model="goods.market_price"
                   label="商品市场价格"
                   @touchstart.native.stop="keyboardSelected('market_price')"
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
    <van-dialog v-model="finishedLoading"
                :show-cancel-button="false"
                :show-confirm-button="false">
      <van-loading v-if="finishedLoading" />
    </van-dialog>

  </div>

</template>

<script>
import { Upload } from "../../api/upload.js";
import { ImagePreview } from 'vant';
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      finishedLoading: false,
      keyboardType: '',
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
        "title": "超级雪花酥",
        "subtitle": "超级无敌普通的雪花酥",
        "price": 5555,
        "market_price": 9999,
        "express": "",
        "remain": 19,
        "thumb": [
          "https://photostation.dragonsking.cn/mongodb/img/774ad515-61db-487c-9503-183116e52e59_20190301140016.jpg",
          "https://photostation.dragonsking.cn/mongodb/img/IMG_8225_20190301140044.jpg",
          "https://photostation.dragonsking.cn/mongodb/img/IMG_8223_20190301140124.jpg"
        ],
        "info": "<div class=\"hljs-center\">\n<p>综上所述,你不买不行!~</p>\n</div>\n<p><s>真的十分好吃</s></p>\n<h1><a id=\"_6\"></a>一千多万人的回头品牌</h1>\n",
        "goodsPromises": [
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        "sku_id": "5c78ca4d6a002c20246b58fd"
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
    },
    ...mapGetters(['id'])
  },
  methods: {
    keyboardSelected (field) {
      this.keyboardShow = true
      this.keyboardType = field
    },
    imgAdd (pos, file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('file', file);
      Upload(this.id, formdata).then(res => {
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
          Upload(this.id, params).then(response => {
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
      if (this.keyboardType == 'market_price') {
        this.goods.market_price = parseInt(this.goods.market_price + '' + value)
      }
      if (this.keyboardType == 'price') {
        this.goods.price = parseInt(this.goods.price + '' + value)
      }

    },
    onDelete () {
      if (this.keyboardType == 'price') {
        this.goods.price = this.goods.price + ''
        this.goods.price = parseInt(this.goods.price.substring(0, this.goods.price.length - 1))
      }
      if (this.keyboardType == 'market_price') {
        this.goods.market_price = this.goods.market_price + ''
        this.goods.market_price = parseInt(this.goods.market_price.substring(0, this.goods.market_price.length - 1))

      }
    },
    confirm () {
      this.finishedLoading = true
      this.goods.sku_id = this.sku_id
      // console.log(this.goods)
      this.$store.dispatch('SetGoods', this.goods).then(res => {
        console.log('SetGoods')
        console.log(res)

        // this.$router.push({ path: "/admin/addProduct" })
      })
      setTimeout(() => {
        this.$store.dispatch('updateProduct').then(res => {
          console.log(res)
          this.finishedLoading = false
          this.$store.commit('SET_NULL')
          this.$router.push({ path: "/admin/addProduct" })
        })
      }, 3000)
    },
    imagePreview () {
      ImagePreview(this.goods.thumb)
    }
  }
}
</script>
