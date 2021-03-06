<template>
  <v-container id="bug-list" fluid tag="section">
    <dash-board-filter @filter="filter" />
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-row justify="end">
              <v-col class="align-right" cols="12">
                <add-bug />
              </v-col>
            </v-row>
          </v-card-title>
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
      import("../../../components/dashboard/tracker/FilterBugs"),
    AddBug: () => import("../../../components/dashboard/tracker/AddBug")
  },
  data: () => ({
    options: {},
    filterData: {},
    pagination: {},
    sort: {},
    loading: true,
    headers: [
      { text: "Título", value: "titulo" },
      { text: "Status", value: "status" },
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
        this.pagination = { page, itemsPerPage };
        this.sort = { sortBy, isDesc };
        this.getDataFromApi({
          page: this.pagination.page,
          itemsPerPage: this.pagination.itemsPerPage,
          sortBy: this.sort.sortBy,
          isDesc: this.sort.isDesc,
          customFilter: this.filterData
        });
      },
      deep: true
    }
  },
  computed: {
    ...mapState("items", ["items", "totalItems"])
  },
  methods: {
    ...mapActions("items", ["fetchItems"]),
    filter(newValue) {
      this.filterData = newValue;
      this.getDataFromApi({
        page: this.pagination.page,
        itemsPerPage: this.pagination.itemsPerPage,
        sortBy: this.sort.sortBy,
        isDesc: this.sort.isDesc,
        customFilter: this.filterData
      });
    },
    getDataFromApi({ page, itemsPerPage, sortBy, isDesc, customFilter }) {
      this.loading = true;
      this.fetchItems({
        page,
        itemsPerPage,
        customFilter,
        sort: { by: sortBy, order: isDesc }
      }).then(() => (this.loading = false));
    }
  }
};
</script>

<style scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
}
</style>
