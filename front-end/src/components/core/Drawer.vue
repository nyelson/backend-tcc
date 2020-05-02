<template>
  <v-navigation-drawer id="drawer" :value="drawer" dark app mobile-break-point="960" width="260">
    <v-list>
      <v-list-item>
        <v-list-item-avatar class="align-self-center uppercase" color="blue" contain>
          {{
          projectInitials
          }}
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="display-1 captalized" v-text="user.usuario.nome" />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list expand dense nav>
      <v-list-item v-for="item in itens" :key="item.name" :to="item.href" link>
        <v-list-item-icon>
          <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>{{ item.name }}</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "DashboardCoreDrawer",
  data: () => ({
    itens: [
      {
        icon: "mdi-clipboard-outline",
        name: "Itens",
        href: "/dashboard/tracker"
      },
      {
        icon: "mdi-view-dashboard",
        name: "Dashboard",
        href: "/dashboard/dashboard"
      }
    ]
  }),
  computed: {
    ...mapState(["drawer"]),
    ...mapState("authentication", ["user"]),
    projectInitials() {
      return this.user.usuario.nome
        .split(" ")
        .map(word => word.substring(0, 1))
        .join("");
    }
  }
};
</script>

<style scoped>
.uppercase {
  text-transform: uppercase;
}
.captalized {
  text-transform: capitalize;
}
</style>
