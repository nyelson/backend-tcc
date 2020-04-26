<template>
  <v-container fluid class="bg-gradient">
    <v-row class="full-height" align="center" justify="center">
      <v-form @submit.prevent="login" v-model="valid" ref="form">
        <v-card class="sign-up-card">
          <v-card-title>Entrar</v-card-title>
          <v-card-text>
            <v-text-field
              label="E-mail"
              prepend-inner-icon="mdi-email"
              :rules="[rules.required, rules.email]"
              v-model="email"
              :disabled="loading"
              :loading="loading"
              :error-messages="emailErrorMessage"
            ></v-text-field>
            <v-text-field
              label="Senha"
              prepend-inner-icon="mdi-form-textbox-password"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.minValue]"
              @click:append="showPassword = !showPassword"
              v-model="password"
              :disabled="loading"
              :loading="loading"
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="actions">
            <v-container>
              <v-row align="center" justify="center">
                <v-btn type="submit" color="primary" :disabled="loading"
                  >Entrar</v-btn
                >
              </v-row>
              <v-row align="center" justify="center">
                <router-link class="redirect-link" to="/signup">
                  Novo por aqui? Crie uma nova conta clicando aqui.
                </router-link>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SignIn",
  data: () => ({
    showPassword: false,
    valid: false,
    loading: false,
    email: "",
    emailErrorMessage: "",
    passwordErrorMessage: "",
    password: "",
    passwordConfim: "",
    rules: {
      required: (value) => !!value || "Campo obrigatório.",
      minValue: (value) =>
        value.length > 5 || "A senha deve conter pelo menos 6 caracteres",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "E-mail inválido.";
      },
    },
  }),
  methods: {
    async login() {
      this.emailErrorMessage = "";
      this.passwordErrorMessage = "";
      await this.$nextTick();
      this.$refs.form.validate();
      if (this.valid) {
        this.loading = true;
        this.$store
          .dispatch("login", {
            email: this.email,
            password: this.password,
          })
          .then(() => this.$router.push({ name: "DashBoard" }))
          .catch((err) => {
            if (err.status === 304) {
              this.emailErrorMessage = "E-mail já registrado";
            }
          })
          .finally(() => (this.loading = false));
      }
    },
  },
};
</script>

<style scoped>
.sign-up-card {
  width: 500px;
}

.full-height {
  height: 100%;
}

.bg-gradient {
  width: 100%;
  height: 100vh;
  background: linear-gradient(87deg, #172b4d 0, #1a174d 100%) !important;
}

.actions {
  padding-bottom: 1.5rem;
}

.redirect-link {
  margin-top: 1rem;
}
</style>
