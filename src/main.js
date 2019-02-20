import Vue from 'vue';
import {
  router
} from './config/router';
import './config/rem';
import App from './App.vue';
import VueLazyload from 'vue-lazyload'
import components from './config/components.js';
import {
  Dialog
} from 'vant';
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// import {
//   VueEditor
// } from "vue2-editor";
Vue.use(Dialog);
Vue.use(mavonEditor)
Vue.use(components);
// Vue.use(VueEditor);

Vue.use(VueLazyload)

new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
});