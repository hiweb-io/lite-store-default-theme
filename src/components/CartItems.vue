<template>
  <div class="row cart-items">

    <div class="col-12" v-if="isLoading">
      <loader />
    </div>

    <template v-else>

      <div style="width: 100%" v-if="!cartItemsJsonApi || !cart.data.relationships.cart_items.data.length">
        <loader v-if="!cartItemsJsonApi" />
        <p class="text-center" v-else>Your cart is empty!</p>
      </div>

      <div v-else v-for="cartItem, index in cartItemsJsonApi.document.data" class="card mb-3" style="width: 100%">

        <div class="card-body" style="position: relative; padding-bottom: 5px; padding-top: 12px;">
          <div class="row">

            <div class="col-4 col-md-3">
              <img :src="$hiwebBase.image.resize(findProduct(cartItem).attributes.preview, 300, true)" />
            </div>

            <div class="col-8 col-md-9">

              <router-link :to="{ name: 'product.detail', params: { slug: findProduct(cartItem).attributes.slug } }"><h5>{{ findProduct(cartItem).attributes.title }}</h5></router-link>
              <p class="mb-1">{{ getVariantTitle(cartItem) }}</p>
              
              <div class="row">
                <div class="col-sm-7">

                  <!-- Qty -->
                  <div style="display: inline; margin-right: 8px;">Qty:</div>
                  <div style="display: inline;">
                    <div class="cart-items__qty-button" @click="updateQty(findVariant(cartItem).id, parseInt(cartItem.attributes.quantity) - 1)" style="padding-left: 5px;">-</div>
                    <span class="cart-items__qty">
                      {{ cartItem.attributes.quantity }}
                    </span>
                    <div class="cart-items__qty-button" @click="updateQty(findVariant(cartItem).id, parseInt(cartItem.attributes.quantity) + 1)" style="padding-left: 3px;">+</div>
                  </div>

                </div>
                <div class="col-sm-5 text-right pt-3">
                    
                  <!-- Price -->
                  <p>

                    <small style="text-decoration: line-through;" class="text-muted" v-if="findVariant(cartItem).attributes.compare_at_price">
                      <!-- Compare at variant compare price -->
                      {{ $hiwebBase.currency.formatted(findVariant(cartItem).attributes.compare_at_price * cartItem.attributes.quantity) }}
                    </small>
                      
                    <span class="ml-2">{{ $hiwebBase.currency.formatted(cartItem.attributes.unit_price * cartItem.attributes.quantity) }}</span>

                  </p>

                </div>
              </div>              

            </div>

          </div>
          <i @click="deleteCartItem(cartItem.id)" class="fas fa-times" style="position: absolute; top: 15px; right: 15px; cursor: pointer;"></i>
        </div>

      </div>
      
    </template>

  </div>
</template>

<script type="text/javascript">
import base from 'lite-store-vue-base';

export default {

  mixins: [base.mixins.components.cartItems],

}
</script>

<style type="text/css" lang="scss" scoped>
.cart-items {

  a:hover {
    text-decoration: none;
  }

  h5 {
    color: #2d3436;
    font-size: 16px;
  }

  .cart-items__qty-button {
    border: 2px solid #b2bec3;
    color: #b2bec3;
    height: 20px;
    width: 20px;
    display: inline-block;
    border-radius: 10px;
    line-height: 16px;
    font-weight: bolder;
    overflow: hidden;
    vertical-align: middle;
    margin-top: -5px;
    cursor: pointer;
  }

  .cart-items__qty {
    font-size: 20px;
    font-weight: bolder;
    padding: 5px;
  }

}

</style>