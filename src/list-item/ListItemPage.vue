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
                {{item.date}}
              </div>
            </md-card-header>

            <!-- <md-card-content>Dolores, sed accusantium quasi non.</md-card-content> -->
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
import { filters } from "../libs/_services";
import { mapState } from "vuex";
import { isEmpty } from "lodash";
export default {
  name: "RegularCards",
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
    const invoices = this.invoice.all.invoices || [];

    const newItem = invoices.reduce((n, item, inx) => {
      if (id === Number(item.id)) {
        n = item;
        if (n.date) {
          n.date = filters.niceDate(n.date);
        }
      }
      return n;
    }, {});
    if (!isEmpty(newItem)) {
      this.item = newItem;
    } else this.item = null;
  },
  mounted: function() {
    this.$nextTick(function() {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
  },
  methods: {
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
      return Number(val).toFixed(2); //Math.round(Number(val || 0));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "ListItemPage";
</style>