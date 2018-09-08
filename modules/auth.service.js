import * as Msal from 'msal'

export default class AuthService {
  constructor () {
    let PROD_REDIRECT_URI = 'http://localhost:3000/'
    this.applicationConfig = {
      clientID: '6c7baa2d-91d7-47c2-9ab7-8b9366f98afb',
      graphScopes: ['user.read']
    }
    this.app = new Msal.UserAgentApplication(
      this.applicationConfig.clientID,
      '',
      () => {
        // callback for login redirect
      },
      {
        PROD_REDIRECT_URI
      }
    )
  }
  login () {
    return this.app.loginPopup(this.applicationConfig.graphScopes).then(
      idToken => {
        const user = this.app.getUser()
        if (user) {
          return user
        } else {
          return null
        }
      },
      () => {
        return null
      }
    )
  }
  logout () {
    this.app.logout()
  }
  getToken () {
    return this.app.acquireTokenSilent(this.applicationConfig.graphScopes).then(
      accessToken => {
        return accessToken
      },
      () => this.app
        .acquireTokenPopup(this.applicationConfig.graphScopes)
        .then(accessToken => {
          return accessToken
        }, err => {
          console.error(err)
        })
    )
  }
}
