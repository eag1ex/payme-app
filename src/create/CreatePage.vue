<template>
  <div id="template-create" class="bg-inverse m-2 p-3">
    <div class="w-100">
      <h1 class="md-headline mb-2">New Invoice</h1>
    </div>
    <form novalidate class="md-layout" @submit.prevent="validateInvoice">
      <md-field :class="getValidationClass('name')">
        <label>Name</label>
        <md-input
          name="full-name"
          id="full-name"
          autocomplete="given-name"
          v-model="form.name"
          :disabled="sending"
        />
        <span class="md-error" v-if="!$v.form.name.required">required</span>
      </md-field>

      <md-field :class="getValidationClass('value')">
        <label>Value</label>
        <span class="md-prefix">$</span>
        <md-input
          name="amount-value"
          id="amount-value"
          autocomplete="given-amount"
          v-model.number="form.value"
          :disabled="sending"
        />
        <span class="md-error" v-if="!$v.form.value.required">required</span>
      </md-field>

      <md-field>
        <label>
          <span class="md-caption">Date:&nbsp;{{niceDate(date)}}</span>
        </label>
      </md-field>

      <input v-model="date" type="hidden">
      <md-button type="submit" class="md-primary p-0 m-0" :disabled="sending">Create Invoice</md-button>
      <md-snackbar :md-active.sync="invoiceSaved">Invoice {{ lastInvoice }} saved!</md-snackbar>
    </form>
  </div>
</template>

<script>
import { filters } from "../libs/_services";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  name: "NewInvoice",
  mixins: [validationMixin],
  data: () => ({
    form: {
      name: null,
      value: null,
      date: null
    },
    invoiceSaved: false,
    sending: false,
    lastInvoice: null,
    value: 0,
    name: ""
    // date: null
  }),

  validations: {
    form: {
      name: {
        required
      },
      value: {
        required
      },
      date: {
        required
      }
    }
  },

  computed: {
    date: {
      get: () => {
        return new Date().getTime();
      }
    }
    // date() {
    //   this.date = new Date().getTime();
    // }
  },
  methods: {
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
      this.date = this.niceDate(new Date().getTime()); // non interctive value
    },
    saveInvoice() {
      this.sending = true;
      //console.log("sending invoice", `${this.form.name} ${this.form.value}`);
      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastInvoice = `${this.form.name}, $${this.form.value}`;
        this.invoiceSaved = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
    },
    validateInvoice() {
      this.form.date = this.date;

      this.$v.$touch();
      console.log("validateInvoice invoice", !this.$v.$invalid);
      if (!this.$v.$invalid) {
        this.saveInvoice();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.md-field:last-child {
  margin-bottom: 40px;
}
</style>