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
            :items="bugs"
            :options.sync="options"
            :server-items-length="totalBugs"
            :loading="loading"
            class="elevation-1"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BugList",
  data: () => ({
    options: {},
    loading: true,
    bugs: [],
    totalBugs: 0,
    headers: [
      { text: "teste", value: "teste", sortable: false },
      { text: "teste1", value: "teste1", sortable: false },
      { text: "teste2", value: "teste2" }
    ]
  }),
  watch: {
    options: {
      handler(newValue, oldValue) {
        console.log({ newValue, oldValue });
        this.getDataFromApi().then(data => {
          console.log(data);
          this.bugs = data.itens;
          this.totalBugs = data.totalItens;
        });
      },
      deep: true
    }
  },
  methods: {
    getDataFromApi() {
      this.loading = false;
      return new Promise(resolve => {
        //const { sortBy, sortDesc, page, itemsPerPage } = this.options;

        const itens = [
          {
            teste: "primeiro teste",
            teste1: "primeiro teste",
            teste2: "primeiro teste"
          }
        ];

        const totalItens = itens.length;

        setTimeout(() => {
          this.loading = false;
          resolve({ itens, totalItens });
        }, 3500);
      });
    }
  }
};
</script>
