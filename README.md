# Ember-mu-login

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Graveyard
```
    sessionAuthenticationSucceeded() {
      console.log('Login succeeded');
      return true;
    },
    sessionAuthenticationFailed(error) {
      console.log('Login failed');
      message = JSON.parse(error.responseText).errors[0].title;
      this.set('controller.errorMessage', message);
    }
```
