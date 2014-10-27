define(function (require, exports, module) {

  'use strict';

  var Backbone = require('backbone');
  var _ = require('underscore');

  var defaultGreeting = 'Bonjour <%= name %>!';

  var Tool = module.exports = Backbone.View.extend({

    initialize: function (options) {
      this.model = new Backbone.Model(options.data || {});
      this.template = _.template(options.config.greeting || defaultGreeting);
    },

    events: function () {
      return {
        'click .btn-primary': this.respond.bind(this, 'POSITIVE'),
        'click .btn-warning': this.respond.bind(this, 'NEGATIVE')
      }
    },

    respond: function (response) {
      this.trigger('message', 'response', {response: response});
    },

    render: function () {
      var greeting = document.createElement('div');
      greeting.innerHTML = this.template(this.model.toJSON());
      this.el.appendChild(greeting);
      this.$el.append('<div class="btn-group">' +
        '<button class="btn btn-primary">Thanks</button>' +
        '<button class="btn btn-warning">No thanks</button>' + 
        '</div>');
      this.trigger('rendered');
    }
  });

});
