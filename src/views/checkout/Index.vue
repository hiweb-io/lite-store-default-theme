<template>
  <div id="checkout" class="pt-2 pb-5 mb-5">
    
    <div class="container checkout__logo mb-2">
      <img :src="logo" style="height: 50px" />
    </div>

    <div class="checkout__reserve-message text-center">
      Your order will be reserved for: <span class="checkout__reserve-message__countdown">--:--</span>
    </div>

    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6">

          <h3>Checkout</h3>

          <div class="checkout__shipping-address">
            
            <h5 class="mt-4 mb-3">Shipping address</h5>
            
            <!-- Email -->
            <input type="text" class="form-control form-control-lg mb-3" placeholder="Email" v-model="email" />

            <!-- Full name -->
            <input type="text" class="form-control form-control-lg mb-3" placeholder="Full name" v-model="fullName" />

            <!-- Address -->
            <input type="text" class="form-control form-control-lg mb-3" placeholder="Address" v-model="address" />

            <!-- Country -->
            <select class="form-control form-control-lg" v-model="countryCode">
              <option v-for="countryName, countryCode in countries" :value="countryCode">{{ countryName }}</option>
            </select>

            <!-- City, state, zip -->
            <div class="row mt-3">

              <!-- City -->
              <div class="col-4" style="padding-right: 5px;">
                <input type="text" class="form-control form-control-lg" placeholder="City" v-model="city" />
              </div>

              <!-- State / Province -->
              <div class="col-4" style="padding-left: 5px; padding-right: 5px;">
                <div v-if="countryCode === 'US'">
                  <select v-model="province" class="form-control form-control-lg">
                    <option v-for="stateName, stateCode in usStates" :value="stateCode">{{ stateName }}</option>
                  </select>
                </div>
                <div v-else-if="countryCode === 'CA'">
                  <select v-model="province" class="form-control form-control-lg">
                    <option v-for="provinceName, provinceCode in caProvinces" :value="provinceCode">{{ provinceName }}</option>
                  </select>
                </div>
                <input v-else type="text" class="form-control form-control-lg" placeholder="State / Province" v-model="province" />
              </div>

              <!-- Zip -->
              <div class="col-4" style="padding-left: 5px">
                <input type="text" class="form-control form-control-lg" placeholder="Zip/Postal Code" v-model="zip" />
              </div>

            </div>

          </div>

          <div class="checkout__payment mt-5 mb-3">
            <div class="row">

              <div class="col-6 pt-1">
                <h5 class="">Payment information</h5>
              </div>
              <div class="col-6 text-right">
                <img class="ml-3" style="height:30px;" :src="require('@/assets/icons/ssl.svg')" />
                <img class="ml-3" style="height:30px;" :src="require('@/assets/icons/norton.png')" />
              </div>

            </div>

            <div class="accordion mt-3" id="payment-methods">

              <loader v-if="isLoadingPaymentAccounts" />

              <template v-else>

                <!-- Payment accounts -->
                <template v-if="paymentAccounts.length" v-for="paymentAccount in paymentAccounts">
                  
                  <div v-if="paymentAccount.attributes.paygate === 'stripe'" class="card">
                    <div class="card-header row" id="stripe-collapse">
                      <div class="col-md-6">
                        <h2 class="mb-0" @click="paymentMethod = 'stripe'">

                          <input class="form-check-input" type="radio" v-model="paymentMethod" value="stripe" />

                          <button class="btn btn-link" type="button" aria-expanded="false">
                            Card
                          </button>
                        </h2>
                      </div>
                      <div class="col-md-6 text-right pt-2">
                        <img style="height:20px;" class="mr-2" :src="require('@/assets/icons/visa.svg')" />
                        <img style="height:20px;" class="mr-2" :src="require('@/assets/icons/amex.svg')" />
                        <img style="height:20px;" class="mr-2" :src="require('@/assets/icons/master.svg')" />
                        <img style="height:20px;" class="mr-2" :src="require('@/assets/icons/discover.svg')" />
                      </div>
                    </div>

                    <div v-if="paymentMethod === 'stripe'" id="stripe-payment" class="collapse show">
                      <div class="card-body">
                        This payment method is not ready yet, please use another payment method.
                      </div>
                    </div>
                  </div>

                  <div v-if="paymentAccount.attributes.paygate === 'paypal'" class="card">
                    <div class="card-header row" id="paypal-collapse">
                      <div class="col-md-6">
                        <h2 class="mb-0" @click="paymentMethod = 'paypal'">

                          <input class="form-check-input" type="radio" v-model="paymentMethod" value="paypal" />
                            
                          <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#paypal-payment" aria-expanded="false" aria-controls="paypal-payment">
                            PayPal
                          </button>
                        </h2>
                      </div>
                      <div class="col-md-6 text-right pt-2">
                        <img style="height: 20px" :src="require('@/assets/icons/paypal.png')" />
                      </div>
                    </div>
                  </div>

                </template>
                <!-- End payment accounts -->

                <!-- No payment accounts -->
                <template v-if="!paymentAccounts.length">
                  <div class="card">
                    <div class="card-body text-center">
                      No payment methods available
                    </div>
                  </div>
                </template>

              </template>

            </div>
            
          </div>

          <div class="alert alert-danger" v-if="addressErrors.length">
            <p v-for="error in addressErrors">{{ error.title }}</p>
          </div>

          <button :disabled="isPlacingOrder || isLoadingPaymentAccounts" class="checkout__submit btn btn-lg btn-block btn-success mt-5" @click="placeOrder">
            <template v-if="isPlacingOrder">Placing Your Order</template>
            <template v-else>Place Your Order</template>
          </button>
          <p class="text-center mt-3">By placing your order, you agree to our <a href="/pages/terms" target="_blank">terms of service</a></p>

        </div>
        <div class="col-md-5 offset-md-1">
          
          <div id="order-summary" v-if="cart">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">
                  Order Summary
                </h5>
              </div>

              <div id="collapseOne" class="collapse show" data-parent="#accordion">
                <div class="card-body">
                  <CartItems />
                </div>
              </div>

              <div class="card-footer">
                <div class="row">
                  <div class="col-6">Subtotal:</div>
                  <div class="col-6 text-right">{{ $hiwebBase.currency.formatted($hiwebBase.cart.subTotalPrice()) }}</div>
                </div>
                <div class="row">
                  <div class="col-6">Shipping:</div>
                  <div class="col-6 text-right">{{ $hiwebBase.currency.formatted(cart.data.attributes.shipping_fee) }}</div>
                </div>
                <div class="row">
                  <div class="col-6">Discount:</div>
                  <div class="col-6 text-right">{{ $hiwebBase.currency.formatted(cart.data.attributes.discount) }}</div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-6"><h4>Total:</h4></div>
                  <div class="col-6 text-right"><h4>{{ $hiwebBase.currency.formatted(cart.data.attributes.total) }}</h4></div>
                </div>
              </div>

            </div>
          </div>
          
          <div v-if="cart" class="checkout__related-products">
            <CartItemRelatedProducts size="6" />
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/javascript">
import base from 'lite-store-vue-base';
import $ from 'jquery';

import CartItems from '@/components/CartItems';
import CartItemRelatedProducts from '@/components/CartItemRelatedProducts';

export default {

  mixins: [base.mixins.checkout.index],

  components: { CartItems, CartItemRelatedProducts },

  data() {

    return {

    };

  },

  created() {
    this.countDown();
  },

  methods: {

    countDown() {

      // Set the date we're counting down to
      let countDownDate = (new Date()).getTime() + 10*60*1000;

      // Update the count down every 1 second
      let x = setInterval(() => {

        // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        $(this.$el).find('.checkout__reserve-message__countdown').html(minutes + "m " + seconds + "s ");

        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x);
          $(this.$el).find('.checkout__reserve-message__countdown').html('--:--');
        }

      }, 1000);

    }

  },

  computed: {

    logo() {

      if (this.$store.state.options.options) {

        if (typeof this.$store.state.options.options.logo !== 'undefined') {
          return this.$store.state.options.options.logo;
        }

        return require('@/assets/logo.png');
        
      }

      return null;      

    }

  },

}
</script>

<style type="text/css" lang="scss">
#checkout {

  .checkout__reserve-message {
    background: #ffeabf;
    padding: 12px;
  }

  input, select {
    font-size: 16px;
    line-height: 32px;
  }

  #payment-methods .card-header {
    background-color: transparent;

    .btn-link {
      color: inherit;
    }
  }

  .accordion > .card:last-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0.125) !important;
  }

  #order-summary .cart-items .card {
    border: none;
    border-bottom: 1px solid #e6e6e6;

    &:last-child {
      border-bottom: none;
      margin-bottom: 0px !important;
    }
  }

  .form-check-input {
    position: initial;
    margin-left: 0px;
    vertical-align: middle;
  }

  .checkout__related-products {
    .col-12 {
      padding-left: 0px !important;
      padding-right: 0px !important;
    }
  }
}
</style>