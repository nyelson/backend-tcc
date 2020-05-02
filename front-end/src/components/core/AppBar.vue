<template>
  <v-app-bar id="app-bar" absolute app color="transparent" flat height="75">
    <v-btn class="mr-3" elevation="1" fab small @click="toggleDrawer(!drawer)">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
    <v-btn v-for="item in itens" :key="item.name" :to="item.href" class="ml-2" min-width="0" text>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>

    <v-spacer />

    <v-menu bottom left offset-y origin="top right" transition="scale-transition">
      <template v-slot:activator="{ attrs, on }">
        <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list :tile="false" nav>
        <v-hover v-slot:default="{ hover }">
          <v-list-item
            :dark="hover"
            :link="true"
            activeClass
            :class="{
              'black--text': !hover,
              'white--text secondary elevation-12': hover,
            }"
          >
            <v-list-item-content>Perfil</v-list-item-content>
          </v-list-item>
        </v-hover>
        <v-hover v-slot:default="{ hover }">
          <v-list-item
            :dark="hover"
            :link="true"
            @click="logout"
            activeClass
            :class="{
              'black--text': !hover,
              'white--text secondary elevation-12': hover,
            }"
          >
            <v-list-item-content>Logout</v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-hover>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "DashboardCoreAppBar",
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
  computed: mapState(["drawer"]),
  methods: {
    ...mapActions(["toggleDrawer"]),
    ...mapActions("authentication", ["logout"])
  }
};
</script>
