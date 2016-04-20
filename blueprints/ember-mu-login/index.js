/*jshint node:true*/
module.exports = {
  description: '',

  normalizeEntityName: function() {},

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  beforeInstall: function(options) {
    return this.addPackageToProject('ember-simple-auth', '~1.0');
  }
};
