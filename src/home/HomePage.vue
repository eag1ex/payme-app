<template>
  <div id="template-home" class="bg-inverse m-2 p-3" v-cloak>
    <!-- <top-title v-bind:title="'Welcome'"></top-title> -->
    <spinner v-bind:appLoading="loading"></spinner>
    <md-card class="w-75 p-5" v-if="!loading">
      <md-card-header>
        <div class="md-title">
          Welcome to
          <span class="text-secondary logo">PAYME</span> Application
        </div>
      </md-card-header>

      <md-card-content>
        This is an invoice application,
        you can create new or view already existing invoices.
      </md-card-content>

      <md-card-actions md-alignment="space-between">
        <md-button class="md-raised ml-2 my-3 md-primary" @click="goTo()">Create Invoice</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<style lang="scss" scoped>
.md-card {
  span.logo {
    font-weight: bold;
  }
  background: unset !important;
  box-shadow: unset !important;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
  .md-card-actions {
  }
}
</style>

<script>
export default {
  name: "HomePage",
  data: {
    loading: true
  },
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