<template>
  <div id="template-create"
class="bg-inverse m-2 p-3">
    <top-title :title="'New Invoice'" />
    <spinner :app-loading="loading" />
    <div v-if="!loading">
      <form novalidate
class="md-layout" @submit.prevent="validateInvoice">
        <div class="row w-100">
          <div class="col-2 d-none d-sm-none d-md-block">
            <div class="dollar">
              <p>$</p>
            </div>
          </div>

          <div class="col-sm-12 col-md-10 col-lg-10">
            <md-field :class="getValidationClass('name')">
              <label>Name</label>
              <md-input
                id="full-name"
                v-model="form.name"
                name="full-name"
                autocomplete="given-name"
                :disabled="sending"
              />
              <span v-if="!$v.form.name.required"
class="md-error">required</span>
            </md-field>

            <md-field :class="getValidationClass('value')">
              <label>Value</label>
              <span class="md-prefix">$</span>
              <md-input
                id="amount-value"
                v-model.number="form.value"
                name="amount-value"
                autocomplete="given-amount"
                :disabled="sending"
              />
              <span v-if="!$v.form.value.required"
class="md-error">required</span>
            </md-field>
            <md-field :class="getValidationClass('email')">
              <label>Email</label>

              <md-input
                id="alue"
                v-model="form.email"
                name="email"
                autocomplete="given-email"
                :disabled="sending"
              />
              <span v-if="!$v.form.email.required"
class="md-error">required</span>
            </md-field>

            <md-field>
              <label>
                <span class="md-caption">Date:&nbsp;{{ niceDate(date) }}</span>
              </label>
            </md-field>
          </div>
        </div>

        <md-card-actions class="pl-0">
          <md-button
            type="submit"
            class="md-primary p-0 ml-0 md-raised"
            :disabled="sending"
          >
Send Invoice
</md-button>
          <md-button class="md-secondary p-0 mx-3"
@click="goBack()">
Back
</md-button>
        </md-card-actions>
        <input v-model="date"
type="hidden">
        <md-snackbar :md-active.sync="invoiceSaved">
Invoice {{ lastInvoice }} saved!
</md-snackbar>
      </form>
    </div>
  </div>
</template>

<script>
/**
 * // NOTE
 * {CreateNewInvoice}
 * Create new invoice: available fields: name, value, email, and > date is geneated.
 * Data is validated with the help of {validationMixin} on each field, and send to the server
 * Uppon success on `created` from `this.$store.subscribe` you are redirected to `/lists` page
 *
 * {addInvoice}
 * this the the service which execuses the api call
 */

import { filters } from "../libs/_services";
import { validationMixin } from "vuelidate";
import { required, alpha, integer, email } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import { cloneDeep } from "lodash";
export default {
  name: "CreateNewInvoice",
  mixins: [validationMixin],
  data: () => ({
    form: {
      name: null,
      value: null,
      date: null,
      email: null
    },
    loading: true,
    invoiceSaved: false,
    sending: false,
    lastInvoice: null,
    date: new Date().getTime()
  }),

  validations: {
    form: {
      name: {
        required
        //   alpha < doenot accept spaces < dum
      },
      value: {
        required,
        integer
      },
      email: {
        required,
        email
      },
      date: {
        required
      }
    }
  },
  created: function() {
    this.loading = false;

    this.$store.subscribe(
      (mutation, state) => {
        if (mutation.type.includes("invoice/addInvoiceSuccess")) {
          this.$router.push("/list");
          /// reset vals
          this.lastInvoice = `${this.form.name}, $${this.form.value}`;
          this.invoiceSaved = true;
          this.sending = false;
          this.clearForm();
        }
        if (mutation.type.includes("invoice/addInvoiceFailure")) {
          this.sending = false;
          this.loading = false;
        }
      },
      err => {
        console.log("on subscribe err");
      }
    );
  },
  methods: {
    ...mapActions("invoice", {
      addInvoice: "addInvoice"
    }),
    goBack() {
      this.$router.push(`/list`);
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    niceDate(number) {
      return filters.niceDate(number);
    },
    clearForm() {
      this.$v.$reset();
      this.form.name = null;
      this.form.value = null;
      this.form.date = null;
      this.form.email = null;
      this.date = new Date().getTime(); // non interctive value
    },
    saveInvoice() {
      this.loading = true;
      setTimeout(() => {
        const data = cloneDeep(this.form);
        this.addInvoice(data);
        this.sending = true;
      }, 300);
    },
    validateInvoice() {
      this.form.date = this.date;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saveInvoice();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "CreatePage";
</style>

