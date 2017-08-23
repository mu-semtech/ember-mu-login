import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import Configuration from './../configuration';

export default Base.extend({
  ajax: Ember.inject.service(),

  basePath: Ember.computed(function() {
    return Configuration.sessionBasePath;
  }),

  restore(data) {
    return this.get('ajax').request(this.get('basePath') + "/current", {
      type: 'GET',
      dataType: 'json',
      headers: {
        'Content-Type': 'application/vnd.api+json'
      }
    }).then(function(){
      return data;
    });
  },

  authenticate(options) {
    return this.get('ajax').request(this.get('basePath'), {
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
    return this.get('ajax').request(this.get('basePath') + '/current', {
      type: 'DELETE',
      headers: {
        'Content-Type': 'application/vnd.api+json'
      }
    });
  }
});
