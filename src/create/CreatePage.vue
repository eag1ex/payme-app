<template>
  <div id="template-create" class="bg-inverse m-2 p-3">
    <top-title v-bind:title="'New Invoice'"></top-title>
    <spinner v-bind:appLoading="loading"></spinner>
    <div v-if="!loading">
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

        <md-card-actions class="pl-0">
          <md-button type="submit" class="md-primary p-0 ml-0 md-raised" :disabled="sending">Create</md-button>
          <md-button @click="goBack()" class="md-secondary p-0 mx-3">Back</md-button>
        </md-card-actions>
        <input v-model="date" type="hidden">
        <md-snackbar :md-active.sync="invoiceSaved">Invoice {{ lastInvoice }} saved!</md-snackbar>
      </form>
    </div>
  </div>
</template>

<script>
import { filters } from "../libs/_services";
import { validationMixin } from "vuelidate";
import { required, alpha, integer } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import { cloneDeep } from "lodash";
export default {
  name: "NewInvoice",
  mixins: [validationMixin],
  data: () => ({
    form: {
      name: null,
      value: null,
      date: null
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
        required,
        alpha
      },
      value: {
        required,
        integer
      },
      date: {
        required
      }
    }
  },
  created: function() {
    this.loading = false;

    this.$store.subscribe((mutation, state) => {
      if (mutation.type.includes("invoice/addInvoiceSuccess")) {
        this.$router.push("/list");
        /// reset vals
        this.lastInvoice = `${this.form.name}, $${this.form.value}`;
        this.invoiceSaved = true;
        this.sending = false;
        this.clearForm();
      }
    });
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
      this.date = new Date().getTime(); // non interctive value
    },
    saveInvoice() {
      this.addInvoice(cloneDeep(this.form));
      this.sending = true;
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
.md-card-actions {
  position: relative;
  top: 80px;
  left: -15px;
}

.md-field:last-child {
  margin-bottom: 40px;
}
</style>

