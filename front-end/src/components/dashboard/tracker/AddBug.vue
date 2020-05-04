<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn outlined color="primary" v-on="on">
        <v-icon left>mdi-bug</v-icon>Reportar Bug
      </v-btn>
    </template>
    <v-form @submit.prevent="submitAdd" v-model="valid" ref="form">
      <v-card>
        <v-card-title>
          <span class="headline">Reportar Novo Bug</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Título"
                  v-model="titulo"
                  required
                  :rules="[rules.required]"
                  :disabled="loading"
                  :loading="loading"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  label="Prioridade"
                  clearable
                  :items="niveis"
                  v-model="prioridade"
                  required
                  :rules="[rules.required]"
                  :disabled="loading"
                  :loading="loading"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  label="Severidade"
                  clearable
                  :items="niveis"
                  v-model="dificuldade"
                  required
                  :rules="[rules.required]"
                  :disabled="loading"
                  :loading="loading"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-select
                  label="Time Responsável"
                  clearable
                  :items="formatedToSelectTeams"
                  @click="fetchTeamsByUserId"
                  v-model="timeResponsavel"
                  required
                  :rules="[rules.required]"
                  :disabled="loading"
                  :loading="loading"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Descrição"
                  v-model="descricao"
                  :disabled="loading"
                  :loading="loading"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Fechar</v-btn>
          <v-btn type="submit" color="blue darken-1" text>Adicionar</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "",
  data: () => ({
    dialog: false,
    titulo: "",
    prioridade: "",
    dificuldade: "",
    descricao: "",
    loading: false,
    valid: false,
    timeResponsavel: null,
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
    ],
    rules: {
      required: value => !!value || "Campo obrigatório."
    }
  }),
  computed: {
    ...mapGetters("teams", ["formatedToSelectTeams"])
  },
  methods: {
    ...mapActions("teams", ["fetchTeamsByUserId"]),
    ...mapActions("items", ["addItem"]),
    submitAdd() {
      this.$refs.form.validate();
      if (this.valid) {
        this.loading = true;
        this.addItem({
          titulo: this.titulo,
          prioridade: this.prioridade,
          dificuldade: this.dificuldade,
          descricao: this.descricao,
          timeResponsavel: this.timeResponsavel
        }).then(() => {
          this.loading = false;
          this.titulo = "";
          this.prioridade = "";
          this.dificuldade = "";
          this.descricao = "";
          this.loading = false;
          this.valid = false;
          this.timeResponsavel = null;
          this.dialog = false;
        });
      }
    }
  }
};
</script>