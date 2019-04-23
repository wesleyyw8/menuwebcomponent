module.exports = function(grunt){
  grunt.initConfig({
    jshint: {
       all : ['app/**/*js'],
       options: {
        'esversion': 6,
      }  
    },
    connect: {
      server: {
        options:{
          port: 9000,
          base: 'app',
          keepalive: true,
          open: {
            target: 'http://localhost:9000'
          }
        }    
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('default', ['jshint','connect']);
}