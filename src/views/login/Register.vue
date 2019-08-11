<template>
  <v-layout align-center justify-center>
    <v-flex xs12>
      <form class="form-login" @submit.prevent="doRegister()">
        <div class="card">
          <div class="card-header">
            <h1 class="text-center mb-0">PFJ Financeiro</h1>
          </div>

          <div class="card-body">
            <div class="form-group">
              <input
                required
                type="email"
                v-model="email"
                class="form-control"
                placeholder="E-mail"
              />
            </div>
            <div class="form-group">
              <input
                required
                type="password"
                v-model="password"
                class="form-control"
                placeholder="Senha"
              />
            </div>
            <div class="form-group">
              <input
                required
                type="password"
                v-model="passwordConfirmed"
                class="form-control"
                placeholder="Confirmar senha"
              />
            </div>
            <v-layout justify-center>
              <template v-if="loading">
                <v-btn color="warning" loading></v-btn>
              </template>
              <template v-else>
                <v-btn color="warning" type="submit">Registrar-se</v-btn>
              </template>
            </v-layout>
          </div>
        </div>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => {
    return {
      loading: false,
      email: "",
      password: "",
      passwordConfirmed: ""
    };
  },
  methods: {
    async doRegister() {
      this.loading = true;
      const { email, password } = this;

      try {
        const res = await this.$firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(erroCode);
          });
        this.$router.push({ name: "home" });
      } catch (err) {
        let message = "";

        switch (err.code) {
          case "auth/user-not-found":
            message = "Não possível localizar o usuário.";
            break;
          case "auth/wrong-password":
            message = "Senha inválida";
            break;
          default:
            message = "Não foi possível fazer o cadastro, tente novamente.";
        }

        this.$root.$emit("Notification::show", {
          type: "danger",
          message: message
        });
      }
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.form-login {
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 18pt;
  }
  .card {
    width: 30%;
    color: var(--darker);
  }
}
</style>
