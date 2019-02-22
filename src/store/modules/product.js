import {
  AddTree
} from '../../api/product'

const product = {
  state: {
    product_id: '',
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
          "_id": "5c6fa1516a002c2300c63ab4",
          "name": "大",
          "imgUrl": ""
        },
        {
          "_id": "5c6fa1516a002c2300c63ab5",
          "name": "中",
          "imgUrl": ""
        },
        {
          "_id": "5c6fa1516a002c2300c63ab6",
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
    SetSkulist({
      commit
    }, skulist) {
      return new Promise((resolve, reject) => {
        var list = []
        for (var i = 0; i < skulist.length; i++) {
          list.push(skulist[i].id)
        }
        commit('SET_SKULIST', list)
        resolve(list)
      }).catch(error => {})
    },
    SetSku({
      commit,
      state
    }, sku) {
      return new Promise((resolve, reject) => {
        sku.list = state.skulist
        sku.tree.push(state.tree_s1.id)
        sku.tree.push(state.tree_s2.id)
        commit('SET_SKU', sku)
        resolve(sku)
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