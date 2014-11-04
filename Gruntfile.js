module.exports = function(grunt) {

//var mozjpeg = require('imagemin-mozjpeg');		//imagemin

	grunt.initConfig({	//definição das tarefas de acordo com documentação
		
		pkg: grunt.file.readJSON('package.json'),

		
		htmlmin: {                                     // Task
		    dist: {                                      // Target
		      options: {                                 // Target options
		        removeComments: true,
		        collapseWhitespace: true
		      },
		      files: {                                   // Dictionary of files
		        'dist/index.html': 'index.html',     // 'destination': 'source'
		        
		      }
		    }
		},
		


		
		jshint: {
		  // define the files to lint
		  files: ['gruntfile.js', 'dev/**/*.js', 'test/**/*.js'],
		  // configure JSHint (documented at http://www.jshint.com/docs/)

		  options: {
		      // more options here if you want to override JSHint defaults
		    globals: {
		      jQuery: true,
		      console: true,
		      module: true
		    }
		  }
		},
		



	//minifica e concatena arquivos js
		uglify : {
				//de acordo com a doc. 	O “my_target” são as configurações dos arquivos que serão minificados. Não precisa ser “my_target”. Ali você pode colocar o nome que preferir.
			  	options: {
			  		
			  		mangle : false,  //para evitar alterações nas suas variáveis ​​e nomes de função
			    	// the banner is inserted at the top of the output - //Faixa de texto antes do conteúdo minificado
			    	banner: '/*! <%= pkg.name %> - <%= pkg.homepage  %> - <%= grunt.template.today("yyyy-mm-dd") %>*/\n'
			  	},

			  	//Dentro de my_target, em “files”, você passa os arquivos para minificar. 
			  	//Primeiro você passa o destino (assets/js/main.js) e depois os arquivos de origem, na ordem em que devem ser minificados, no formato array.	
			  	myTargets:{
			  	   	files: {
			    		//destino : origem
			    		'dist//<%= pkg.name %>.min.js' : ['dev/_js/*.js']
			    		//'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
			      	}
			  	}
		    
		   /*outra sintaxe
		    build: {
	      		src: 'origem/*.js',
	      		dest: 'destino/<%= pkg.name %>.min.js'
	    	}*/
		}, // uglify




		/*vários outros
			browsersinc? //sincronizar browser para diversos dispositivos...
			pagespeed
			rsync //pega o arquivo de um lugar e manda pra outro (enviar para o servidor)
		*/


		/*
		coffee:{
			options:
				bare:
				join:
			compile:
				files:
		},
		*/


		/*
		//spritesmith
			sprite:{
				all:{
					src: 'dev/img/sprites/'.png',
					destimg: 'dev/img/ico-general.png1,
					destiCSS: 'dev/sass/sprites.scss',
					cssFormat: 'css'
				}
			}

		*/

		

		/*	
		cssmin:{
			minify:{	//de acordo com a doc. 	
				files:{
					"out/css/main.css": "scr/css/master.css"
				}
			}
		},
		*/

		

		/*
		qunit: {
		  files: ['test/asteriscoAkiasteriscoAki/asteriscoAki.html']
		},
		*/


		/*
		watch: {		//fica olhando o diretório, e se algum arquivo mudar, ele roda a configuração, por exemplo toda vez q o arquivo mudar, gera a versão de produção... ou toda vez q uma nova imagem for colocada na pasta, ela será otimizada
		  files: ['<%= jshint.files %>'],
		  tasks: ['jshint', 'qunit']
		},
		*/



		concat : {

			options : {
		    	//Define a string to put between each file in the concatenated output
			   // separator: '\n\n/*========================*/\n\n'    
			    separator : ';', //you may need to use a semicolon ';' as the separator.
			    banner : "\n/*teste banner*/\n",
			    footer : '\n/*teste footer*/\n',
			    sourceMap: false,

			    stripBanners: true,
      			banner: '\n/*! <%= pkg.name %> - v<%= pkg.version %> - '+'<%= grunt.template.today("yyyy-mm-dd") %> */\n',
			},
	        
	        js : {
	            src : [
	            	// the files to concatenate
					//'libs/vendors//**/*.js'
					'dev/libs/vendors/jQuery/jquery-1.11.1.min.js', 
	            	'dev/libs/vendors/bootstrap/js/bootstrap.min.js'
	            ],
	            // the location of the resulting JS file
	            dest : 'deploy/js/app.js'
	        },

	        css : {
	            src : [
	            	'dev/css/sass/estilo.scss', 
	            	'libs/vendors/bootstrap/css/bootstrap.min.css'
	            ],
	            dest : "deploy/<%= pkg.name %>_allStyles.css"
	        }

		},




		sass: {                              // Task
		    dist: {                            // Target
			    options: {                       // Target options
			        style: 'expanded'		//compressed, expanded, compact, 
			    },

			    files: {                         // Dictionary of files
			        'deploy/estilo_1.css': 'dev/css/sass/estilo.scss'       // 'destination': 'source'
			        
			    }
		    }
		  },		// sass


		//otimização de imagens
		/*
		imagemin: {                          // Task
		    static: {                          // Target
		      	options: {                       // Target options
		        	optimizationLevel: 3,		//de 1 a 7
		        	svgoPlugins: [{ removeViewBox: false }],
		        	use: [mozjpeg()]
		    	},

			    files: {                         		// Dictionary of files
			    	'deploy/img/mapa.jpg': 'dev/img/mapa.jpg', 		// 'destination': 'source'
			        'deploy/img/img.png': 'dev/img/img.png', 		// 'destination': 'source'
			        'dist/img.jpg': 'src/img.jpg',
			        'dist/img.gif': 'src/img.gif'
			      }
			    },

		    dynamic: {                         // Another target
		      files: [{
		        expand: true,                  // Enable dynamic expansion
		        cwd: 'src/',                   // Src matches are relative to this path
		        src: ['asteriscoAkiasteriscoAki/asteriscoAki.{png,jpg,gif}'],   // Actual patterns to match
		        dest: 'dist/'                  // Destination path prefix
		      }]
		    }
		},  //end imagemin
		
		  imagemin: {
		    
		    png: {
		      options: {
		        optimizationLevel: 7
		      },
		      
		      files: [
		        {
		          // Set to true to enable the following options…
		          expand: true,
		          // cwd is 'current working directory'
		          cwd: 'deploy/img/',
		          src: ['asteriscoAkiasteriscoAki/asteriscoAki.png'],
		          // Could also match cwd line above. i.e. project-directory/img/
		          dest: 'dev/img/compressed/',
		          ext: '.png'
		        }
		      ]
		    },
		    

		    jpg: {
		      options: {
		        progressive: true
		      },
		      
		      files: [
		        {
		          // Set to true to enable the following options…
		          expand: true,
		          // cwd is 'Current Working Directory'
		          cwd: 'deploy/img/',
		          src: ['dev/img/*.jpg'],
		          // Could also match cwd. i.e. project-directory/img/
		          dest: 'deploy/img/compressed/',
		          ext: '.jpg'
		        }
		      ]
		    }
		  },*/


		  imagemin: {
			    
			    png: {
			        options: {
			            optimizationLevel: 7
			        },
			        files: [
			            {
			                expand: true,
			                cwd: './dev/img/',
			                src: ['**/*.png'],
			                dest: './deploy/img/compressed/',
			                ext: '.png'
			            }
			        ]
			    },

			    jpg: {
			        options: {
			            progressive: true
			        },
			        files: [
			            {
			                expand: true,
			                cwd: './dev/img/',
			                src: ['**/*.jpg'],
			                dest: './deploy/img/compressed/',
			                ext: '.jpg'
			            }
			        ]
			    }
		},



		
	});

	
	//Logo após o grunt.initConfig(), você vai carregar as os plugins do Grunt e criar as tarefas que serão executadas no terminal. O loadNpmTasks carrega o plugin e o registerTask criar a tarefa.
	//ler Plugins do Grunt
	// minificar arquivo - alguns plugins não começam com grunt-contrib, devemos ver documentação
	//grunt.loadNpmTasks('grunt-contrib-uglify');	
	//grunt.loadNpmTasks('grunt-contrib-htmlmin');	//realizando leitura do plugin para minificar o html.
	//grunt.loadNpmTasks('grunt-contrib-cssmin');		
	grunt.loadNpmTasks('grunt-contrib-concat');
	//grunt.loadNpmTasks('grunt-contrib-qunit');
	//grunt.loadNpmTasks('grunt-contrib-jshint');
	//grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	
	// Tarefas que serão executadas - No registerTask, o primeiro parâmetro é o nome da tarefa e o segundo parâmetro é um array com as tarefas que serão executadas ao rodar esse comando.
	// this would be run by typing "grunt test" on the command line
	//grunt.registerTask('test', ['jshint', 'qunit']);
	// the default task can be run just by typing "grunt" on the command line
	//grunt.registerTask('default', ['uglify', 'htmlmin', 'jshint', 'concat']);
	grunt.registerTask('concatenar', ['concat']);
	grunt.registerTask('conv_sass', ['sass']);
	
	grunt.registerTask('imagemin', ['imagemin']); // execute on both .png and .jpg
	grunt.registerTask('imagepng', ['imagemin:png']); // only .png files
	grunt.registerTask('imagejpg', ['imagemin:jpg']);// only .jpg files


};