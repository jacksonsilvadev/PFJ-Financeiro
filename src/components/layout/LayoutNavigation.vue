<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <router-link
          exact
          :key="i"
          class="nav-link"
          exact-active-class="active"
          :to="{name: router.name}"
          v-for="(router,i) in routerLinks"
        >
          <v-list-item @click>
            <v-list-item-action>
              <i class="fa" :class="`fa-${router.meta.icon}`"></i>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ router.meta.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>PFJ - Financeiro</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import LayoutLogout from "./LayoutLogout";
import LayoutNewExpense from "./LayoutNewExpense";

export default {
  components: {
    LayoutLogout,
    LayoutNewExpense
  },
  data() {
    return {
      drawer: true
    };
  },
  computed: {
    routerLinks() {
      return this.$router.options.routes.filter(
        r => r.name !== "login" && r.name !== "register" && r.path !== "*"
      );
    }
  }
};
</script>

<style scoped lang="scss">
// .nav {
//   margin-left: -15px;
//   width: calc(100% + 30px);
//   height: calc(100vh - 49px);
//   .nav-link {
//     color: var(--white);
//     transition: 0.4s;
//     &.active {
//       color: var(--featured);
//       background-color: transparent;
//     }
//     &:hover {
//       color: var(--dark);
//       background-color: var(--featured);
//     }
//   }
// }
</style>
