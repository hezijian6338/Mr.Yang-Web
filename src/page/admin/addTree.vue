<template>
  <div>
    <div style="margin:8px">
      <van-progress :percentage="0" />
    </div>
    <van-steps :active="active">
      <van-step>主规格填写</van-step>
      <van-step>详情填写</van-step>
      <van-step>次规格填写</van-step>
      <van-step>详情填写</van-step>
    </van-steps>
    <div v-if="step == 's1'">
      <van-cell-group>
        <div>
          <van-field v-model="tree_s1.k"
                     required
                     clearable
                     label="规格名称(主)"
                     right-icon="question"
                     placeholder="请输入规格名称(例如:口味)"
                     @click-right-icon="$toast('question')" />
        </div>
        <div v-for="(tree, index) in v"
             :key="index">
          <van-swipe-cell :right-width="50"
                          :left-width="65"
                          style="margin-top:10px">
            <van-button type="warning"
                        slot="left"
                        @click="clearTree_name(index)"
                        :block="true"
                        style="margin:0 auto">清空</van-button>
            <van-field v-model="v[index].name"
                       :label="tree_v_name(index)"
                       placeholder="请输入规格详情(例如:抹茶)"
                       required
                       clearable />
            <!-- <span slot="right">删除</span> -->
            <van-button type="danger"
                        slot="right"
                        @click="v.splice(index, 1)"
                        :block="true"
                        style="margin:0 auto">删除</van-button>
          </van-swipe-cell>

          <van-swipe-cell :right-width="65"
                          :left-width="65">
            <van-button type="warning"
                        slot="left"
                        @click="clearTree_imgUrl(index)"
                        :block="true"
                        style="margin:0 auto">清空</van-button>

            <van-field v-model="v[index].imgUrl"
                       :label="tree_v_imgUrl(index)"
                       placeholder="请左向滑动来上传图片"
                       ref="uploadField"
                       @focus="confirm_photoIndex(index)"
                       required
                       clearable>
            </van-field>
            <!-- <input style="width: 200px;"
                   ref="fileInput"
                   type="file"
                   accept="image/*" /> -->
            <van-uploader slot="right"
                          :after-read="onRead"
                          ref="uploader"
                          accept="image/gif, image/jpeg">
              <van-icon v-show="upload"
                        name="photograph"
                        size="40px" />
              <!-- <img ref="photograph"
                   style="width: 200px"> -->
            </van-uploader>
          </van-swipe-cell>
        </div>
      </van-cell-group>
    </div>
    <div v-if="step == 's2'">
      <van-cell-group>
        <div>
          <van-field v-model="tree_s2.k"
                     required
                     clearable
                     label="规格名称(次)"
                     right-icon="question"
                     placeholder="请输入规格名称(例如:大小)"
                     @click-right-icon="$toast('question')" />
        </div>
        <div v-for="(tree, index) in v"
             :key="index">
          <van-swipe-cell :right-width="50"
                          :left-width="65"
                          style="margin-top:10px">
            <van-button type="warning"
                        slot="left"
                        @click="clearTree_name(index)"
                        :block="true"
                        style="margin:0 auto">清空</van-button>
            <van-field v-model="v[index].name"
                       :label="tree_v_name(index)"
                       placeholder="请输入规格详情(例如:大包(12个))"
                       required
                       clearable />
            <!-- <span slot="right">删除</span> -->
            <van-button type="danger"
                        slot="right"
                        @click="v.splice(index, 1)"
                        :block="true"
                        style="margin:0 auto">删除</van-button>
          </van-swipe-cell>
        </div>
      </van-cell-group>
    </div>
    <van-swipe-cell :right-width="65"
                    :left-width="85">
      <van-button type="danger"
                  slot="left"
                  @click="continue_add"
                  :block="true"
                  style="margin:0 auto">继续添加</van-button>
      <div style="text-align:center">
        <van-icon slot="icon"
                  v-if="!loading"
                  :color="icon_color"
                  :name="icon_name"
                  size="30px"
                  @click="control_Tree" />
        <van-loading slot="icon"
                     v-if="loading" />
      </div>
      <van-button type="primary"
                  slot="right"
                  @click="finish_add"
                  :block="true"
                  style="margin:0 auto">完成</van-button>
    </van-swipe-cell>
  </div>
</template>

<script>
import { Upload } from "../../api/upload.js";

export default {
  data () {
    return {
      photoIndex: 99,
      loading: false,
      active: 0,
      step: "s1",
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
  computed: {
    user() {
      return this.$store.state.user.id
    }
  },
  methods: {
    confirm_photoIndex (index) {
      // this.$refs.uploader.focus
      console.log(this.$refs.uploader[index])
      // this.$refs.uploader[index].$refs.input.click()
      this.$refs.uploader[index].$el.lastChild.click()
      // this.$refs.uploader[index].getElementsByClassName('van-uploader__input').click()
      // this.$refs.uploader[index].$el.getElementsByClassName('van-uploader__input').click()
      // this.$refs.uploader[index].click()
      // this.$refs.fileInput[index].click()
      this.photoIndex = index
      console.log(index)
    },
    onRead (file) {
      console.log(file)
      let params = new FormData(); //创建form对象
      params.append("file", file.file); //通过append向form对象添加数据//第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      // console.log(params.get("file"));
      this.$dialog
        .confirm({
          title: "再次确认'图片-" + (this.photoIndex + 1) + "'的上传",
          message: "是否上传此图片?"
        })
        .then(() => {
          this.loading = true
          // on confirm
          Upload(this.user(), params).then(response => {
            // this.$refs.photograph.src = response.data
            this.v[this.photoIndex].imgUrl = response.data
            console.log(response.data)
            this.upload = false
            this.loading = false
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    control_Tree () {
      if (this.icon_name == "add-o") {
        if (this.active == 0 || this.active == 1) {
          if (this.tree_s1.k == '') {
            this.$toast({ message: '你要填东西呀,大哥!', duration: 300 })
          } else {
            this.v.push({ imgUrl: "", name: "" })
            this.active = 1
          }
        }
        if (this.active == 2 || this.active == 3) {
          if (this.tree_s2.k == '') {
            this.$toast({ message: '你要填东西呀,大哥!', duration: 300 });
          } else {
            this.v.push({ imgUrl: "", name: "" })
            this.active = 3
          }
        }
      }
      if (this.icon_name == "passed") {
        this.$dialog
          .confirm({
            title: "再次确认框",
            message: "是否确认此页资料?"
          })
          .then(() => {
            // on confirm
            if (this.step == "s1") {
              this.active = 2
              this.tree_s1.v = this.v
              this.v = []
              this.step = "s2"
              this.continue_add()
              console.log(this.tree_s1)
            } else {
              this.tree_s2.v = this.v
              this.v = []
              console.log(this.tree_s2)
              console.log(this.tree_s1)
              this.finish()
            }
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    clearTree_name (index) {
      this.v[index].name = "";
    },
    clearTree_imgUrl (index) {
      this.v[index].imgUrl = "";
    },
    tree_v_name (index) {
      return "规格详情-" + (index + 1);
    },
    tree_v_imgUrl (index) {
      return "图片-" + (index + 1);
    },
    finish_add () {
      this.icon_name = "passed";
      this.icon_color = "green";
    },
    continue_add () {
      this.icon_name = "add-o";
      this.icon_color = "red";
    },
    finish () {
      this.$store.dispatch('AddTree_S1', this.tree_s1).then(res => {
        console.log("S1")
        console.log(res)
        this.$store.dispatch('AddTree_S2', this.tree_s2).then(res => {
          console.log("S2")
          console.log(res)
          this.$router.push({ path: '/admin/addSkulist' })
        })
      })
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

