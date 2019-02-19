<template>
  <div>
    <van-checkbox-group>
      <!-- <van-checkbox v-for="(item, index) in list"
                    :key="index"
                    :name="index">
        <p style="font-size:10px">{{item.s1}} -- {{item.s2}}</p>
      </van-checkbox> -->
    </van-checkbox-group>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      tree: {
        "price": 0,
        "s1": "",
        "s2": "",
        "s3": "",
        "stock_num": 0
      },
      result: [{}],
      treeV: {
        "id": "",
        "name": "",
        "imgUrl": ""
      },
      tree_s2: {
        "_id": "2",
        "k": "数量",
        "v": [
          {
            "id": "large",
            "name": "大包(12)",
            "imgUrl": null
          },
          {
            "id": "mini",
            "name": "迷你装(5)",
            "imgUrl": null
          }
        ],
        "k_s": "s2"
      },
      tree_s1: {
        "_id": "1",
        "k": "口味",
        "v": [
          {
            "id": "matcha",
            "name": "抹茶",
            "imgUrl": "http://hezijian6338.ddns.net:8833/mongodb/img/matcha_20190214114831.jpg"
          },
          {
            "id": "origin",
            "name": "原味",
            "imgUrl": "http://hezijian6338.ddns.net:8833/mongodb/img/origin_20190214112019.jpg"
          }
        ],
        "k_s": "s1"
      }
    }
  },
  created: function () {
    for (var i = 0; i < this.tree_s1.v.length; i++) {
      this.tree.s1 = this.tree_s1.v[i].id
      for (var j = 0; j < this.tree_s2.v.length; j++) {
        this.tree.s2 = this.tree_s2.v[j].id
        this.list.push(this.tree)
      }
    }
    console.log(this.list)
  },
  methods: {
    selected (tree1, tree2) {
      this.treeV.s1 = tree1
      this.treeV.s2 = tree2
      return true
    }
  }
}
</script>
