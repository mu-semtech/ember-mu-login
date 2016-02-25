import Ember from 'ember';

export default Ember.Mixin.create({
  session: Ember.inject.service('session'),
  actions: {
    login() {
			this.set('loading', true);
      this.set('errorMessage', '');
      const credentials = this.getProperties('nickname', 'password');
      this.get('session').authenticate('authenticator:mu-semtech', credentials)
	.catch((reason) => {
			this.set('loading',false);
			if (reason.status == 0) {
					this.set('errorMessage', 'failed to connect to server');
			}
			else if (reason.status == 400) {
				var error = reason.responseJSON.errors[0].title;
			  console.log('Authentication failed: ' + error);
			  this.set('errorMessage', error);
     }
     else {
       this.set('errorMessage', 'something went wrong, please try again later');
     }
	});
    }
  }
});
