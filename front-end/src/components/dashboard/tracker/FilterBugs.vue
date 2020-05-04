<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="12">
              <span class="headline">Filtro</span>
            </v-col>
            <v-col cols="11" class="text--secondary">
              <v-fade-transition leave-absolute>
                <v-row v-if="!open" style="width: 100%">
                  <v-col cols="12" sm="6" md="2">Titulo: {{ titulo || 'Não filtrado' }}</v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="2"
                  >Prioridade: {{ selectedPrioridade || 'Não filtrado' }}</v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="2"
                  >Severidade: {{ selectedDificuldade || 'Não filtrado' }}</v-col>
                  <v-col cols="12" sm="6" md="3">Status: {{ selectedStatus || 'Não filtrado' }}</v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="3"
                  >Time: {{ time!= null ? getTeamName(time) :'Não filtrado' }}</v-col>
                </v-row>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!--<v-row justify="space-around" no-gutters>
            <v-col cols="3">
              <v-menu
                ref="startMenu"
                :close-on-content-click="false"
                :return-value.sync="dataInicio"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="dataInicio"
                    label="De"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="$refs.startMenu.isActive = false">Cancelar</v-btn>
                  <v-btn text color="primary" @click="$refs.startMenu.save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="3">
              <v-menu
                ref="endMenu"
                :close-on-content-click="false"
                :return-value.sync="dataFim"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="dataFim"
                    label="Até"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="$refs.endMenu.isActive = false">Cancelar</v-btn>
                  <v-btn text color="primary" @click="$refs.endMenu.save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>-->
          <div @keypress.enter="filter">
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Título" v-model="titulo"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-select label="Prioridade" clearable :items="niveis" v-model="prioridade"></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-select label="Severidade" clearable :items="niveis" v-model="dificuldade"></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-select label="Status" clearable :items="statuses" v-model="status"></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-select
                  label="Time"
                  clearable
                  :items="formatedToSelectTeams"
                  @click="fetchTeams"
                  :loading="loadTeams"
                  v-model="time"
                ></v-select>
              </v-col>
            </v-row>
            <v-row justify="end">
              <v-col class="align-right" cols="1">
                <v-btn type="submit" color="primary" @click="filter" small>
                  <v-icon>mdi-filter</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DashBoardFilter",
  data: () => ({
    titulo: "",
    prioridade: "",
    dificuldade: "",
    status: "",
    time: null,
    date: null,
    dataInicio: null,
    dataFim: null,
    loadTeams: false,
    niveis: [
      { text: "Baixa", value: 1 },
      { text: "Média", value: 2 },
      { text: "Alta", value: 3 }
    ],
    statuses: [
      { text: "Aberto", value: 1 },
      { text: "Em desenvolvimento", value: 2 },
      { text: "Em teste", value: 3 },
      { text: "Fechado", value: 4 }
    ]
  }),
  computed: {
    ...mapGetters("teams", ["formatedToSelectTeams", "getTeamName"]),
    selectedPrioridade() {
      return this.niveis[this.prioridade - 1] != null
        ? this.niveis[this.prioridade - 1].text
        : null;
    },
    selectedDificuldade() {
      return this.niveis[this.dificuldade - 1] != null
        ? this.niveis[this.dificuldade - 1].text
        : null;
    },
    selectedStatus() {
      return this.statuses[this.status - 1] != null
        ? this.statuses[this.status - 1].text
        : null;
    }
  },
  methods: {
    ...mapActions("teams", ["fetchTeamsByUserId"]),
    fetchTeams() {
      this.loadTeams = true;
      this.fetchTeamsByUserId().then(() => (this.loadTeams = false));
    },
    filter() {
      this.$emit("filter", {
        titulo: this.titulo,
        prioridade: this.prioridade,
        dificuldade: this.dificuldade,
        timeResponsavel: this.time
      });
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