import {
  BuyByCart
} from '../../api/cart'

const cart = {
  state: {
    products: []
  },
  mutations: {
    SET_PRODUCTS: (state, products) => {
      state.products = products
    }
  },
  actions: {
    Buy({
      commit
    }, products) {
      commit('SET_PRODUCTS', products)
      for (var i = 0; i < products.length; i++) {
        BuyByCart(products[i].id).then(res => {

        })
      }
    }
  }
}
export default cart