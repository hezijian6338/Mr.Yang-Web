import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import product from './modules/product'
import cart from './modules/cart'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    cart,
    product
  },
  getters
})

export default store