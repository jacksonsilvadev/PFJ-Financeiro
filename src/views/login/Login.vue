<template>
  <form class="form-login" @submit.prevent="doLogin()">
    <div class="card">
      <div class="card-header">
        <h1 class="text-center mb-0">PFJ Financeiro</h1>
      </div>

      <div class="card-body">
        <div class="form-group">
          <input required type="email" v-model="email" class="form-control" placeholder="E-mail" />
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

        <button class="btn btn-primary w-100" :disabled="loading">
          <template v-if="loading">
            <i class="fa fa-spinner fa-spin"></i>
            Entrando...
          </template>
          <template v-else>
            <i class="fa fa-sign-in-alt"></i>
            Entrar
          </template>
        </button>
      </div>
    </div>
  </form>
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
    async doLogin() {
      this.loading = true;
      const { email, password } = this;

      try {
        const res = await this.$firebase
          .auth()
          .signInWithEmailAndPassword(email, password);

        window.uid = res.user.uid;

        this.$router.push({ name: "home" });
      } catch (err) {
        console.log(err);
      }
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.form-login {
  height: 100vh;
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
