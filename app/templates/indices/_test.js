// test.js
require.config({
    baseUrl: 'js',
    paths: {
      jschannel: '../bower_components/jschannel/src/jschannel'
    },
    shim: {
      jschannel: {
        exports: 'Channel'
      }
    }
});

require(['jschannel'], function (Channel) {

  'use strict';

  var chan = Channel.build({
    window: window.document.getElementById('child').contentWindow,
    origin: '*',
    scope: 'CurrentStep'
  });

  chan.call({
    method: 'configure',
    params: {
      greeting: 'Hello <%= name %>'
    },
    success: function () {
      console.log("Tool configured");
      init();
    },
    error: function (e) {
      console.log("configuration failed because: " + e);
    }
  });

  function init () {
    chan.call({
      method: 'init',
      params: {
        name: 'You'
      },
      success: function () {
        console.log("Tool initialised");
      },
      error: function (e) {
        console.log("initialisation failed because: " + e);
      }
    });
  }

  var head = document.getElementsByTagName("head")[0];
  var links = document.getElementsByTagName("link");
  var i, l, styles = [];
  for (i = 0, l = links.length; i < l; i++) {
    chan.call({
      method: 'style',
      params: { stylesheet: links[i].href },
      success: function () {
        console.log("Applied stylesheet");
      },
      error: function (e) {
        console.log(e);
      }
    });
  }

  chan.bind('response', function (trans, params) {
    document.getElementById('response').innerHTML = params.response;
  });

});

