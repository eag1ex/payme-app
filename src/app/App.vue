<template>
  <div class="container-fluid" id="app-payme">
    <div class="row d-flex justify-content-center">
      <div class="col-sm-6 col-md-8 col-lg-10">
        <div v-if="alert.message" :class="`alert ${alert.type} p-3`">{{alert.message}}</div>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
        <!-- <spinner v-bind:appLoading="!loading"></spinner> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  data: function() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapState({
      alert: state => state.alert
    })
  },
  methods: {
    ...mapActions({
      clearAlert: "alert/clear"
    })
  },
  created: function() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  watch: {
    $route(to, from) {
      // clear alert on location change
      this.clearAlert();
    }
  }
};
</script>

<style lang="scss">
/// show the app
.app-on-ready {
  display: block !important;
}
.progress-spinner-init {
  //display: none !important;
}
</style>


<style lang="scss" scoped>
</style>