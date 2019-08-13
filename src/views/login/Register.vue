<template>
  <v-layout align-center justify-center>
    <v-flex xs6>
      <v-card max-width="450" class="mx-auto text-center" rounded>
        <v-card-title>Register</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submit" ref="form">
            <v-text-field
              v-model="email"
              v-validate="'required|email'"
              :error-messages="errors.collect('email')"
              label="E-mail"
              required
              data-vv-name="email"
            ></v-text-field>

            <v-text-field
              v-model.trim="password"
              label="Password"
              required
              data-vv-name="password"
              type="password"
              v-validate="'required|min:6'"
              :error-messages="errors.collect('password')"
              ref="password"
            ></v-text-field>

            <v-text-field
              v-model.trim="confirmPassword"
              label="Confirm password"
              required
              type="password"
              data-vv-name="confirmPassword"
              v-validate="'required|min:6|confirmed:password'"
              :error-messages="errors.collect('confirmPassword')"
            ></v-text-field>
            <v-layout justify-space-between>
              <v-btn color="error" @click="reset">Reset Form</v-btn>
              <v-btn color="success" type="submit">Register</v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    confirmPassword: ""
  }),

  methods: {
    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {

          return this.doRegister();
        }
      });
    },
    mounted() {
      this.$validator.localize("pt", this.dictionary);
    },
    async doRegister() {
      this.loading = true;
      const user = {
        email: this.email,
        password: this.password
      };

      await this.$store.dispatch("signUpAction", user);

      // console.log(this.$store.user, this.$store)

      const status = this.$store.state.user.status;

      if (status == "failure") {
        const err = this.$store.user.error;

        let message = "Não foi possível fazer o cadastro, tente novamente.";

        this.$root.$emit("Notification::show", {
          type: "danger",
          message: message
        });
      } else {
        this.$router.push({ name: "home" });
      }

      this.loading = false;
    },
    reset() {
      this.$refs.form.reset();
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
