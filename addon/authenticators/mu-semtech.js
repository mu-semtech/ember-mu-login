import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import Configuration from './../configuration';

export default Base.extend({

  basePath: Ember.computed(function() {
    return Configuration.sessionBasePath;
  }),

  
  restore() {
    return Ember.RSVP.reject();
  },

  authenticate(options) {
    return Ember.$.ajax({
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
    return Ember.$.ajax({
      url: this.get('basePath') + '/current',
      type: 'DELETE',
      headers: {
        'Content-Type': 'application/vnd.api+json'
      }
    });
  }
});
