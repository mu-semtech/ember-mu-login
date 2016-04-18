import Ember from 'ember';

export default Ember.Mixin.create({
  session: Ember.inject.service('session'),
  actions: {
    login() {
      this.set('loading', true);
      this.set('errorMessage', '');
      const credentials = this.getProperties('nickname', 'password');
      this.get('session').authenticate('authenticator:mu-semtech', credentials).then( (response) => {
        this.set('loading', false);
      }).catch((reason) => {
        this.set('loading', false);
        if (reason.status == 0) {
          this.set('errorMessage', 'Failed to connect to server');
        }
        else if (reason.status == 400) {
          var error = reason.responseJSON.errors[0].title;
          this.set('errorMessage', error);
        }
        else {
          this.set('errorMessage', 'Something went wrong, please try again later');
        }
      });
    }
  }
});
