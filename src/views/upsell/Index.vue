<template>
  <div class="upsell">

    <div class="row align-items-center">

      <!-- count down -->
      <div class="col-sm-5">
        <div class="upsell--top">
          <div class="upsell--countdown">--:--:--</div>
        </div>
      </div>

      <div class="col-sm-7 font-bold text-sm-right">
        <h5><strong>Act Fast: This offer is not available elsewhere on our store!</strong></h5>
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
          $(this.$el).find('.upsell--countdown').html('--:--:--');
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
    min-width: 120px;
    padding: 5px;
    color: white;
  }

}

</style>