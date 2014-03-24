function initializeRaven() {
  Meteor.call('getSentryDSN', function(error, sentryDSN) {
    if (error) throw error;
    RavenLogger.initialize({
      client: sentryDSN
    });
    var orig = Meteor._debug;
    Meteor._debug = function() {
      /*
       * `arguments` are usually strings. 0 is the debug message from Meteor,
       * 1 is the stack trace or error message. If it's a stack trace as a
       * string, it will cause raven to receive an error (query string too
       * long), so we will rebuild the Error object so that Raven.js submits
       * it to Sentry properly.
       */
      var buffer = _.reduce(arguments, function(memo, arg) {
        return memo + " - " + arg;
      }, "");
      var err = new Error(buffer);
      RavenLogger.log.call(RavenLogger, err);
      orig.apply(Meteor, arguments);
    };
  });
}

/*
 * This code is here so that it is loaded earliest. Otherwise we may miss
 * some exceptions that occur on load, before the async call comes back.
 */
Meteor.startup(function() {
  initializeRaven();
});
