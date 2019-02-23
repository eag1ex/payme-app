<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <div class="col-sm-6 col-md-8 col-lg-10">
        <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
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
  watch: {
    $route(to, from) {
      console.log("from/to", from, to);
      // clear alert on location change
      this.clearAlert();
    }
  }
};
</script>