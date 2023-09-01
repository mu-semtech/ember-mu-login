import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { warn } from '@ember/debug';

export default class MuLoginComponent extends Component {
  @service session;

  @tracked isAuthenticating = false;
  @tracked errorMessage;
  @tracked nickname;
  @tracked password;

  get forbiddenMessage() {
    return (
      this.args.forbiddenMessage || "You don't have access to this application"
    );
  }

  get failureMessage() {
    return (
      this.args.failureMessage ||
      'Something went wrong. Please try again later.'
    );
  }

  get label() {
    return this.args.label || 'Login';
  }

  @action
  async login(e) {
    e.preventDefault(); // prevent default submit behaviour

    this.isAuthenticating = false;
    this.errorMessage = null;

    try {
      this.isAuthenticating = true;
      await this.session.authenticate('authenticator:mu-semtech', {
        nickname: this.nickname,
        password: this.password,
      });
    } catch (e) {
      warn(e.message || JSON.stringify(e), { id: 'authentication.failure' });

      if (e.errors && e.errors.length && e.errors[0].title) {
        this.errorMessage = e.errors[0].title;
      } else {
        if (e.status == 403) this.errorMessage = this.forbiddenMessage;
        else this.errorMessage = this.failureMessage;
      }
    } finally {
      this.isAuthenticating = false;
    }
  }
}
