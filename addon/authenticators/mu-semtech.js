import Base from 'ember-simple-auth/authenticators/base';
import fetch, { Headers } from 'fetch';
import { getOwner } from '@ember/application';

export default class MuSemtechAuthenticator extends Base {
  constructor() {
    super(...arguments);
    const config = getOwner(this).resolveRegistration('config:environment');
    this.basePath = config['basePath'] || '/sessions';
  }

  async authenticate(options) {
    const result = await fetch(this.basePath, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/vnd.api+json'
      }),
      body: JSON.stringify({
        data: {
          type: 'sessions',
          attributes: {
            nickname: options['nickname'],
            password: options['password']
          }
        }
      })
    });

    if (result.ok) {
      return result.json();
    } else {
      const response = await result.json();
      throw response;
    }
  }

  async restore(data) {
    const result = await fetch(`${this.basePath}/current`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/vnd.api+json'
      })
    });

    if (result.ok) {
      return result.json();
    } else {
      throw result;
    }
  }

  async invalidate() {
    const result = await fetch(`${this.basePath}/current`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/vnd.api+json'
      })
    });

    if (result.ok)
      return result;
    else
      throw result;
  }
}
