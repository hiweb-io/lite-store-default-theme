<template>
  
  <div id="product-detail">
    
    <div v-if="error">{{ error }}</div>

    <loader v-if="isLoading" />

    <!-- Product loaded -->
    <template v-if="!isLoading && productJsonApi">
      <div class="row">

        <div class="col-12" style="margin-top: -38px">
          <breadcrumb :jsonapi="productJsonApi" />
        </div>
          
        <!-- Images -->
        <div class="col-md-8">

          <Images :images="images" />

        </div>

        <!-- Product detail -->
        <div class="col-md-4">
          
          <!-- Product title -->
          <h1 class="product-detail__title">{{ productJsonApi.document.data.attributes.title }}</h1>

          <!-- Price -->
          <div v-if="activeVariant" style="margin-top: 0.1rem">
            <strong class="text-danger product-detail__price">{{ $hiwebBase.currency.formatted(activeVariant.attributes.price * qty) }}</strong>
            <template v-if="activeVariant.attributes.compare_at_price">
              <span class="ml-2 product-detail__compare-at-price">
                {{ $hiwebBase.currency.formatted(activeVariant.attributes.compare_at_price*qty) }}
              </span>
            </template>

            <!-- Timer mobile -->
            <div class="product-detail__timer pt-2 d-block d-sm-block d-md-none" v-if="activeVariantId">
              <!--<Timer />-->
              <!--<InStock :product-id="activeVariantId" min="2" max="15" />-->
            </div>

            <div v-if="activeVariant.attributes.compare_at_price">
              <span class="price-tag pr-3">{{ $hiwebBase.currency.formatted((activeVariant.attributes.compare_at_price - activeVariant.attributes.price) * qty) }} Saved</span>
            </div>

          </div>
          
          <div v-else>
            <strong class="text-danger" style="font-size: 32px; display: inline-block; font-weight: 700;">
              {{ $hiwebBase.currency.formatted(productJsonApi.document.data.attributes.min_price * qty) }}
            </strong>
            <template v-if="productJsonApi.document.data.attributes.min_price_compare_at">
              <span class="ml-2 product-detail__compare-at-price">
                {{ $hiwebBase.currency.formatted(productJsonApi.document.data.attributes.min_price_compare_at * qty) }}
              </span>
              <div>
                <span class="price-tag pr-3">{{ $hiwebBase.currency.formatted((productJsonApi.document.data.attributes.min_price_compare_at - productJsonApi.document.data.attributes.min_price) * qty) }} Saved</span>
              </div>
            </template>
          </div>

          <!-- Options -->
          <template v-for="i in 3">
            <div class="mt-3" v-if="productJsonApi.document.data.attributes['option' + i]">
              <Option :option="productJsonApi.document.data.attributes['option' + i]" :index="i" :variants="productJsonApi.findRelationshipResources(productJsonApi.document.data, 'variants')" />
            </div>
          </template>

          <!-- Qty -->
          <div class="product-detail__qty mt-3 mb-4">

            <div class="mb-3">
              <strong >Qty:</strong> <span class="ml-2 text-muted">{{ qty }}</span>
            </div>
            
            <div class="row">
              <div class="col-3">
                
                <select v-model="qty" class="" style="width: 80px">
                  <option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
                </select>

              </div>
              <div class="col-9">

              </div>
            </div>
                
          </div>

          <!-- Buy button -->
          <button class="btn btn-icon btn-3 btn-primary btn-lg btn-block mt-3 product-detail__add-to-cart" type="button" :disabled="addingToCart" @click="addToCartAndClose">
            <span v-if="!addingToCart" class="btn-inner--text">Buy It Now</span>
            <span v-else class="btn-inner--text">Adding to cart</span>
          </button>

          <!-- Badge -->
          <img :src="require('@/assets/icons/trusted-badge.webp')" class="mt-4" />

        </div>

        <!-- Product content -->
        <!--<div class="col-12 mt-5 product-detail__content">

          <div class="row">
            <div class="col-md-7">
                
              <ul class="nav nav-tabs mb-3">
                <li class="nav-item">
                  <span :class="'nav-link ' + (activeTab === 'detail' ? 'active' : '')" style="cursor: pointer;" @click="setActiveTab('detail')">Product detail</span>
                </li>
              </ul>

              <div v-if="activeTab === 'detail'">
                <article style="padding:10px" v-html="productJsonApi.document.data.attributes.content"></article>
              </div>

              <div v-if="activeTab === 'reviews'">
                <CustomerReviews />
              </div>

            </div>
          </div>
              

        </div>-->

        <div class="col-12 p-5">
          
          <!-- Product content -->
          <hr style="margin-top: 2rem;" />
          <h3 class="content-heading">Product detail</h3>
          <div v-if="productJsonApi.document.data.attributes.description" class="mb-3">
            <small class="text-muted">{{ productJsonApi.document.data.attributes.description }}</small>
          </div>
          <div v-html="productJsonApi.document.data.attributes.content"></div>

        </div>

      </div>
    </template>

  </div>

</template>

<script type="text/javascript">
import base from 'lite-store-vue-base';
import $ from 'jquery';

import Images from '@/views/product/detail-components/Images';
import Option from '@/views/product/detail-components/Option';

export default {

  mixins: [base.mixins.product.detail],

  components: { 
    Images, Option,
  },

  mounted() {
    this.activeNiceSelect();
  },

  methods: {

    // Nice select for qty btn
    activeNiceSelect() {

      $(document).ready(() => {
        
        let superObject = this;

        let findElement = setInterval(() => {

          let element = $(this.$el).find('.product-detail__qty select');

          if (!element.length) {
            return;
          }

          element.niceSelect();
          element.change(function() {
            superObject.qty = $(this).val();
          });

          clearInterval(findElement);

        }, 100);

        
      });

    },

    async addToCartAndClose() {

      // Add to cart
      if (!this.allOptionsSelected) {
        return this.optionsReminder();
      }

      if (!this.activeVariant || this.activeVariant.attributes.status !== 'available') {
        return this.outOfStock();
      }

      this.addingToCart = true;

      let error = null;

      let cartItem = await this.$hiwebBase.cart.add(this.activeVariant.id, this.qty).catch(error => {
        error = true;
      });

      this.addingToCart = false;

      // Dispatch event
      window.dispatchEvent(new Event('add-to-cart'));

      // Close the modal
      this.$parent.close();

      // Reload cart items
      this.$hiwebBase.event.$emit('reload-cart-items');
    }

  },

  watch: {

    slug: function() {
      this.activeNiceSelect();
    }

  }

}
</script>

<style type="text/css" lang="scss" scoped>
.swal2-close {
  z-index: 10000000;
}
#product-detail {

  .product-detail__title {
    font-weight: 500;
    font-size: 1.25rem;
    line-height: 1.5;
    text-rendering: optimizeSpeed;

    @media(max-width: 768px) {
      font-size: 1rem;
    }

  }

  .product-detail__price {
    font-size: 36px; 
    display: inline-block; 
    font-weight: 700;

    @media(max-width: 768px) {
      font-size: 1.5rem;
    }

  }

  .product-detail__compare-at-price {
    font-size: 1.5rem; 
    line-height: 1.5; 
    margin-left: .5rem; 
    font-weight: lighter; 
    text-decoration: line-through; 
    display: inline-block;

    @media(max-width: 768px) {
      font-size: 1.25rem;
    }

  }

  .product-detail__add-to-cart {
    height: 55px;
    font-weight: bolder;
  }

  .product-detail__timer {
    margin-top: 10px;
  }

  .nice-select {
    height: 50px;

    .current {
      line-height: 50px;
    }
  }

  hr {
    border-top: 1px solid #f0f2f3 !important;
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .content-heading {
    font-size: 1.25rem;
    line-height: 1.5;
    font-weight: 700;
    color: #2d3436;
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin: 0px !important;
  }

}
</style>