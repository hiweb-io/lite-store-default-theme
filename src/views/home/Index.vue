<template>
  <div id="home">

    <!-- Show latest products -->
    <div v-if="productsJsonApi" class="row">
      <div class="col-md-3 col-6 mb-3" v-for="product in productsJsonApi.document.data">
        <product-box :product="product" :image="productsJsonApi.findRelationshipResource(product, 'image')" />
      </div>
    </div>
    <template v-else>
      <loader />
    </template>

  </div>
</template>

<script type="text/javascript">
import base from 'lite-store-vue-base';

export default {

  mixins: [base.mixins.home.index]

}
</script>