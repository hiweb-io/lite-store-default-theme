<template>
  <div id="page-detail">
    
    <loader v-if="isLoading" />

    <template v-if="pageJsonApi">
      
      <h1>{{ pageJsonApi.document.data.attributes.title }}</h1>
      <p>{{ pageJsonApi.document.data.attributes.description }}</p>
      <hr />

      <article v-html="pageJsonApi.document.data.attributes.content"></article>

    </template>

    <div v-if="pageJsonApi && pageJsonApi.document.data.attributes.show_contact_form">
      <hr />
      <ContactForm />
    </div>

  </div>
</template>

<script type="text/javascript">
import base from 'lite-store-vue-base';
import ContactForm from 'lite-store-vue-base/views/components/ContactForm';

export default {

  mixins: [base.mixins.page.detail],

  components: { ContactForm }

}
</script>

<style type="text/css">

.hiweb-contact-form input, .hiweb-contact-form textarea {
  margin: 0;
  max-width: 100%;
  -webkit-box-flex: 1;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  outline: 0;
  -webkit-tap-highlight-color: rgba(255,255,255,0);
  text-align: left;
  line-height: 1.21428571em;
  padding: .67857143em 1em;
  background: #fff;
  border: 1px solid rgba(34,36,38,.15);
  color: rgba(0,0,0,.87);
  border-radius: .28571429rem;
  -webkit-transition: border-color .1s ease,-webkit-box-shadow .1s ease;
  transition: border-color .1s ease,-webkit-box-shadow .1s ease;
  transition: box-shadow .1s ease,border-color .1s ease;
  transition: box-shadow .1s ease,border-color .1s ease,-webkit-box-shadow .1s ease;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.hiweb-contact-form__heading {
  padding: 0px 10px; 
}

.hiweb-contact-form__form__input, .hiweb-contact-form__form__errors, .hiweb-contact-form__form__success, .hiweb-contact-form__form__submit {
  display: inline-block;
  width: 50%;
  padding: 10px;
}

.hiweb-contact-form__form__input--message, .hiweb-contact-form__form__input input, .hiweb-contact-form__form__input textarea, .hiweb-contact-form__form__errors, .hiweb-contact-form__form__success {
  width: 100%;
}

.hiweb-contact-form__form__input textarea {
  height: 180px;
}

.hiweb-contact-form__form__submit__button {
  background-color: #f5f5f5;
  border-color: transparent;
  border-width: 1px;
  color: #363636;
  cursor: pointer;
  justify-content: center;
  padding-bottom: calc(.375em - 1px);
  padding: .75em;
  text-align: center;
  white-space: nowrap;
}
</style>