import {
  AddTree,
  AddSkulist,
  AddSku,
  AddGoods,
  AddProduct,
  UpdateProduct
} from '../../api/product'

const product = {
  state: {
    product_id: '',
    goods_id: '',
    tree_s1: {
      "id": "",
      "k": "",
      "v": [{
          "id": "",
          "name": "",
          "imgUrl": ""
        },
        {
          "id": "",
          "name": "",
          "imgUrl": ""
        }
      ],
      "k_s": "s1"
    },
    tree_s2: {
      "id": "",
      "k": "",
      "v": [{
          "id": "",
          "name": "",
          "imgUrl": ""
        },
        {
          "id": "",
          "name": "",
          "imgUrl": ""
        },
        {
          "id": "",
          "name": "",
          "imgUrl": ""
        }
      ],
      "k_s": "s2"
    },
    skulist: [],
    sku: {
      "id": "1",
      "tree": [
        "",
        ""
      ],
      "list": [
        "",
        "",
        "",
        ""
      ],
      "collection_id": "",
      "stock_num": 0,
      "price": "",
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
    },
    SET_NULL: (state) => {
      state.product_id = ''
      state.goods_id = ''
      state.tree_s1 = ''
      state.tree_s2 = ''
      state.sku = ''
    }
  },
  actions: {
    SetProduct({
      commit
    }, product) {
      return new Promise((resolve, reject) => {
        // product.goods_id = state.goods_id
        AddProduct(product).then(res => {
          commit('SET_PRODUCTID', res.data.id)
          resolve(res.data)
        }).catch(error => {

        })
      })
    },
    updateProduct({
      state
    }) {
      var updateFieldMap = {
        'goods_id': ''
      }
      updateFieldMap.goods_id = state.goods_id
      console.log(updateFieldMap)
      console.log(state.goods_id)
      console.log(state.product_id)
      UpdateProduct(state.product_id, updateFieldMap).then(res => {
        console.log(res)
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