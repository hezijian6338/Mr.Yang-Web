<template>
  <div>
    <van-uploader :after-read="onRead"
                  accept="image/gif, image/jpeg">
      <van-icon name="photograph" />
      <img ref="photograph"
           style="width: 200px">
    </van-uploader>
    <div v-for="(item, index) in this.images"
         :key="index"
         style="display: inline">
      <img :src="item"
           style="width: 50px;">
    </div>
  </div>
</template>
<script>
import { Upload, UserImages } from '../../api/upload.js';

export default {
  data () {
    return {
      height: 300,
      show: false,
      images: [] //显示图片所用 与上传没有关系（可选）
      // formData: new FormData() //在此处初始化时,即实例化 FormData
    };
  },
  computed: {
    user () {
      return this.$store.state.user.id
    }
  },
  methods: {
    onRead (file) {
      console.log(file);
      let params = new FormData(); //创建form对象
      params.append('file', file.file); //通过append向form对象添加数据//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      // console.log(params.get("file"));
      this.$dialog
        .confirm({
          title: '再次确认框',
          message: '是否上传此图片?'
        })
        .then(() => {
          // on confirm
          Upload(this.user(), params).then(response => {
            this.$refs.photograph.src = response.data;
            console.log(response.data);
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  created () {
    UserImages(this.user()).then(response => {
      this.images = response.data;
      console.log(response.data);
    });
  }
};
</script>
