/*jshint node:true*/
module.exports = {
  description: '',

  normalizeEntityName: function() {},

  beforeInstall: function(options) {
    return this.addPackageToProject('ember-simple-auth', '~1.1');
  }
};
