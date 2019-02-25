<template>
  <div>
    <md-toolbar class="w-100 d-flex justify-content-center">
      <div class="md-toolbar-section-start w-auto absolute mx-2">
        <md-menu
          md-direction="bottom-start"
          class="d-block d-none d-sm-block d-md-none md-menu-mobi"
        >
          <md-button md-menu-trigger class="md-icon-button">
            <md-icon>menu</md-icon>
          </md-button>

          <md-menu-content class="d-block d-none d-sm-block d-md-none">
            <md-menu-item>
              <router-link to="/home">Home</router-link>
            </md-menu-item>
            <md-menu-item>
              <router-link to="/list">Invoices</router-link>
            </md-menu-item>
            <md-menu-item>
              <router-link to="/create">Create Invoice</router-link>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
        <router-link class="md-title main-logo pl-0 ml-3 mt-1" to="/home">$PAYME</router-link>
      </div>
      <md-button class="mx-2 d-none d-sm-none d-md-block">
        <router-link to="/home">Home</router-link>
      </md-button>
      <md-button class="mx-2 d-none d-sm-none d-md-block">
        <router-link to="/list">Invoices</router-link>
      </md-button>
      <md-button class="mx-2 d-none d-sm-none d-md-block">
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

<style lang="scss">
.md-scrollbar {
  ul.md-list {
    background: #212121 !important;
  }
}
</style>

<style lang="scss" scoped>
.md-menu-content {
  top: 57px !important;
}

.pusher {
  height: 64px;
  width: 64px;
  visibility: hidden;
}
.main-logo {
  font-weight: bold;
}
.md-button,
.md-list {
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