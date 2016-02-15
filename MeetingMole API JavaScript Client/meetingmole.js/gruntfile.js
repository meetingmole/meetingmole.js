/// <binding AfterBuild='cssmin:all, uglify:all, copy:package' ProjectOpened='bower:install' />
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
	grunt.initConfig({
		bower: {
			install: {
				options: {
					targetDir: "vendor",
					layout: "byComponent",
					cleanTargetDir: false,
					cleanBowerDir: false
				}
			},
			reinstall: {
				options: {
					targetDir: "vendor",
					layout: "byComponent",
					cleanTargetDir: true,
					cleanBowerDir: true
				}
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: true,
				roundingPrecision: -1,
				// Disable sourcemaps because the wrong relative url created by cssmin causes browser errors
				sourceMap: false
			},
			all: {
				files: [{
					expand: true,
					cwd: "css",
					src: "*.css",
					dest: "css/min"
				}]
			}
		},
		copy: {
			'package': {
				files: [
				{
					cwd: "js",
					src: "**/*",
					expand: true,
					dest: "../../package/"
				},
					{
						cwd: "",
						src: "bower.json",
						dest: "../../bower.json"
					}
				]
			}
		},
		uglify: {
			options: {
				sourceMap: true,
				mangle: true
			},
			all: {
				files: [{
					expand: true,
					cwd: "js/compiled",
					src: "**/*.js",
					dest: "js/min"
				}]
			}
		}
	});

	grunt.loadNpmTasks("grunt-bower-task");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-compress");
	grunt.loadNpmTasks("grunt-contrib-cssmin");

	// Register alias tasks
	grunt.registerTask("all", ["bower:install", "cssmin:all", "uglify:all"]);
	grunt.registerTask("createpackage", ["all", "copy:package"]);
};
