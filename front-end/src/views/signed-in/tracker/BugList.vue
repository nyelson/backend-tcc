<template>
  <v-container id="bug-list" fluid tag="section">
    <dash-board-filter />
    <v-row>
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
  components: {
    DashBoardFilter: () =>
      import("../../../components/dashboard/tracker/FilterBugs")
  },
  data: () => ({
    options: {},
    loading: true,
    headers: [
      { text: "Título", value: "titulo", sortable: false },
      { text: "Descrição", value: "descricao", sortable: false },
      { text: "Prioridade", value: "prioridade" },
      { text: "Data de Criação", value: "dataCadastro" },
      { text: "Severidade", value: "dificuldade" },
      { text: "Usuário Designado", value: "usuarioDesignado" },
      { text: "Time Responsável", value: "timeResponsavel" }
    ]
  }),
  watch: {
    options: {
      handler(newValue) {
        const {
          page,
          itemsPerPage,
          sortBy: [sortBy],
          sortDesc: [isDesc]
        } = newValue;
        this.getDataFromApi({ page, itemsPerPage, sortBy, isDesc });
      },
      deep: true
    }
  },
  computed: {
    ...mapState("items", ["items", "totalItems"])
  },
  methods: {
    ...mapActions("items", ["fetchItems"]),
    getDataFromApi({ page, itemsPerPage, sortBy, isDesc }) {
      this.loading = true;
      this.fetchItems({ page, itemsPerPage, sortBy, isDesc }).then(
        () => (this.loading = false)
      );
    }
  }
};
</script>
