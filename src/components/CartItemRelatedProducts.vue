<template>
  <div class="container">
    <div class="row">
      <div class="col-12" v-if="isLoading">
        <loader />
      </div>

      <div v-else class="col-12 mt-5">
        <RelatedProducts :search="searchString" :size="size" :limit="limit" />      
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import base from 'lite-store-vue-base';
import RelatedProducts from '@/components/RelatedProducts';

export default {

  props: {

    size: {
      type: String,
      default: '3'
    },

    limit: {
      type: String,
      default: '8'
    }

  },

  mixins: [base.mixins.components.cartItems],

  components: { RelatedProducts }

}
</script>
