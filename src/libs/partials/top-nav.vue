<template>
  <div>
    <md-toolbar class="w-100 d-flex justify-content-center">
      <div class="md-toolbar-section-start w-25 absolute mx-2">
        <md-button class="md-icon-button">
          <md-icon>menu</md-icon>
        </md-button>
        <router-link class="md-title main-logo pl-0 ml-1" to="/home">PAYME</router-link>
      </div>

      <!-- <md-menu>
         // to add for responsive menu
      <md-button md-menu-trigger>Default</md-button>

      <md-menu-content>
        <md-menu-item>My Item 1</md-menu-item>
        <md-menu-item>My Item 2</md-menu-item>
        <md-menu-item>My Item 3</md-menu-item>
      </md-menu-content>
      </md-menu>-->
      <md-button class="mx-2">
        <router-link to="/home">Home</router-link>
      </md-button>
      <md-button class="mx-2">
        <router-link to="/list">Invoices</router-link>
      </md-button>
      <md-button class="mx-2">
        <router-link to="/create">Create Invoice</router-link>
      </md-button>
    </md-toolbar>
    <div class="pusher"></div>
  </div>
</template>

<script>
export default {
  name: "top-nav"
};
</script>

<style lang="scss" scoped>
.pusher {
  height: 64px;
  width: 64px;
  visibility: hidden;
}
.main-logo {
  font-weight: bold;
}
.md-button {
  a,
  a:link,
  a:hover {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: unset !important;
  }
}
.md-toolbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  .md-toolbar-section-start {
    &.absolute {
      position: absolute;
      left: 0;
    }
  }
}
</style>