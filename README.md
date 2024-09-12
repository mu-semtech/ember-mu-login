# ember-mu-login

This addon provides a mu-login and mu-logout component for the [mu-login microservice](https://github.com/mu-semtech/login-service). The addon uses [ember-simple-auth](https://github.com/simplabs/ember-simple-auth) for authentication.

## How-To
### Basic usage
Install the Ember addons

```bash
ember install ember-simple-auth
ember install ember-mu-login
```

Make sure to use ember-simple-auth >= v6.0.0

As part of installing `ember-simple-auth` it's necessary to set-up the session service, so somewhere
near the root of your app, inject the service and call `setup()` on it. For example:

``` js
// app/routes/application.js
import Route from '@ember/routing/route'
import { service } from '@ember/service'

export default class ApplicationRoute extends Route {
  @service session;

  async beforeModel(...args) {
    await this.session.setup();
  }
}
```

After installation, include the `<MuLogin />` and `<MuLogout />` component somewhere in your template(s).

Have a look at the [ember-simple-auth addon](https://github.com/mainmatter/ember-simple-auth#walkthrough) to understand how to protect your routes. The session authentication/invalidation is already handled by this addon.

### Customize the components layout
If you want to customize the layout of the `MuLogin` and/or `MuLogout` component, you will need to extend those components. This tutorial explains customization of the `MuLogin` component, but the process for `MuLogout` is similar.

Generate a `MuLogin` component for your application

```bash
ember g component -gc mu-login
```

Overwrite the generated `app/components/mu-login.js` file with the following contents
```javascript
import MuLoginComponent from 'ember-mu-login/components/mu-login';

export default class MyMuLoginComponent extends MuLoginComponent {

}
```

You can now customize the generated `app/components/mu-login.hbs` file as needed. The login action can be triggered using `{{on "click" this.login}}`. Have a look at the `MuLogin`-component documentation for all options.

## Reference
### Components
#### MuLogin
Component rendering a login form with a username and password field.

##### Arguments
The following arguments can be passed to the component

| Name             | Req | Description                                                |
|------------------|-----|------------------------------------------------------------|
| label            |     | Label for the login button (default: "Login")              |
| placeholder      |     | Placeholder value for the username input field             |
| forbiddenMessage |     | Error message to show if a user doesn't have access        |
| failureMessage   |     | Error message to show if something went wrong during login |

##### Properties
The following properties can be used in the component's template using `{{this.propName}}`

| Name             | Description                                                                      |
|------------------|----------------------------------------------------------------------------------|
| nickname         | Value of the username input field                                                |
| password         | Value of the password input field                                                |
| isAuthenticating | Whether the authentication request is currently running                          |
| label            | Label for the login button with default fallback                                 |
| placeholder      | Placeholder value for username input field with default fallback                 |
| forbiddenMessage | Error message to show if a user doesn't have access with default fallback        |
| failureMessage   | Error message to show if something went wrong during login with default fallback |
| errorMessage     | Error message received from the backend on failure                               |

##### Actions
The following actions are available

| Name  | Description                                             |
|-------|---------------------------------------------------------|
| login | Login attempt using the filled in username and password |

#### MuLogout
Component rendering a button to logout.

##### Arguments
The following arguments can be passed to the component

| Name             | Req | Description                                                |
|------------------|-----|------------------------------------------------------------|
| label            |     | Label for the logout button (default: "Logout")              |

##### Properties
The following properties can be used in the component's template using `{{this.propName}}`

| Name             | Description                                                                      |
|------------------|----------------------------------------------------------------------------------|
| label            | Label for the logout button with default fallback                                 |

##### Actions
The following actions are available

| Name    | Description                              |
|---------|------------------------------------------|
| lougout | Action to invalidate the current session |

