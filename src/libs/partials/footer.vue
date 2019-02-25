<template>
  <div class="container-fluid mb-3" v-cloak v-if="!loading">
    <footer class="row d-flex justify-content-center mt-3">
      <div class="col-sm-12 col-md-8 col-lg-10 mt-3 right">
        <small class="pr-2 right">$PAYME - Invoice Application</small>
        <small class="pr-2 right">
          <i>Creative Common License.</i> &#169;Copyright 2019
        </small>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "footer-small",
  props: ["loading"],
  created: function() {}
};
</script>

<style lang="scss" scoped>
footer {
  .right {
    text-align: right;
    clear: both;
    float: right;
  }
  small {
    clear: both;
    color: #ccc;
  }
  footer > div > small::nth-child(2) {
    color: #aaa !important;
  }
}
</style>