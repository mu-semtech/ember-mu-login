import Ember from 'ember';

const DEFAULTS = {
  sessionBasePath: '/sessions'
};

/**
  Ember Mu Login's configuration object.

  To change any of these values, set them on the application's environment
  object, e.g.:

  ```js
  // config/environment.js
  ENV['ember-mu-login'] = {
    sessionBasePath: '/sessions'
  };
  ```

  @class Configuration
  @extends Object
  @module ember-mu-login/configuration
  @public
*/
export default {

  /**
    Base path for the login and logout requests

    @property sessionBasePath
    @readOnly
    @static
    @type String
    @default '/sessions'
    @public
  */
  sessionBasePath: DEFAULTS.sessionBasePath,

  load(config) {
    let wrappedConfig = Ember.Object.create(config);
    for (let property in this) {
      if (this.hasOwnProperty(property) && Ember.typeOf(this[property]) !== 'function') {
        this[property] = wrappedConfig.getWithDefault(property, DEFAULTS[property]);
      }
    }
  }
};
