# Ember-mu-login

This addon provides a mu-login and mu-logout component for the [mu-login microservice](https://github.com/mu-semtech/login-service). 

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