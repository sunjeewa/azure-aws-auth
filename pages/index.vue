<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">Welcome {{ $store.state.user.name }}</v-card-title>
        <v-card-text>

        
    <button @click="callAPIusers" type="button" v-if="$store.state.user">
      Call Graph's /me API
    </button>

    <button @click="logout" type="button" v-if="user">
      Logout
    </button>
    <h3 v-if="$store.state.user">Hello {{ $store.state.user }}</h3>
    <pre v-if="userInfo">{{ JSON.stringify(userInfo, null, 4) }}</pre>
    <pre v-if="allUserInfo">{{ JSON.stringify(allUserInfo, null, 4) }}</pre>
    <p v-if="loginFailed">Login unsuccessful</p>
    <p v-if="apiCallFailed">Graph API call unsuccessful</p>



          <hr class="my-3">
          <a href="https://nuxtjs.org/" target="_blank">Nuxt Documentation</a>
          <br>
          <a href="https://github.com/nuxt/nuxt.js" target="_blank">Nuxt GitHub</a>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat nuxt to="/inspire">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import GraphService from '~/modules/graph.service'
import AuthService from '~/modules/auth.service'

export default {
  middleware: 'authenticated',
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js + MSAL.js App',
      userInfo: null,
      allUserInfo: null,
      apiCallFailed: false,
      loginFailed: false
    }
  },
  mounted () {
    this.authService = new AuthService()
    this.graphService = new GraphService()
  },
  methods: {
    callAPI () {
      this.apiCallFailed = false
      this.authService.getToken().then(
        token => {
          this.graphService.getUserInfo(token).then(
            data => {
              this.userInfo = data
            },
            error => {
              console.error(error)
              this.apiCallFailed = true
            }
          )
        },
        error => {
          console.error(error)
          this.apiCallFailed = true
        }
      )
    },
    callAPIusers () {
      this.apiCallFailed = false
      this.authService.getToken().then(
        token => {
          this.graphService.getAllUsers(token).then(
            data => {
              this.allUserInfo = data
            },
            error => {
              console.error(error)
              this.apiCallFailed = true
            }
          )
        },
        error => {
          console.error(error)
          this.apiCallFailed = true
        }
      )
    },
    logout () {
      this.authService.logout()
    },
    login () {
      this.loginFailed = false
      this.authService.login().then(
        user => {
          if (user) {
            this.user = user
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
