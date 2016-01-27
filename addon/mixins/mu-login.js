import Ember from 'ember';

export default Ember.Mixin.create({
  session: Ember.inject.service('session'),
  actions: {
    login() {
      const credentials = this.getProperties('nickname', 'password');
      this.get('session').authenticate('authenticator:mu-semtech', credentials)
	.catch((reason) => {
	  var error = reason.responseJSON.errors[0].title;
	  console.log('Authentication failed: ' + error);
	  this.set('errorMessage', error);
	});
    }
  }
});
