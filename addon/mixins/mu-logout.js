import Ember from 'ember';

export default Ember.Mixin.create({
  session: Ember.inject.service('session'),
  actions: {
    logout() {
      this.get('session').invalidate('authenticator:mu-semtech');
    }
  }
});
