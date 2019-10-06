<template>
  <div id="cart">
    <loader v-if="!cart && isLoadingCart" />
    <div v-if="!cart && !isLoadingCart">
      <h3 class="text-center">Your cart is empty!</h3>
      <p class="text-center"><router-link to="/">Click here to go back</router-link></p>
    </div>
    <div v-if="cart" class="row">
      <div class="col-lg-6 col-md-6">
        <h3 class="mb-3">Your cart</h3>
        <CartItems />
      </div>
      <div class="col-lg-5 offset-lg-1 col-md-6 pt-5">

        <div class="card" style="background: #f7f8f9; padding-bottom: 20px;">
          <div class="card-body">
            
            <loader v-if="isLoadingCart" />

            <template v-else>
              <p>Shipping & Fees: <span style="float: right;">Calculated at checkout</span></p>
              <p>Discount: <span style="float: right">{{ $hiwebBase.currency.formatted(cart ? cart.data.attributes.discount : 0) }}</span></p>
              <hr />
              <h3 style="font-weight: 700; font-size: 1.25rem; line-height: 1.5;">Total: <span style="float: right;">{{ $hiwebBase.currency.formatted($hiwebBase.cart.subTotalPrice() - (cart ? cart.data.attributes.discount : 0)) }}</span></h3>
            </template>

            <div class="input-group mt-3">
              <input type="text" class="form-control" placeholder="I have a COUPON" v-model="coupon" @keyup.enter="$hiwebBase.cart.applyCoupon(coupon)" />
              <div class="input-group-append">
                <button class="btn btn-success" type="button" @click="$hiwebBase.cart.applyCoupon(coupon)">Apply</button>
              </div>
            </div>

            <p v-if="$hiwebBase.cart.getCoupon()" class="text-center mt-3">
              <span class="badge badge-success">{{ $hiwebBase.cart.getCoupon().attributes.code }}</span>
              {{ $hiwebBase.cart.getCoupon().attributes.description }}
              <span class="text-danger" @click="$hiwebBase.cart.update({ coupon_id: '' })" style="cursor: pointer">(X)</span>
            </p>

            <div style="width: 100%; position: relative; padding-top: 20px;">
              <a v-if="!isLoadingCart" class="btn btn-lg btn-primary btn-block" href="/checkout" style="margin-top: 0px; font-weight: 700; position: absolute; padding-left: 0px; padding-right: 0px; width: 100%; height: 55px; padding-top: 10px;">Proceed to Checkout</a>
            </div>
              

          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script type="text/javascript">
import base from 'lite-store-vue-base';

import CartItems from '@/components/CartItems';

export default {

  mixins: [base.mixins.cart.index],

  components: { CartItems },

  data() {

    return {
      coupon: ''
    }

  }

}
</script>