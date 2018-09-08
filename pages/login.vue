
<template>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <span> Login with AuzreAD </span>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="login" color="primary">Login with Microsoft</v-btn>
              </v-card-actions>
       </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

import AuthService from '~/modules/auth.service'
export default {
  layout: 'auth',
  middleware: 'notAuthenticated',
  mounted () {
    this.authService = new AuthService()
  },
  methods: {
    login () {
      this.loginFailed = false
      this.authService.login().then(
        user => {
          if (user) {
            this.user = user
            this.$store.commit('setAuth', user)
            this.$router.push('/')
          } else {
            this.loginFailed = true
          }
        },
        () => {
          this.loginFailed = true
        }
      )
    }
  }
}
</script>