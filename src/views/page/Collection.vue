<template>
  <div id="pages">
    <loader v-if="isLoading" />

    <template v-else>
      <h1>Pages</h1>
      <hr />

      <template v-if="pagesJsonApi">
        <div class="row mb-3" v-for="page in pagesJsonApi.document.data">
          <div class="col-12">
            <h3><router-link :to="{ name: 'page.detail', params: { slug: page.attributes.slug } }">{{ page.attributes.title }}</router-link></h3>
            <p>{{ page.attributes.description }}</p>
          </div>
        </div>
        <Pagination :number-of-results="pagesJsonApi.document.data.length" :results-per-page="pageLimit" />
      </template>

    </template>
    
  </div>
</template>

<script type="text/javascript">
import base from 'lite-store-vue-base';

import Pagination from '@/components/Pagination';

export default {

  mixins: [base.mixins.page.collection],

  components: { Pagination }

}
</script>