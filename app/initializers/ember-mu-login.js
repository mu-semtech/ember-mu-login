import Ember from 'ember';
import ENV from '../config/environment';
import Configuration from 'ember-mu-login/configuration';

export default {
  name:       'ember-mu-login',
  initialize: function(registry) {
    const config   = ENV['ember-mu-login'] || {};
    Configuration.load(config);
  }
};
