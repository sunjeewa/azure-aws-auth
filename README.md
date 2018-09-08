# azure-aws-auth

> AzureAD SSO for AWS

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

## Integrate with Azure AD
``` bash
# Add MSAL 
$ yarn add msal
```
The example snippets below show how to acquire a token for Microsoft Graph.

#### Prerequisite

Before using MSAL, register an application in Azure AD v2.0 using the [application registration portal](https://apps.dev.microsoft.com/) to get your clientID. As part of the registration, you will also need to add the Web platform, check the "Implicit Flow" checkbox, and add the redirectURI to your application.

#### 1. Instantiate the UserAgentApplication

Instantiate the UserAgentApplication with a clientID and callback that is called after the authentication request is complete.

UserAgentApplication has other optional parameters like redirectUri which can be assigned. Please refer to the [Wiki](https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-basics#configuration-options) to see the full list and their default values.

```JavaScript
    var applicationConfig = {
        clientID: 'your_client_id'
    };

     var userAgentApplication = new Msal.UserAgentApplication(applicationConfig.clientID, null, authCallback);

    function authCallback(errorDesc, token, error, tokenType) {
        if (token) {
        }
        else {
            log(error + ":" + errorDesc);
        }
    }
```

#### 2. Login the user and then get an access token

Your app must login the user with either loginPopup or the loginRedirect method to establish user context. Next, you can get access tokens for the APIs your app needs to call using the acquireTokenSilent method. If the silent token acquisition fails for some reasons such as expiration, you will need to invoke an interactive method to acquire tokens.

 ```JavaScript
    var graphScopes = ["user.read", "mail.send"];

    userAgentApplication.loginPopup(graphScopes).then(function (idToken) {
        //Login Success
        userAgentApplication.acquireTokenSilent(graphScopes).then(function (accessToken) {
            //AcquireTokenSilent Success
        }, function (error) {
            //AcquireTokenSilent Failure, send an interactive request.
            userAgentApplication.acquireTokenPopup(graphScopes).then(function (accessToken) {
                updateUI();
            }, function (error) {
                console.log(error);
            });
        })
    }, function (error) {
        console.log(error);
    });
```

#### 3. Use the token as a bearer in an HTTP request to call the Microsoft Graph or a Web API

```JavaScript
    var headers = new Headers();
    var bearer = "Bearer " + token;
    headers.append("Authorization", bearer);
    var options = {
         method: "GET",
         headers: headers
    };
    var graphEndpoint = "https://graph.microsoft.com/v1.0/me";

    fetch(graphEndpoint, options)
        .then(function (response) {
             //do something with response
        }
```
