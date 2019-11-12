<template>
  <div class="upsell">

    <div class="upsell--top row align-items-center">

      <!-- count down -->
      <div class="col-sm-5 pb-3">
        <div class="upsell--countdown">
          <div class='upsell--countdown__item'>--<br/>Hours </div>
          <div class='upsell--countdown__item'>--<br/>Minute </div>
          <div class='upsell--countdown__item'>--<br/>Seconds </div>
        </div>
      </div>

      <div class="col-sm-7 font-bold text-sm-right pb-3">
        <h5><strong>Act Fast: This offer is not available elsewhere on our store!</strong></h5>
      </div>
      
    </div>

    <hr class="border-light" />

    <div class="py-4">

      <h4 class="text-center">LAST STEP: FIRST-CUSTOMER SPECIAL GIFT!</h4>

      <div class="progress position-relative">
        <div class="position-absolute bg-transparent" style="left: 50%; transform: translateX(-50%);">75% Complete</div>
        <div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" style="width: 75%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
      </div>

    </div>

    <hr class="border-light" />

    <div class="py-3 px-2 text-center" style="background: #efefef">

      <h2 class="h1"><strong>Wait <span class="text-red">Hoshino</span>! Do You Want to Get Another Dragonfly Blanket at <span class="text-red">70% OFF?</span></strong></h2>

      <h3><strong>You'll Never See This Offer Again!</strong></h3>
      
    </div>

    <div class="text-center py-5 px-sm-5">

      <h3><strong>Pick ONE of These Quilts and Get Instant <span class="text-red">70% OFF!</span></strong></h3>

      <p class="h5 px-sm-5">This offer is a special gift for our <strong>First-Time Customer.</strong> Thank you for supporting us and becoming our awesome customer :)</p>
      
    </div>

    <!-- product -->
    <div class="row upsell__product">

      <div v-for="i in 2" class="col-sm-6">

        <div class="border rounded p-4 text-center upsell__product--content">

          <p class="h5 text-uppercase">get this quilt at 70% off</p>

          <img class="pt-4" src="https://images.unsplash.com/photo-1571419816020-fcb3d260164d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60">

          <h5 class="pt-3 pb-4"><strong>Dragonfly TL060522 Quilt Blanket</strong></h5>

          <ul class="list-unstyled">
            <li><i class="fas fa-circle pr-3" style="font-size: 6px"></i> <strong>Handmade Item and Made To Order!</strong></li>
            <li><i class="fas fa-circle pr-3" style="font-size: 6px"></i> <strong>Handmade Item and Made To Order!</strong></li>
            <li><i class="fas fa-circle pr-3" style="font-size: 6px"></i> <strong>Five Size Available:</strong> Throw, Twin, Queen, King and California/Super King!</li>
            <li><i class="fas fa-circle pr-3" style="font-size: 6px"></i> <strong>Made with Kona Cotton,</strong> a little bit microfiber and <strong>so much love</strong> ?</li>
          </ul>

          <div class="py-3">
            <span class="h4 mr-2 text-grey" style="text-decoration: line-through;">$139.90</span>
            <span class="h4">$41.90</span>
          </div>

          <p class="h3 text-red">70% OFF</p>

          <div class="py-2 row justify-content-center upsell__product--size">
            <div class="col-sm-6">
              <div class="text-left text-muted">Size:</div>
              <select class="w-100 text-muted" style="outline: none">
                <option>Queen</option>
              </select>
              <i class="upsell__product--size__icon fa fa-chevron-down float-right"></i>
            </div>
          </div>

          <button class="btn bg-green text-white w-100 p-3 my-3">
            <h4>Yes, Add To My Order</h4>
            <span>We will ship it using DHL Express</span>
          </button>

          <img height="80px" src="@/assets/credit-card.png">

          <div class="text-sm mt-3">
            <router-link :to="{name: 'payment.successful'}" class="text-grey"><small>No thanks, I don't want to take this one-time offer for first-time customer.</small></router-link>
          </div>
          
        </div>
        
      </div>
      
    </div>

  </div>
</template>

<script>

export default {

  created() {

    this.countDown();

  },

  methods: {

    countDown() {

      // Set the date we're counting down to
      let countDownDate = (new Date()).getTime() + 30*60*1000;

      // Update the count down every 1 second
      let x = setInterval(() => {

        // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let hours = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        $(this.$el).find('.upsell--countdown').html("<div class='upsell--countdown__item'>" + hours +"<br/>Hours </div>  <div class='upsell--countdown__item'>" + minutes + "<br/>Minute </div> <div class='upsell--countdown__item'>" + seconds + "<br/>Seconds </div>");

        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x);
          $(this.$el).find('.upsell--countdown').html("<div class='upsell--countdown__item'>--<br/>Hours </div><div class='upsell--countdown__item'>--<br/>Minute </div><div class='upsell--countdown__item'>--<br/>Seconds </div>");
        }

      }, 1000);

    }

  }

}
</script>

<style lang="scss">
.upsell {

  &--countdown__item {
    display: inline-block;
    text-align: center;
    background: #ce3362;
    min-width: 100px;
    padding: 5px;
    color: white;
    margin-right: 3px;
  }

  .text-red {
    color: #fe2905;
  }

  .text-grey {
    color: #a2a3a7;
  }

  .bg-green {
    background: #28ac1e;
  }

  &__product {

    &--content {
      ul > li {
        line-height: 28px;
      }
    }

    &--size {

      select {
        background: transparent;
        border-radius: 3px;
        padding: 5px;
        -webkit-appearance: none;
        -moz-appearance: none;
        -o-appearance: none;
        appearance: none; 
      }

      &__icon {
        margin-top: -25px;
        margin-right: 8px;
      }
    }
  }

}

</style>