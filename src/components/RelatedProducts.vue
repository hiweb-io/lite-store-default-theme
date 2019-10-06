<template>
  <div class="related-products" v-if="search">
    <h3 v-if="relatedProductsJsonApi && typeof relatedProductsJsonApi.document.data !== 'undefined' && relatedProductsJsonApi.document.data.length" class="mb-3">You may also like:</h3>

    <template v-if="relatedProducts.data.length">
      <div class="row">

        <div :class="'col-6 mb-3 col-lg-' + size" v-for="product in relatedProductsJsonApi.document.data">
          <product-box :product="product" :variant="relatedProductsJsonApi.findRelationshipResource(product, 'variants')" :image="relatedProductsJsonApi.findRelationshipResource(product, 'image')" />
        </div>

        <loader v-if="isLoading" />
        <div v-else class="col-12 text-center">
          <span v-if="!over" style="color: #0984e3; cursor: pointer;" @click="page = page + 1">Load more</span>
        </div>

      </div>
        
    </template>

  </div>
</template>

<script type="text/javascript">
import base from 'lite-store-vue-base';

export default {

  name: 'related-products',

  props: {
    size: {
      type: String,
      default: '3'
    }
  }
  ,

  mixins: [base.mixins.components.relatedProducts]

}
</script>