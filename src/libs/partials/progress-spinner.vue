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
    background-color: rgba(48, 48, 48, 0.7);
    position: fixed;
    left: 0;
    top: 0;
  }
  .md-progress-spinner {
    z-index: 1111;
    top: 35%;
    left: 50%;
    right: 50%;
    position: fixed;
  }
}
</style>