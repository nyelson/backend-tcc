<template>
  <v-container id="bug-list" fluid tag="section">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>AQUI VAI TER A LISTA DE BUGS!</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="items"
            :options.sync="options"
            :server-items-length="totalItems"
            :loading="loading"
            class="elevation-1"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "BugList",
  data: () => ({
    options: {},
    loading: true,
    headers: [
      { text: "Título", value: "titulo", sortable: false },
      { text: "Descrição", value: "descricao", sortable: false },
      { text: "Prioridade", value: "prioridade" }
    ]
  }),
  watch: {
    options: {
      handler(newValue) {
        const { page, itemsPerPage } = newValue;
        this.getDataFromApi({ page, itemsPerPage });
      },
      deep: true
    }
  },
  computed: {
    ...mapState("items", ["items", "totalItems"])
  },
  methods: {
    ...mapActions("items", ["fetchItems"]),
    getDataFromApi({ page, itemsPerPage }) {
      this.loading = true;
      this.fetchItems({ page: page, itemsPerPage: itemsPerPage }).then(
        () => (this.loading = false)
      );
    }
  }
};
</script>
