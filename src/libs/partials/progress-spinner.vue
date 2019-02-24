<template>
  <div id="progress-spinner-wrap" v-if="appLoading">
    <md-progress-spinner
      class="d-flex justify-content-center mt-5 bg-secondary"
      :md-diameter="100"
      :md-stroke="10"
      md-mode="indeterminate"
    ></md-progress-spinner>
    <div class="trans-bg"></div>
  </div>
</template>

<script>
export default {
  name: "progress-spinner",
  props: ["appLoading"],
  data() {
    return {};
  },
  created: function() {
    console.log("---appLoading");
  },
  watch: {
    appLoading: function(d) {}
  }
  // computed: {},
  // methods: {}
};
</script>

<style lang="scss" scoped>
#progress-spinner-wrap {
  .trans-bg {
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    position: fixed;
    left: 0;
    top: 0;
  }
  .md-progress-spinner {
    z-index: 1111;
    top: 25%;
    left: 50%;
    right: 50%;
    position: fixed;
  }
}
</style>