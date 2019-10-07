<template>
  <div class="related-products" v-if="search">
    <h3 v-if="relatedProductsJsonApi && typeof relatedProductsJsonApi.document.data !== 'undefined' && relatedProductsJsonApi.document.data.length" class="mb-3">You may also like:</h3>

    <template v-if="relatedProducts.data.length">
      <div class="row">

        <div :class="'col-6 mb-3 col-lg-' + size" v-for="product in relatedProductsJsonApi.document.data">

          <div class="product-box mb-3" @click="activeProduct = product">
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

        </div>

        <loader v-if="isLoading" />
        <div v-else class="col-12 text-center">
          <span v-if="!over" style="color: #0984e3; cursor: pointer;" @click="page = page + 1">Load more</span>
        </div>

        <div class="related-product-modal" v-if="activeProduct">
          <div class="related-product-modal__fog" @click="activeProduct = null"></div>
          <div class="related-product-modal__modal">
            <ProductModal :slug="activeProduct.attributes.slug" />
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
      background: rgba(0, 0, 0, 0.6);
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
      padding: 50px;
      overflow: scroll;

      @media(max-width: 960px) {
        padding: 20px;
        padding-top: 50px;
      }
    }
  }
}
</style>