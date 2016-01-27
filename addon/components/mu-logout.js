import Ember from 'ember';
import layout from '../templates/components/mu-logout';
import MuLogoutMixin from 'ember-mu-login/mixins/mu-logout';

export default Ember.Component.extend(MuLogoutMixin, {
  layout: layout,
  classNames: ['mu-logout']
});
