<template>
  <div>
    <van-cell title="请选择你的规格组合:"
              icon="goods-collect-o" />
    <van-checkbox-group v-model="result">
      <van-checkbox v-for="(item) in list"
                    :key="item.id"
                    :name="item">
        <!-- <p style="font-size:10px">{{item.s1}} -- {{item.s2}}</p> -->
        <p style="font-size:10px">{{item.id}}</p>
      </van-checkbox>
    </van-checkbox-group>
    <!-- {{result}} -->
    <div v-for="(item,index) in result"
         :key="item.id"
         :name="item"
         style="display: inline">
      <van-button type="default"
                  @click="selected(item,index)">{{item.id}}</van-button>
    </div>
    <van-number-keyboard :show="keyboardShow"
                         close-button-text="完成"
                         @blur="keyboardShow = false"
                         @input="onInput"
                         @delete="onDelete"
                         :z-index="3000" />
    <div>
      <van-dialog v-model="show"
                  show-cancel-button
                  @confirm="onClose">
        <van-field v-model="price"
                   label="商品价格"
                   @touchstart.native.stop="keyboardSelected('price')"
                   placeholder="请输入规格的价格详情(千分位,例:5000 = ¥50)"
                   required
                   clearable />
        <van-field v-model="stock_num"
                   label="商品库存数量"
                   @touchstart.native.stop="keyboardSelected('stock_num')"
                   placeholder="请输入规格的存货数量(整数)"
                   required
                   clearable />
      </van-dialog>
      {{result}}

    </div>
    <van-button type="default"
                @click="confirm">{{user}}</van-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      price: 0,
      stock_num: 0,
      show: false,
      keyboardShow: false,
      keyboardType: '',
      selectedIndex: 0,
      actions: [
        {
          name: '详细规格填写'
        }
      ],
      list: [],
      tree: {
        "price": 0,
        "s1": '',
        // "s1_name": '',
        "s2": "",
        // "s2_name": '',
        "s3": '',
        "stock_num": 0
      },
      result: [],
      treeV: {
        "id": "",
        "name": "",
        "imgUrl": ""
      },
      tree_s2: {
        // "_id": "2",
        // "k": "数量",
        // "v": [
        //   {
        //     "id": "large",
        //     "name": "大包(12)",
        //     "imgUrl": null
        //   },
        //   {
        //     "id": "mini",
        //     "name": "迷你装(5)",
        //     "imgUrl": null
        //   }
        // ],
        // "k_s": "s2"
      },
      tree_s1: {
        // "_id": "1",
        // "k": "口味",
        // "v": [
        //   {
        //     "id": "matcha",
        //     "name": "抹茶",
        //     "imgUrl": "http://hezijian6338.ddns.net:8833/mongodb/img/matcha_20190214114831.jpg"
        //   },
        //   {
        //     "id": "origin",
        //     "name": "原味",
        //     "imgUrl": "http://hezijian6338.ddns.net:8833/mongodb/img/origin_20190214112019.jpg"
        //   }
        // ],
        // "k_s": "s1"
      }
    }
  },
  created: function () {
    this.tree_s1 = this.$store.state.product.tree_s1
    this.tree_s2 = this.$store.state.product.tree_s2
    for (var i = 0; i < this.tree_s1.v.length; i++) {
      this.tree.s1 = this.tree_s1.v[i].id
      // this.tree.s1_name = this.tree_s2.v[i].name
      console.log(this.tree.s1)
      for (var j = 0; j < this.tree_s2.v.length; j++) {
        this.tree.s2 = this.tree_s2.v[j].id
        // this.tree.s2_name = this.tree_s2.v[j].name
        console.log(this.tree.s2)
        this.list.push({
          "id": this.tree_s2.v[i].name + '--' + this.tree_s2.v[j].name,
          "s1": this.tree.s1,
          // "s1_name": this.tree.s1_name,
          "s2": this.tree.s2,
          // "s2_name": this.tree.s2_name,
          "s3": '',
          "price": 0,
          "stock_num": 0
        })
      }
    }
    console.log(this.list)
  },
  computed: {
    user () {
      return this.$store.state.user.id
    }
  },
  methods: {
    keyboardSelected (field) {
      this.keyboardShow = true
      this.keyboardType = field
    },
    selected (item, index) {
      this.show = this.show == true ? false : true
      this.tree = item
      this.selectedIndex = index
    },
    onSelect (item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      Toast(item.name);
    },
    onInput (value) {
      if (this.keyboardType == 'price') {
        this.price = parseInt(this.price + '' + value)
      }
      if (this.keyboardType == 'stock_num') {
        this.stock_num = parseInt(this.stock_num + '' + value)
      }
    },
    onDelete () {
      if (this.keyboardType == 'price') {
        this.price = this.price + ''
        this.price = parseInt(this.price.substring(0, this.price.length - 1))
      }
      if (this.keyboardType == 'stock_num') {
        this.stock_num = this.stock_num + ''
        this.stock_num = parseInt(this.stock_num.substring(0, this.stock_num.length - 1))
      }
    },
    onClose () {
      this.result[this.selectedIndex].stock_num = this.stock_num
      this.result[this.selectedIndex].price = this.price
      this.stock_num = 0
      this.price = 0
      this.$toast(this.result[this.selectedIndex].s1)
    },
    confirm () {
      this.$store.dispatch('SetSkulist', this.result).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style>
.van-dialog {
  z-index: 2000;
}
</style>

