var ENV_VAR = 'SENTRY_DSN';

function stripPrivateKey(sentryDSN) {
  if (sentryDSN) {
    // https://foo:bar@app.getsentry.com/baz - we want everything but ':bar'
    return sentryDSN.replace(/:\w+/, '');
  }
}

function initializeRaven() {
  var sentryDSN = process.env[ENV_VAR];
  if (sentryDSN) {
    RavenLogger.initialize({
      server: sentryDSN
    }, {
      patchGlobal: function(isLogged, message) {
                     console.log("Uncaught exception: ", message);
                     process.exit(1);
                   }
    });
  }
}

Meteor.methods({
  getSentryDSN: function() {
    return stripPrivateKey(process.env[ENV_VAR]);
  }
});

initializeRaven();
