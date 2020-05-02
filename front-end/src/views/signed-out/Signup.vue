<template>
  <v-container fluid class="bg-gradient">
    <v-row class="full-height" align="center" justify="center">
      <v-form @submit.prevent="signup" v-model="valid" ref="form">
        <v-card class="sign-up-card">
          <v-card-title>Registre-se</v-card-title>
          <v-card-text>
            <v-text-field
              label="Nome"
              prepend-inner-icon="mdi-account-circle"
              v-model="name"
              :rules="[rules.required]"
              :disabled="loading"
              :loading="loading"
            ></v-text-field>
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
                <v-btn type="submit" color="primary" :disabled="loading">Registrar</v-btn>
              </v-row>
              <v-row align="center" justify="center">
                <router-link
                  class="redirect-link"
                  to="/signin"
                >Já possui uma conta? Clique aqui para entrar.</router-link>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SignUp",
  data: () => ({
    showPassword: false,
    valid: false,
    loading: false,
    name: "",
    email: "",
    emailErrorMessage: "",
    password: "",
    passwordConfim: "",
    techs: [],
    rules: {
      required: value => !!value || "Campo obrigatório.",
      minValue: value =>
        value.length > 5 || "A senha deve conter pelo menos 6 caracteres",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "E-mail inválido.";
      }
    }
  }),
  methods: {
    ...mapActions("authentication", ["register"]),
    async signup() {
      this.emailErrorMessage = "";
      await this.$nextTick();
      this.$refs.form.validate();
      if (this.valid) {
        this.loading = true;
        this.register({
          nome: this.name,
          email: this.email,
          password: this.password
        })
          .then(() => this.$router.push({ name: "DashBoard" }))
          .catch(err => {
            if (err.status === 304) {
              this.emailErrorMessage = "E-mail já registrado";
            }
          })
          .finally(() => (this.loading = false));
      }
    }
  }
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

.redirect-link {
  margin-top: 1rem;
}

.actions {
  padding-bottom: 1.5rem;
}
</style>
