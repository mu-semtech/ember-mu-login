import Ember from 'ember';
import layout from '../templates/components/mu-login';
import MuLoginMixin from 'ember-mu-login/mixins/mu-login';

export default Ember.Component.extend(MuLoginMixin, {
  layout: layout,
  classNames: ['mu-login'],
  didInsertElement() {
    Ember.$('body').addClass('login-body');
  },
  willDestroyElement() {
    Ember.$('body').removeClass('login-body');
  }
});
