<template>
  <div id="template-list-item" class="bg-inverse m-2 p-3">
    <top-title v-bind:location="'/create'" v-bind:title="'Invoice Send'"></top-title>
    <spinner v-bind:appLoading="loading"></spinner>
    <md-card md-with-hover class="w-100" v-if="!loading && item">
      <div class="row">
        <div class="col-1 d-none d-sm-none d-md-block">
          <div class="dollar">
            <p>$</p>
          </div>
        </div>
        <div class="col-sm-12 col-md-11 col-lg-11">
          <md-ripple>
            <md-card-header>
              <div class="md-subhead">
                <span>For:</span>
                {{item.name}}
              </div>
              <div class="md-subhead">
                <span>Amount:</span>
                ${{printValue(item.value)}}
              </div>
              <div class="md-subhead">
                <span>Email:</span>
                {{item.email}}
              </div>
              <div class="md-subhead for-date">
                <span>Date:</span>
                {{niceDate(item.date)}}
              </div>
            </md-card-header>
          </md-ripple>
        </div>
      </div>

      <md-card-actions md-alignment="space-between" class="pl-0">
        <md-button @click="goBack()" class="md-secondary p-0 ml-0 md-raised">back</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
/**
 * // NOTE
 * {ListItemPage}
 * this page/route with target: this.$route.params >{name:id}, and match agains our already aquired invoice data
 * and display that match item on the page.
 * - will look into route resolver, there maybe a way to resolve each item/route before it is being displayed.
 *   Just like in Angular 2+
 *
 */

import { filters } from "../libs/_services";
import { mapState, mapActions } from "vuex";
import { isEmpty } from "lodash";

export default {
  name: "ListItemPage",
  data: () => ({
    item: {
      name: null,
      value: null,
      date: null,
      email: null
    },
    loading: true
    //
  }),

  computed: {
    ...mapState({
      invoice: state => state.invoice
    }),
    date: {
      get: () => {
        return new Date().getTime();
      }
    }
  },
  created: function() {
    const id = Number(this.$route.params.name);
    const hasResults = !isEmpty(this.invoice.all);
    const invoices = hasResults ? this.invoice.all.invoices : [];
    const newItem = invoices.reduce((n, item, inx) => {
      if (id === Number(item.id)) {
        n = item;
      }
      return n;
    }, {});

    if (!isEmpty(newItem)) {
      this.item = newItem;
      this.loading = false;
    } else {
      /// search live api instead
      this.getOne(id); // execute call

      this.$store.subscribe(
        (mutation, state) => {
          if (mutation.type.includes("invoice/getOneItemSuccess")) {
            this.item = mutation.payload[0] || null;
            this.item;
            setTimeout(() => {
              this.loading = false;
            }, 500);
          }
          if (mutation.type.includes("invoice/getOneItemFailure")) {
            this.loading = false;
          }
        },
        err => {}
      );
    }
  },
  methods: {
    ...mapActions("invoice", {
      getOne: "getOneItem"
    }),
    goTo() {
      this.$router.push(`/create`);
    },
    goBack() {
      this.$router.push(`/list`);
    },
    niceDate(number) {
      return filters.niceDate(number);
    },
    printValue(val) {
      return Number(val).toFixed(2);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "ListItemPage";
</style>