import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin'

export default Ember.Route.extend( ApplicationRouteMixin, {
  init() {
    this._super();
    alert("Hello sir");
  },
  actions: {
    authenticationSucceeded(){
      alert("Got authenticated");
    },
    invalidationSucceeded(){
      alert("Got invalitated");
    }
  }
} );
