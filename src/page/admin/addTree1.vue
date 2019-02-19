<template>
  <div>
    <van-cell-group>
      <div>
        <van-field
          v-model="this.tree_s1.k"
          required
          clearable
          label="规格名称(次)"
          right-icon="question"
          placeholder="请输入规格名称(例如:规格)"
          @click-right-icon="$toast('question')"
        />
      </div>
      <div v-for="(tree, index) in v" :key="index">
        <van-swipe-cell :right-width="65" :left-width="65" style="margin-top:10px">
          <van-button
            type="warning"
            slot="left"
            @click="clearTree_name(index)"
            :block="true"
            style="margin:0 auto"
          >清空</van-button>
          <van-field
            v-model="v[index].name"
            :label="tree_v_name(index)"
            placeholder="请输入规格详情(例如:大包(12个))"
            required
            clearable
          />
          <!-- <span slot="right">删除</span> -->
          <van-button
            type="danger"
            slot="right"
            @click="v.splice(index, 1)"
            :block="true"
            style="margin:0 auto"
          >删除</van-button>
        </van-swipe-cell>
      </div>
    </van-cell-group>
    <van-swipe-cell :right-width="65" :left-width="85">
      <van-button
        type="danger"
        slot="left"
        @click="continue_add"
        :block="true"
        style="margin:0 auto"
      >继续添加</van-button>
      <div style="text-align:center">
        <van-icon
          slot="icon"
          :color="icon_color"
          :name="icon_name"
          size="30px"
          @click="control_Tree"
        />
      </div>
      <van-button
        type="primary"
        slot="right"
        @click="finish_add"
        :block="true"
        style="margin:0 auto"
      >完成</van-button>
    </van-swipe-cell>
  </div>
</template>

<script>
import { Upload } from "../../api/upload.js";

export default {
  data() {
    return {
      upload: true,
      icon_name: "add-o",
      icon_color: "",
      v: [],
      tree_v: {
        imgUrl: "",
        name: ""
      },
      tree_s1: {
        k: "",
        k_s: "s1",
        v: [
          {
            imgUrl: "",
            name: ""
          }
        ]
      },
      tree_s2: {
        k: "",
        k_s: "s2",
        v: [
          {
            imgUrl: "",
            name: ""
          }
        ]
      }
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
            this.imageURL = response.data;
            console.log(response.data);
            this.upload = false;
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    control_Tree() {
      if (this.icon_name == "add-o") {
        this.v.push({ imgUrl: "", name: "" });
      }
      if (this.icon_name == "passed") {
        this.$dialog
          .confirm({
            title: "再次确认框",
            message: "是否确认此页资料?"
          })
          .then(() => {
            // on confirm
            this.tree_s1.v = this.v
          })
          .catch(() => {
            // on cancel
          });
        console.log(this.tree_s1);
      }
    },
    clearTree_name(index) {
      this.v[index].name = "";
    },
    clearTree_imgUrl(index) {
      this.v[index].imgUrl = "";
    },
    tree_v_name(index) {
      return "规格详情-" + (index + 1);
    },
    tree_v_imgUrl(index) {
      return "图片-" + (index + 1);
    },
    finish_add() {
      this.icon_name = "passed";
      this.icon_color = "green";
    },
    continue_add() {
      this.icon_name = "add-o";
      this.icon_color = "red";
    }
  }
};
</script>
<style>
.div {
  padding: 1.5em;
}
.van-icon-add-o {
  transition: transform 2s;
  -moz-transition: transform 2s; /* Firefox 4 */
  -webkit-transition: transform 2s; /* Safari 和 Chrome */
  -o-transition: transform 2s; /* Opera */
}
.van-icon-add-o:active {
  -webkit-transform: scale(5);
}
</style>

