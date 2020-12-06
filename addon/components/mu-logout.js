import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class MuLogoutComponent extends Component {
  @service session;

  get label() {
    return this.args.label || 'Logout';
  }

  @action
  async logout() {
    await this.session.invalidate();
  }
}
