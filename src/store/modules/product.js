import {
  AddTree,
  AddSkulist,
  AddSku,
  AddGoods,
  AddProduct
} from '../../api/product'

const product = {
  state: {
    product_id: '',
    goods_id: '',
    tree_s1: {
      "id": "5c6fa1516a002c2300c63ab3",
      "k": "口味",
      "v": [{
          "id": "5c6fa1516a002c2300c63ab1",
          "name": "麻辣",
          "imgUrl": "https://photostation.dragonsking.cn/mongodb/img/774ad515-61db-487c-9503-183116e52e59_20190222151313.jpg"
        },
        {
          "id": "5c6fa1516a002c2300c63ab2",
          "name": "黑暗料理",
          "imgUrl": "https://photostation.dragonsking.cn/mongodb/img/IMG_8223_20190222151344.jpg"
        }
      ],
      "k_s": "s1"
    },
    tree_s2: {
      "id": "5c6fa1516a002c2300c63ab7",
      "k": "盒装",
      "v": [{
          "id": "5c6fa1516a002c2300c63ab4",
          "name": "大",
          "imgUrl": ""
        },
        {
          "id": "5c6fa1516a002c2300c63ab5",
          "name": "中",
          "imgUrl": ""
        },
        {
          "id": "5c6fa1516a002c2300c63ab6",
          "name": "小",
          "imgUrl": ""
        }
      ],
      "k_s": "s2"
    },
    skulist: [],
    sku: {
      "id": "1",
      "tree": [
        "1",
        "2"
      ],
      "list": [
        "10",
        "11",
        "12",
        "13"
      ],
      "collection_id": "1",
      "stock_num": 99.0,
      "price": "59",
      "none_sku": false,
      "hide_stock": false
    },
  },
  mutations: {
    SET_PRODUCTID: (state, product_id) => {
      state.product_id = product_id
    },
    SET_GOODSID: (state, goods_id) => {
      state.goods_id = goods_id
    },
    SET_S1: (state, tree_s1) => {
      state.tree_s1 = tree_s1
    },
    SET_S2: (state, tree_s2) => {
      state.tree_s2 = tree_s2
    },
    SET_SKULIST: (state, skulist) => {
      state.skulist = skulist
    },
    SET_SKU: (state, sku) => {
      state.sku = sku
    }
  },
  actions: {
    SetProduct({
      commit,
      state
    }, product) {
      return new Promise((resolve, reject) => {
        product.goods_id = state.goods_id
        AddProduct(product).then(res => {
          commit('SET_PRODUCTID', res.data.id)
          resolve(res.data)
        }).catch(error => {

        })
      })
    },
    SetGoods({
      commit
    }, goods) {
      return new Promise((resolve, reject) => {
        AddGoods(goods).then(res => {
          commit('SET_GOODSID', res.data.id)
          resolve(res.data)
        })
      }).catch(error => {

      })
    },
    SetSku({
      commit,
      state
    }, sku) {
      return new Promise((resolve, reject) => {
        for (var i = 0; i < state.skulist.length; i++) {
          sku.list.push(state.skulist[i])
        }
        sku.tree.push(state.tree_s1.id)
        sku.tree.push(state.tree_s2.id)
        AddSku(sku).then(res => {
          commit('SET_SKU', res.data)
          resolve(res.data)
        })
      }).catch(error => {})
    },
    SetSkulist({
      commit
    }, skulist) {
      return new Promise((resolve, reject) => {
        var list = []
        for (var i = 0; i < skulist.length; i++) {
          AddSkulist(skulist[i]).then(res => {
            // console.log('skulist')
            var skulist_id = res.data
            list.push(skulist_id.id)
            // console.log(list)
          })
        }
        commit('SET_SKULIST', list)
        resolve(list)
      }).catch(error => {})
    },
    AddTree_S1({
      commit
    }, tree) {
      return new Promise((resolve, reject) => {
        AddTree(tree).then(res => {
          commit('SET_S1', res.data)
          resolve(res.data)
        })
      }).catch(error => {

      })
    },
    AddTree_S2({
      commit
    }, tree) {
      return new Promise((resolve, reject) => {
        AddTree(tree).then(res => {
          commit('SET_S2', res.data)
          resolve(res.data)
        })
      }).catch(error => {

      })
    }
  }
}
export default product