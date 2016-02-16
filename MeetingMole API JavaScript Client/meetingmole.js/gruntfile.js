/// <binding AfterBuild='cssmin:all, uglify:all, copypackage' ProjectOpened='bower:install' />
module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
					src: "**/meetingmole.js",
					expand: true,
					dest: "../../package/"
				},
					{
						cwd: "",
						src: "bower.json",
						dest: "../../bower.json"
					},
					{
						cwd: "",
						src: "typings.json",
						dest: "../../typings.json"
					}
				]
			}
		},
		clean: {
			options: { force: true },
			'package': "../../package"
		},
		concat: {
			options: {
				separator: '\n'
			},
			definitions: {
				files: {
					"../../package/ts/meetingmole.d.ts": ["js/compiled/*.d.ts"]
				}
			}
		},
		uglify: {
			options: {
				sourceMap: true,
				mangle: true,
				banner: '/*\n * MeetingMole API JavaScript Client v<%= pkg.version %>\n'
					+ " * Copyright 2015-2016 MeetingMole GmbH. All Rights Reserved.\n"
					+ " * More info, documentation and source: https://github.com/meetingmole/meetingmole.js\n"
					+ "*/"
			},
			all: {
				files: {
					"js/min/meetingmole.js": ["js/compiled/**/*.js", "!app.js"]
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-bower-task");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	//grunt.loadNpmTasks("grunt-contrib-compress");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-concat");

	// Register alias tasks
	grunt.registerTask("all", ["bower:install", "cssmin:all", "uglify:all"]);
	grunt.registerTask("createpackage", ["all", "copy:package"]);
	grunt.registerTask("copypackage", ["clean:package", "copy:package", "concat:definitions"]);
};
