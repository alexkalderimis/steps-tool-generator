'use strict';

var util = require('util');
var path = require('path');
var _ = require('lodash');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var IntermineStepGenerator = module.exports = yeoman.generators.Base.extend({

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the tremendous Intermine Step generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Tool name:'
    }];

    this.prompt(prompts, function (props) {
      _.assign(this, props);

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var tool = this.name;
      this.dest.mkdir(tool);
      this.destinationRoot(this.destinationRoot() + '/' + tool);
      this.dest.mkdir('js');
      this.dest.mkdir('indices');

      // The files below should not have interpolation.
      this.src.copy('_Gruntfile.js', 'Gruntfile.js');
      this.src.copy('_tool.html', 'tool.html');
      this.src.copy('_test.html', 'index.html');
      this.src.copy('js/_main.js', 'js/main.js');
      this.src.copy('indices/_tool.js', 'indices/tool.js');
      this.src.copy('indices/_test.js', 'indices/test.js');
      // The files below need interpolation.
      this.copy('_package.json', 'package.json');
      this.copy('_bower.json', 'bower.json');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
    }
  },

  end: function () {
    this.installDependencies();
  }
});

