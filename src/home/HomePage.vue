<template>
  <div id="template-home" class="bg-inverse m-2 p-3" v-cloak>
    <!-- <top-title v-bind:title="'Welcome'"></top-title> -->
    <spinner v-bind:appLoading="loading"></spinner>
    <md-card class="row" v-if="!loading">
      <div class="col-sm-12 col-md-8 col-lg-10 mt-4">
        <md-card-header>
          <div class="md-title">
            Welcome to
            <span class="text-secondary logo">$PAYME</span> Application
          </div>
        </md-card-header>

        <md-card-content>
          This is an invoice application,
          you can create, or view already existing invoices.
        </md-card-content>

        <md-card-actions md-alignment="space-between">
          <md-button class="md-raised ml-2 my-3 md-primary" @click="goTo()">Create Invoice</md-button>
        </md-card-actions>
      </div>
    </md-card>
  </div>
</template>


<script>
export default {
  name: "HomePage",
  data: () => ({ loading: true }),
  created: function() {
    this.loading = false;
  },
  methods: {
    goTo() {
      this.$router.push("/create");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "HomePage";
</style>