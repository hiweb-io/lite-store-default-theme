<template>
  <div class="related-products" v-if="search">
    <h3 v-if="relatedProductsJsonApi && typeof relatedProductsJsonApi.document.data !== 'undefined' && relatedProductsJsonApi.document.data.length" class="mb-3 text-center">
      Our Picks For You
    </h3>

    <template v-if="relatedProducts.data.length">
      <slick
        ref="slick"
        :options="slickOptions"
        @afterChange="handleAfterChange"
        @beforeChange="handleBeforeChange"
        >
          <div v-for="product in relatedProductsJsonApi.document.data">
            <!-- <router-link :to="{ name: 'product.detail', params: { slug: product.attributes.slug } }"> -->
              <div v-if="useModal" class="product-box mb-3" @click="activeProduct = product">
                <div class="card">
                  <div class="product-box__preview">
                    <img :src="$hiwebBase.image.resize(product.attributes.preview, 360, true)" class="card-img-top" :alt="product.attributes.title">
                  </div>
                  <div class="card-body">
                    <h5 class="card-title text-center" :title="product.attributes.title"><a href="javascript:void;" style="cursor: pointer;">{{ product.attributes.title }}</a></h5>
                    <strong class="product-box__price text-center">{{ $hiwebBase.currency.formatted(product.attributes.min_price) }}</strong>
                  </div>
                </div>
              </div>

              <product-box v-else :product="product" :variant="relatedProductsJsonApi.findRelationshipResource(product, 'variants')" :image="relatedProductsJsonApi.findRelationshipResource(product, 'image')" />
            <!-- </router-link> -->
          </div>
      </slick>
      
      <div class="row">

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
import Slick from 'vue-slick';

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

  components: { ProductModal, Slick, },

  mixins: [base.mixins.components.relatedProducts],

  data() {

    return {
      activeProduct: null,
      slickOptions: {
        slidesToShow: 4,
        slidesToScroll: 4,
        // dots: true,
        infinite: false,
        speed: 300,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
        ]
      },
    };

  },
  
  created() {
  },

  methods: {

    close() {
      this.activeProduct = null;
    },

    next() {
        this.$refs.slick.next();
    },

    prev() {
        this.$refs.slick.prev();
    },

    reInit() {
        // Helpful if you have to deal with v-for to update dynamic lists
        let currIndex = this.$refs.slick ? this.$refs.slick.currentSlide() : 0;
        this.$refs.slick.destroy()
        this.$nextTick(() => {
            // this.$refs.slick.reSlick();
            this.$refs.slick.create()
            this.$refs.slick.goTo(currIndex, true)
        });
    },

    // Events listeners
    handleAfterChange(event, slick, currentSlide) {
      
        if (currentSlide == this.countProducts - 8 && this.currentLoadProducts == this.limit) {
            this.page++;
            this.loadRelatedProducts();
        }
    },
    handleBeforeChange(event, slick, currentSlide, nextSlide) {
        if (nextSlide == 0) {
            this.page++;
            this.loadRelatedProducts();
        }
    },

  }

}
</script>

<style type="text/css" lang="scss">

@import '../../node_modules/slick-carousel/slick/slick.css';

.related-products {
  .slick-slide{
    padding: 10px;
  }

  .slick-prev, .slick-next {
    font-size: 0;
    line-height: 0;
    position: absolute;
    top: 50%;
    display: block;
    width: 25px;
    height: 40px;
    padding: 0;
    -webkit-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    transform: translate(0, -50%);
    cursor: pointer;
    color: transparent;
    border: none;
    outline: none;
    background: #ffffff;
    z-index: 1;
    border-radius: 5px;
  }

  .slick-prev:before {
    font-family: "Font Awesome 5 Free" !important;
    content: "";
    display: inline-block;
    vertical-align: middle;
    font-weight: 600;
  }

  .slick-next:before {
    font-family: "Font Awesome 5 Free" !important;
    content: "";
    display: inline-block;
    vertical-align: middle;
    font-weight: 600;
  }

  .slick-next {
    right: 20px;
  }

  .slick-prev {
    left: 20px;
  }

  .slick-prev:before, .slick-next:before {
    font-family: 'slick';
    font-size: 20px;
    line-height: 1;
    opacity: .75;
    color: black;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
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