<template>
  <div class="related-products" v-if="search">
    <h3 v-if="relatedProductsJsonApi && typeof relatedProductsJsonApi.document.data !== 'undefined' && relatedProductsJsonApi.document.data.length" class="mb-3">You may also like:</h3>

    <template v-if="relatedProducts.data.length">
      <div class="row">

        <div :class="'col-6 mb-3 col-lg-' + size" v-for="product in relatedProductsJsonApi.document.data">

          <div v-if="useModal" class="product-box mb-3" @click="activeProduct = product">
            <div class="card">
              <div class="product-box__preview">
                <img :src="$hiwebBase.image.resize(product.attributes.preview, 360, true)" class="card-img-top" :alt="product.attributes.title">
              </div>
              <div class="card-body">
                <h5 class="card-title" :title="product.attributes.title"><a href="javascript:void;" style="cursor: pointer;">{{ product.attributes.title }}</a></h5>
                <strong class="product-box__price">{{ $hiwebBase.currency.formatted(product.attributes.min_price) }}</strong>
              </div>
            </div>
          </div>

          <product-box v-else :product="product" :variant="relatedProductsJsonApi.findRelationshipResource(product, 'variants')" :image="relatedProductsJsonApi.findRelationshipResource(product, 'image')" />

        </div>

        <loader v-if="isLoading" />
        <div v-else class="col-12 text-center">
          <span v-if="!over" style="color: #0984e3; cursor: pointer;" @click="page = page + 1">Load more</span>
        </div>

        <div class="related-product-modal" v-if="activeProduct">
          <div class="related-product-modal__fog" @click="activeProduct = null"></div>
          <div class="related-product-modal__modal">
            <div class="related-product-modal__modal__navigation">
              <div class="row">
                <div class="col-6">
                  <router-link :to="{ name: 'product.detail', params: { slug: activeProduct.attributes.slug } }" style="color: inherit">Go to product page</router-link>
                </div>
                <div class="col-6 text-right">
                  <span style="cursor: pointer;" @click="close">Close</span>
                </div>
              </div>
            </div>
            <div class="related-product-modal__modal__product">
              <ProductModal :slug="activeProduct.attributes.slug" />
            </div>
          </div>
        </div>

      </div>
        
    </template>

  </div>
</template>

<script type="text/javascript">
import base from 'lite-store-vue-base';
import ProductModal from '@/components/ProductModal';

export default {

  name: 'related-products',

  props: {
    size: {
      type: String,
      default: '3'
    },
    useModal: {
      type: Boolean,
      default: true
    }
  },

  components: { ProductModal },

  mixins: [base.mixins.components.relatedProducts],

  data() {

    return {
      activeProduct: null
    };

  },

  methods: {

    close() {
      this.activeProduct = null;
    }

  }

}
</script>

<style type="text/css" lang="scss">
.related-products {
  
  .product-box {
    cursor: pointer;
  }

  .related-product-modal {

    .related-product-modal__fog {
      background: rgba(0, 0, 0, 0.8);
      position: fixed;
      top: 0px;
      left: 0px;
      height: 100%;
      width: 100%;
      z-index: 10;
    }

    .related-product-modal__modal {
      position: fixed;
      z-index: 100;
      height: 80%;
      width: 80%;
      left: 10%;
      top: 10%;
      border-radius: 5px;
      background: white;

      @media(max-width: 768px) {
        width: 100%;
        left: 0px; 
      }

      .related-product-modal__modal__product {
        position: absolute;
        top: 0px;
        right: 0px;
        left: 0px;
        height: 100%;
        overflow: scroll;
        padding: 50px;

        @media(max-width: 768px) {
          padding: 20px;
          padding-top: 50px;
        }
      }

      .related-product-modal__modal__navigation {
        position: relative;
        width: 100%;

        .row {
          position: absolute;
          color: white;
          left: 0px;
          right: 0px;
          top: -30px;
          font-weight: bold;

          @media(max-width: 768px) {
            padding-left: 15px;
            padding-right: 15px;
          }
        }
      }

    }

  }
}
</style>