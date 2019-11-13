import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import options from '../options.json'
import hiweb from 'lite-store-vue-base'

// Bootstrap
require('bootstrap');

Vue.use(hiweb, {
	store,
	options
});

Vue.use(require('vue-moment'));

Vue.config.productionTip = false

// Global jquery
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

// Nice select
require('@/assets/nice-select/jquery.nice-select.min.js');
require('@/assets/nice-select/nice-select.css')

// Global components
import Breadcrumb from '@/components/Breadcrumb';
import ProductBox from '@/components/ProductBox';
import Loader from '@/components/Loader';

Vue.component('product-box', ProductBox);
Vue.component('breadcrumb', Breadcrumb);
Vue.component('loader', Loader);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
