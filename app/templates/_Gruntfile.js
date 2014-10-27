module.exports = function (grunt) {

  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'http-server': {
      'dev': {
        root: '.',
        port: (process.env.PORT || 8282),
        host: "127.0.0.1",
        showDir: true,
        autoIndex: true,
        ext: 'html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-http-server');

};
