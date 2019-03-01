const getters = {
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  id: state => state.user.id,
  skulist: state => state.product.skulist,
  products: state => state.cart.products
}
export default getters