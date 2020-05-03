<template>
  <v-card>
    <v-card-title>
      <span class="headline">Filtro</span>
    </v-card-title>
    <v-form @submit.prevent="filter" ref="form">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="Título" v-model="titulo"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select label="Prioridade" clearable :items="niveis" v-model="prioridade"></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select label="Severidade" clearable :items="niveis" v-model="dificuldade"></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select label="Time" clearable :items="fakeTeams" v-model="time"></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-btn type="submit" color="primary">Filtrar</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "DashBoardFilter",
  data: () => ({
    titulo: "",
    prioridade: "",
    dificuldade: "",
    time: "",
    niveis: [
      { text: "Baixa", value: "1" },
      { text: "Média", value: "2" },
      { text: "Alta", value: "3" }
    ],
    fakeTeams: [{ text: "Desenvolvedores", value: "fdjsalkçur5234" }]
  }),
  methods: {
    filter() {
      this.$emit("filter", {
        titulo: this.titulo,
        prioridade: this.prioridade,
        dificuldade: this.dificuldade
      });
    }
  }
};
</script>

<style scoped>
</style>