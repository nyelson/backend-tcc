<template>
  <v-card>
    <v-card-title>
      <span class="headline">Filtro</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="Título"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-select label="Prioridade" clearable :items="niveis"></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-select label="Severidade" clearable :items="niveis"></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-select label="Time" clearable :items="fakeTeams"></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DashBoardFilter",
  data: () => ({
    niveis: [
      { text: "Baixa", value: "1" },
      { text: "Média", value: "2" },
      { text: "Alta", value: "3" }
    ],
    fakeTeams: [{ text: "Desenvolvedores", value: "fdjsalkçur5234" }]
  })
};
</script>

<style scoped>
</style>