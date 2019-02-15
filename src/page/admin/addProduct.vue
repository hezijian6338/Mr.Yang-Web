<template>
  <div>
    <van-cell-group>
      <van-field
        v-model="title"
        required
        clearable
        label="产品名称"
        right-icon="question"
        placeholder="请输入产品名称"
        @click-right-icon="$toast('question')"
      />

      <van-field v-model="price" label="价格" placeholder="请输入价格" required clearable/>
      <van-field v-model="imageURL" label="图片" placeholder="请上传图片" required clearable>
        <!-- <van-button slot="button" size="small" type="primary">发送验证码</van-button> -->
      </van-field>
      <van-uploader :after-read="onRead" accept="image/gif, image/jpeg">
        <van-icon v-show="upload" name="photograph"/>
        <img ref="photograph" style="width: 200px">
      </van-uploader>
    </van-cell-group>
  </div>
</template>

<script>
import { Upload } from "../../api/upload.js";

export default {
  data() {
    return {
      upload: true,
      title: "",
      price: "",
      imageURL: ""
    };
  },
  methods: {
    onRead(file) {
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
    }
  }
};
</script>
<style>
.div {
  padding: 1em;
}
</style>

