<template>
  <v-layout align-center justify-center>
    <v-flex xs6>
     <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required

            :type="passwordShow ? 'text' : 'password'"
             @click:append="passwordShow = !passwordShow"
          ></v-text-field>

          <v-text-field
            v-model="confirmPassword"
            label="confirm Password"
            :rules="passwordRules"
            required
            :type="confirmPasswordShow ? 'text' : 'password'"
             @click:append="confirmPasswordShow = !confirmPasswordShow"
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            @click="validate"
          >
            Register
          </v-btn>

          <v-btn
            color="error"
            @click="reset"
          >
            Reset Form
          </v-btn>
        </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
 data: () => ({
    passwordShow: false,
    confirmPasswordShow: false,
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'Preencha um e-mail',
      v => /.+@.+/.test(v) || 'E-mail inválido'
    ],
    password: '',
    confirmPassword: '',
    passwordRules: [
      v => !!v || 'Uma senha é obrigatória',
      v => v.length > 6 || 'Sua senha deve conter mais que 6 caracteres'
    ],

  }),
  methods: {
    async doRegister() {
      this.loading = true;
      const user = {
        email: this.email,
        password: this.password
      }

     await this.$store.dispatch('signUpAction', user)

      // console.log(this.$store.user, this.$store)

      const status = this.$store.state.user.status

        if(status == 'failure') {
         const err = this.$store.user.error

          let message = "Não foi possível fazer o cadastro, tente novamente.";



        this.$root.$emit("Notification::show", {
          type: "danger",
          message: message
        });
        } else {
          this.$router.push({name: 'home'})
        }


      this.loading = false;
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.doRegister()
      }
    },
    reset () {
      this.$refs.form.reset()
    },
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
