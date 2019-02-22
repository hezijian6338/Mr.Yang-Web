<template>
  <div>
    <div style="margin:8px">
      <van-progress :percentage="50" />
    </div>
    <van-cell title="请选择你的规格组合:"
              icon="goods-collect-o" />
    <van-checkbox-group v-model="result">
      <van-checkbox v-for="(item) in list"
                    :key="item.id"
                    :name="item">
        <p style="font-size:10px">{{item.id}}</p>
      </van-checkbox>
    </van-checkbox-group>
    <!-- {{result}} -->
    <div v-for="(item,index) in result"
         :key="item.id"
         :name="item"
         style="display: inline">
      <van-button type="primary"
                  @click="selected(item,index)">{{item.id}}</van-button>
      <!-- <van-cell-group>
        <van-cell title="价格">
          {{item.price}}
        </van-cell>
        <van-cell title="库存"
                  :value="item.stock_num" />
      </van-cell-group> -->
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
    </div>
    <div>
      <van-field v-model="sku.price"
                 label="商品默认价格"
                 @touchstart.native.stop="keyboardSelected('skuPrice')"
                 placeholder="请输入(千分位,例:5000 = ¥50)"
                 required
                 clearable />
      <van-field v-model="sku.stock_num"
                 label="商品默认库存数量"
                 @touchstart.native.stop="keyboardSelected('skuStock_num')"
                 placeholder="请输入规格的存货数量(整数)"
                 required
                 clearable />
      <van-cell-group>
        <van-cell title="是否隐藏规格选择">
          <van-switch v-model="sku.none_sku"
                      size="25px" />
        </van-cell>
        <van-cell title="是否隐藏剩余库存">
          <van-switch v-model="sku.hide_stock"
                      size="25px" />
        </van-cell>
      </van-cell-group>

    </div>
    <van-button type="default"
                @click="confirm">{{user}}</van-button>
    <!-- <router-link :to="'/admin/addTree'">
      <van-button size="small"
      @click="confirm"
                  type="default">完成~{{user}}</van-button>
    </router-link> -->
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
      selectedIndex: 99,
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
        "id": '',
        "name": '',
        "imgUrl": ''
      },
      tree_s2: {
      },
      tree_s1: {
      },
      sku: {
        "id": '',
        "tree": [
        ],
        "list": [
        ],
        "collection_id": '1',
        "stock_num": 0,
        "price": '',
        "none_sku": false,
        "hide_stock": false
      }
    }
  },
  created: function () {
    this.tree_s1 = this.$store.state.product.tree_s1
    this.tree_s2 = this.$store.state.product.tree_s2
    for (var i = 0; i < this.tree_s1.v.length; i++) {
      this.tree.s1 = this.tree_s1.v[i].id
      // this.tree.s1_name = this.tree_s2.v[i].name
      // console.log(this.tree.s1)
      for (var j = 0; j < this.tree_s2.v.length; j++) {
        this.tree.s2 = this.tree_s2.v[j].id
        // this.tree.s2_name = this.tree_s2.v[j].name
        // console.log(this.tree.s2)
        this.list.push({
          "id": this.tree_s1.v[i].name + '--' + this.tree_s2.v[j].name,
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
    // console.log(this.list)
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
      this.price = this.result[index].price
      this.stock_num = this.result[index].stock_num
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
      if (this.keyboardType == 'skuPrice') {
        this.sku.price = this.sku.price + '' + value
      }
      if (this.keyboardType == 'skuStock_num') {
        this.sku.stock_num = parseInt(this.sku.stock_num + '' + value)
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
      if (this.keyboardType == 'skuPrice') {
        this.sku.price = this.sku.price.substring(0, this.sku.price.length - 1)
      }
      if (this.keyboardType == 'skuStock_num') {
        this.sku.stock_num = this.sku.stock_num + ''
        this.sku.stock_num = parseInt(this.sku.stock_num.substring(0, this.sku.stock_num.length - 1))
      }
    },
    onClose () {
      if (this.selectedIndex == 99) {
        this.sku.price = this.price
        this.sku.stock_num = this.stock_num
      }
      this.result[this.selectedIndex].stock_num = this.stock_num
      this.result[this.selectedIndex].price = this.price
      this.stock_num = 0
      this.price = 0
      // this.$toast(this.result[this.selectedIndex].s1)
      this.selectedIndex = 99
    },
    confirm () {
      this.$store.dispatch('SetSkulist', this.result).then(res => {
        console.log('SetSkulist')
        console.log(res)
        this.$store.dispatch('SetSku', this.sku).then(res => {
          console.log('SetSku')
          console.log(res)
          this.$router.push({ path: '/admin/addGoods' })
        })
      })

    }
  }
}
</script>

<style>
.van-dialog {
  z-index: 2000;
}
.van-button {
  margin-right: 10px;
}
</style>

