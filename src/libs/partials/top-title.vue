<template>
  <div class="w-100" v-cloak>
    <div class="d-flex justify-content-between">
      <h1 class="md-headline my-3">{{title}}</h1>
      <md-button
        v-if="location"
        class="md-raised mx-0 my-3 md-primary"
        @click="goTo()"
      >Create Invoice</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "top-title",
  props: ["title", "location"],
  data: function() {
    return {
      defaultTitle: "default"
    };
  },
  methods: {
    goTo() {
      this.$router.push(`${this.location}`);
    }
  },
  created: function() {
    if (!this.title) this.title = this.defaultTitle;
  }
};
</script>

<style lang="scss" scoped>
</style>