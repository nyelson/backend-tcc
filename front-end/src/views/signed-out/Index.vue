<template>
  <v-app>
    <dashboard-core-view />
  </v-app>
</template>

<script>
export default {
  components: {
    DashboardCoreView: () => import("../../components/core/MainView")
  }
};
</script>
