/// <binding AfterBuild='createpackage' ProjectOpened='bower:install' />
module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
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
				separator: "\n"
			},
			definitions: {
				files: {
					"../../package/ts/meetingmole.d.ts": ["js/compiled/*.d.ts", "!js/compiled/app.d.ts"]
				}
			}
		},
		uglify: {
			options: {
				sourceMap: true,
				mangle: true,
				banner: "/*\n * MeetingMole API JavaScript Client v<%= pkg.version %>\n"
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
		/*,
		jsdoc: {
			all: {
				src: ["ts/*.ts", "!ts/*.d.ts"],
				options: {
					destination: 'doc',
					configure:"jsdoc.conf.json"
				}
			}
		}*/
	});

	grunt.loadNpmTasks("grunt-bower-task");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-concat");
	//grunt.loadNpmTasks("grunt-jsdoc");

	// Register alias tasks
	grunt.registerTask("createpackage", ["cssmin:all", "uglify:all", "clean:package", "copy:package", "concat:definitions" ]);
	grunt.registerTask("all", ["bower:install", "createpackage"]);
};
