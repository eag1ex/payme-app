<template>
  <div id="template-list-item" class="bg-inverse m-2 p-3">
    <div class="w-100">
      <div class="d-flex justify-content-between">
        <h1 class="md-headline my-3">Invoiced</h1>
        <md-button class="md-raised mx-0 my-3" @click="goTo()">Create Invoice</md-button>
      </div>
    </div>
    <spinner v-bind:appLoading="loading"></spinner>

    <md-card md-with-hover class="w-100" v-if="!loading && item">
      <md-ripple>
        <md-card-header>
          <div class="md-subhead">
            <span>For:</span>
            {{item.name}}
          </div>
          <div class="md-subhead">
            <span>Amount:</span>
            ${{item.value}}
          </div>
          <div class="md-subhead for-date">
            <span>Date:</span>
            {{item.date}}
          </div>
        </md-card-header>

        <!-- <md-card-content>Dolores, sed accusantium quasi non.</md-card-content> -->
        <md-card-actions>
          <md-button @click="goBack()">back</md-button>
        </md-card-actions>
      </md-ripple>
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
      date: null
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
    }
  }
  // watch: {
  //   $route: function() {
  //     this.fetchData().then(function() {
  //       console.log("page loaded", this.invoice.all);
  //     });
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.md-card-header {
  .md-subhead {
    font-size: 35px;
    line-height: 40px;
    &.for-date {
      font-size: 18px;
    }
    color: #fff;
    > span {
      opacity: 0.5;
    }
  }
}
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>