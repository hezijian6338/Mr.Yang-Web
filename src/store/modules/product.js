const product = {
  state: {
    product_id: '',
    tree_s1: {
      "_id": "1",
      "k": "口味",
      "v": [{
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
    },
    tree_s2: {
      "_id": "2",
      "k": "数量",
      "v": [{
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
    skulist: [],
    sku: {},
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
    }
  }
}
export default product