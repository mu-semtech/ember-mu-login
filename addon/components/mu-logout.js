import Ember from 'ember';
import layout from '../templates/components/mu-logout';

export default Ember.Component.extend({
  layout: layout,
  session: Ember.inject.service('session'),
  classNames: ['mu-logout'],
  actions: {
    logout() {
      this.get('session').invalidate('authenticator:mu-semtech');
    }
  }
});
