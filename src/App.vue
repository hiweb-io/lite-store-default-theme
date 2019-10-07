<template>
  <div id="app">

    <template v-if="$route.name !== 'checkout.index'">
      <Navbar />

      <div class="container pt-5">
        <router-view/>
      </div>

      <Footer />
    </template>
    <template v-else>
      <router-view />
    </template>

  </div>
</template>

<style lang="scss">
$success: #15cd72;
$primary: #0984e3;

@import '~bootstrap/scss/bootstrap.scss';
@import '~@fortawesome/fontawesome-free/css/all.min.css';
@import '@/assets/scss/app.scss';
</style>

<script type="text/javascript">
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import base from 'lite-store-vue-base';

export default {

  mixins: [base.mixins.app],

  components: { Navbar, Footer },

  created() {

  }

}
</script>