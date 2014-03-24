Raven
============

Raven/Sentry integration for Meteor. Includes raven-js for frontend logging and raven for backend logging.

Provides consolidated error logging to Raven/Sentry from both the client and the server.

This package is MIT Licensed. Do whatever you like with it but any responsibility for doing so is your own.

All rights to raven are with the original authors.

RavenJS: http://raven-js.readthedocs.org/

RavenNode: https://github.com/mattrobenolt/raven-node

Installation
============

In your `smart.json` file:

<pre>
{
  "packages": {
    "raven": {
      "git": "https://github.com/okgrow/meteor-raven.git",
      "branch": "master"
    },
  }
}
</pre>

Then run `mrt install`.

Set your `SENTRY_DSN` environment variable:

<pre>
SENTRY_DSN=https://public_key:private_key@app.getsentry.com/app_id
</pre>

That should be it! If `SENTRY_DSN` is not set, RavenLogger silently doesn't
initialize. If you're using Heroku, this will just work.

Usage
============

Manually log a message:
<pre>
RavenLogger.log('Testing error message');
</pre>

Optionally you can pass a tag:
<pre>
RavenLogger.log('Testing error message', { component: 'system' });
</pre>

Raven also works very well with saving full error and exception stack traces. Simply pass an Error or a Meteor.Error object to the log method to keep the stack trace.
<pre>
RavenLogger.log(new Meteor.Error(422, 'Failed to save object to database'));
</pre>

Notes
=====

Catches these exceptions:

* Any server side exception, except where Meteor swallows exceptions (such as login handlers)
* Client side: Exceptions within Deps.autorun() - except first call. Uncaught exceptions are not currently logged.

TODO
====

* Permit custom configuration (`trackUser`, `patchGlobal` callback, etc).
* Add user info when logging exceptions caught by `patchGlobal` on server side
* Get better error handling in Meteor core, so we can remove the `Meteor._debug` hack
* Tests
