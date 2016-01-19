import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';

export default Base.extend({

  basePath: Ember.computed(function() {
    var applicationConfig = this.container.lookup('config:environment');
    return applicationConfig.muSessionBasePath || '/sessions';
  }),

  
  restore() {
    return Ember.RSVP.reject();
  },

  authenticate(options) {
    Ember.$.ajax({
      url: this.get('basePath'),
      type: 'POST',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/vnd.api+json'
      },
      data: JSON.stringify({
        data: {
          type: 'sessions',
          attributes: {
            nickname: options['nickname'],
	    password: options['password']
	  }
	}
      })
    });
  },

  invalidate() {
    Ember.$.ajax({
      url: this.get('basePath') + '/current',
      type: 'DELETE',
      headers: {
        'Content-Type': 'application/vnd.api+json'
      }
    });
  }
});
