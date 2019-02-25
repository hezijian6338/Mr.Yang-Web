<template>
  <div>
    <div style="margin:8px">
      <van-progress :percentage="50" />
    </div>
    <van-cell-group>
      <van-field v-model="product.title"
                 required
                 clearable
                 label="产品名称"
                 right-icon="question"
                 placeholder="请输入产品名称"
                 @click-right-icon="$toast('question')" />
      <van-number-keyboard :show="keyboardShow"
                           close-button-text="完成"
                           @blur="keyboardShow = false"
                           @input="onInput"
                           @delete="onDelete"
                           @hide="confirm"
                           :z-index="3000" />

      <van-field v-model="product.price"
                 @touchstart.native.stop="keyboardShow = true"
                 label="价格"
                 placeholder="请输入价格"
                 required
                 clearable />
      <van-field v-model="product.imageURL"
                 label="图片"
                 placeholder="请上传图片"
                 required
                 clearable>
        <!-- <van-button slot="button" size="small" type="primary">发送验证码</van-button> -->
      </van-field>
      <van-uploader :after-read="onRead"
                    accept="image/gif, image/jpeg">
        <van-icon v-show="upload"
                  name="photograph" />
        <img ref="photograph"
             style="width: 200px">
      </van-uploader>
    </van-cell-group>
    <router-link :to="'/admin/addTree'">
      <van-button size="small"
                  type="primary">完成~</van-button>
    </router-link>
  </div>
</template>

<script>
import { Upload } from "../../api/upload.js";

export default {
  data () {
    return {
      upload: true,
      keyboardShow: false,
      product: {
        title: "",
        price: "",
        imageURL: ""
      }
    };
  },
  computed: {
    user() {
      return this.$store.state.user.id
    }
  },
  methods: {
    onRead (file) {
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
            this.$refs.photograph.src = response.data;
            this.imageURL = response.data
            console.log(response.data);
            this.upload = false;
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    onInput (value) {
      this.product.price = this.product.price + '' + value
    },
    onDelete () {
      this.product.price = this.product.price.substring(0, this.product.price.length - 1)
    },
    confirm () {
      this.$store.dispatch('SetProduct', this.product).then(res => {
        console.log(res)
      })
      console.log(this.product)
    },
  }
};
</script>
<style>
.div {
  padding: 1em;
}
</style>

