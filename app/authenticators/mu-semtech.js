// For some reason this import fails from inside the `addon` code, unless it is included somewhere
// in the `app` directory, so why not here?
import 'ember-simple-auth/authenticators/base';
export { default } from 'ember-mu-login/authenticators/mu-semtech';
