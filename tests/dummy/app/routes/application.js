import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin'

export default Ember.Route.extend( ApplicationRouteMixin, {
  init() {
    this._super();
  },
  sessionAuthenticated(){
    alert('Got authenticated!');
  },
  sessionInvalidated(){
    alert('Got invalidated');
  }
} );
