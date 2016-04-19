import Ember from 'ember';
import { isBadRequestError } from 'ember-ajax/errors';

export default Ember.Mixin.create({
  session: Ember.inject.service('session'),
  actions: {
    login() {
      this.set('loading', true);
      this.set('errorMessage', '');
      const credentials = this.getProperties('nickname', 'password');
      this.get('session').authenticate('authenticator:mu-semtech', credentials).then( () => {
        this.set('loading', false);
      }).catch((reason) => {
        this.set('loading', false);
        if (reason.errors[0].status === '0') {
          this.set('errorMessage', 'Failed to connect to server');
        }
        else if (isBadRequestError(reason)) {
          var error = reason.errors[0].title;
          this.set('errorMessage', error);
        }
        else {
          this.set('errorMessage', 'Something went wrong, please try again later');
        }
      });
    }
  }
});
