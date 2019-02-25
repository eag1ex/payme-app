<template>
  <div id="app-payme">
    <top-nav></top-nav>
    <div class="container-fluid">
      <div class="row d-flex justify-content-center">
        <div class="col-sm-12 col-md-8 col-lg-10">
          <div v-if="alert.message" :class="`alert ${alert.type} p-3`">{{alert.message}}</div>
          <transition name="fade" mode="out-in" v-cloak>
            <router-view></router-view>
          </transition>
          <!-- <spinner v-bind:appLoading="!loading"></spinner> -->
        </div>
      </div>
    </div>
    <footer-small v-bind:loading="loading"></footer-small>
  </div>
</template>

<script>
/**
 *  // NOTE {APP}
 *  This is the component which declares <top-nav/>, <router-view/>, and <footer-small/> in to applilcation
 *  - Every route/page loads via the router
 *  - once the app is loaded completely the {created} method disables the pre-loader.
 * - we also display messages via {{alert.message}} from store alert.module
 */

/* eslint-disable */
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
      /// disable preloader
      window.document.getElementById("start-app-preloader").style.display =
        "none";
      window.document.getElementById("app-payme").style.visibility = "visible";
    }, 1300);
  },
  watch: {
    $route(to, from) {
      // clear alert on location change
      this.clearAlert();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>