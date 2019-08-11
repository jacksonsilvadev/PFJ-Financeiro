<template>
  <v-layout align-center justify-center>
    <v-flex xs12>
      <form class="form-login" @submit.prevent="doLogin()">
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
            <v-layout justify-space-between>
              <v-btn color="teal" @click="registerForm()" outlined>Registrar</v-btn>
              <template v-if="loading">
                <v-btn color="warning" loading></v-btn>
              </template>
              <template v-else>
                <v-btn color="warning" type="submit">Entrar</v-btn>
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
      password: ""
    };
  },
  methods: {
    registerForm() {
      this.$router.push({ name: "register" });
    },
    async doLogin() {
      this.loading = true;
      const user = {
        email: this.email,
        password: this.password
      }

      await this.$store.dispatch('signInAction', user)

      // try {
      //   const res = await this.$firebase
      //     .auth()
      //     .signInWithEmailAndPassword(email, password);

      //   window.uid = res.user.uid;

      //   this.$router.push({ name: "home" });
      // } catch (err) {
      //   let message = "";

      //   switch (err.code) {
      //     case "auth/user-not-found":
      //       message = "Não possível localizar o usuário.";
      //       break;
      //     case "auth/wrong-password":
      //       message = "Senha inválida";
      //       break;
      //     default:
      //       message = "Não foi possível fazer login, tente novamente.";
      //   }

      //   this.$root.$emit("Notification::show", {
      //     type: "danger",
      //     message: message
      //   });
      // }
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
