<template>
  <v-navigation-drawer id="drawer" v-model="drawer" dark app mobile-break-point="960" width="260">
    <v-list>
      <v-list-item>
        <v-list-item-avatar class="align-self-center" color="blue" contain>
          {{
          projectInitials
          }}
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="display-1" v-text="projectName" />
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
export default {
  name: "DashboardCoreDrawer",
  data: () => ({
    projectName: "Projeto X",
    drawer: true,
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
    projectInitials() {
      return this.projectName
        .split(" ")
        .map(word => word.substring(0, 1))
        .join("");
    }
  }
};
</script>
