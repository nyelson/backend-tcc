<template>
  <v-content id="content">
    <router-view />
  </v-content>
</template>
<script>
export default {
  name: "DashBoardCoreView"
};
</script>
<style scoped>
#content {
  background-color: #eee;
}
</style>
