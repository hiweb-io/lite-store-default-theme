import Vue from 'vue'
import Router from 'vue-router'

// Import view components
import Cart from '@/views/cart/Index';
import CollectionCollection from '@/views/collection/Collection';
import CollectionDetail from '@/views/collection/Detail';
import Home from '@/views/home/Index';
import PageCollection from '@/views/page/Collection';
import PageDetail from '@/views/page/Detail';
import PaymentSuccessful from '@/views/payment/Successful';
import PaymentCancelled from '@/views/payment/Cancelled';
import ProductCollection from '@/views/product/Collection';
import ProductDetail from '@/views/product/Detail';

// Import hiweb base
import hiweb from 'lite-store-vue-base';

Vue.use(Router)

// Get hiweb routes helper
const routes = hiweb.routes;

export default new Router({
  mode: 'history',
  scrollBehavior() {
    return {x: 0, y: 0}
  },
  base: process.env.BASE_URL,
  routes: [
    ...routes.routes({
      'cart.index': Cart,
      'collection.collection': CollectionCollection,
      'collection.detail': CollectionDetail,
      'home.index': Home,
      'page.collection': PageCollection,
      'page.detail': PageDetail,
      'payment.successful': PaymentSuccessful,
      'payment.cancelled': PaymentCancelled,
      'product.collection': ProductCollection,
      'product.detail': ProductDetail
    })
  ]
})
