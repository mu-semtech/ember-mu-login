# Ember-mu-login

This addon provides a mu-login and mu-logout component for the [mu-login microservice](https://github.com/mu-semtech/login-service). The addon is based on [ember-simple-auth](https://github.com/simplabs/ember-simple-auth).

## Installation
```
ember install ember-mu-login
```

## Basic usage
Just include the `{{mu-login}}` or `{{mu-logout}}` component in your template.


## Advanced usage

### Overwriting the component templates
To overwrite the template of the components, create a custom `mu-login.hbs` or `mu-logout.hbs` file. Make sure you use the correct bindings and actions. You can have a look at the default templates in `addon/templates/components`.

For mu-login
  - call the `login` action
  - use `nickname` and `password` as value bindings for the input fields

For mu-logout
  - call the `logout` action

### Customizing the components
To customize the components, generate your own new components and include the mu-login (`ember-mu-login/mixins/mu-login`) and mu-logout (`ember-mu-login/mixins/mu-logout`) mixins to handle the `login` and `logout` actions. 


## Ember Simple Auth in a nutshell
The ember-mu-login addon is based on [ember-simple-auth](https://github.com/simplabs/ember-simple-auth). The following paragraphs highlight the features you will probably need in combination with ember-mu-login. A complete usage and configuration guide can be found in the [ember-simple-auth documentation](https://github.com/simplabs/ember-simple-auth).

### Session state
You can use [ember-simple-auth's `isAuthenticated` property](https://github.com/simplabs/ember-simple-auth#basic-usage) to check the current session's state. The session service needs to be injected. 

```js
// app/controllers/application.js
import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session')

  …
});
```

```handlebars
{{!-- app/templates/application.hbs --}}
{{#if session.isAuthenticated}}
  {{mu-logout}}
{{else}}
  {{mu-login}}
{{/if}}
```

### Authentication events
Mix the [`ApplicationRouteMixin`](http://ember-simple-auth.com/api/classes/ApplicationRouteMixin.html)
into the application route to have the [`authenticationSucceeded`](http://ember-simple-auth.com/api/classes/SessionService.html#event_authenticationSucceeded)
and [`invalidationSucceeded`](http://ember-simple-auth.com/api/classes/SessionService.html#event_invalidationSucceeded)
events handled automatically:

```js
// app/routes/application.js
import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin);
```

### Protecting routes
To make a route in the application accessible only when the session is authenticated, mix the
[`AuthenticatedRouteMixin`](http://ember-simple-auth.com/api/classes/AuthenticatedRouteMixin.html)
into the respective route:

```js
// app/routes/protected.js
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin);
```

This will make the route (and all of its subroutes) transition to the `login` route if the session is not authenticated.
