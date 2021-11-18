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
        Accept: 'application/vnd.api+json',
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

  async restore(/* data */) {
    const headers = new Headers({
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json'
    });

    this.enrichHeadersOnFastboot(headers);
    const result = await fetch(`${this.basePath}/current`, {
      method: 'GET',
      headers
    });

    if (result.ok) {
      return result.json();
    } else {
      throw result;
    }
  }

  async invalidate() {
    const headers = new Headers({
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json'
    });
    this.enrichHeadersOnFastboot(headers);

    const result = await fetch(`${this.basePath}/current`, {
      method: 'DELETE',
      headers
    });

    if (result.ok)
      return result;
    else
      throw result;
  }

  enrichHeadersOnFastboot(headers) {
    // note we don't inject the service because we also support apps without fastboot
    const fastboot = getOwner(this).lookup('service:fastboot');
    if (fastboot && fastboot.isFastBoot) {
      const fastbootHeaders = fastboot.request.headers;
      // note that this only works on fastboot, cookie is a forbidden header in the browser
      headers.append('Cookie', fastbootHeaders.get('Cookie'));
    }
  }
}
