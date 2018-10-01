#How to use

Clone this repo and then in command line type:

* `npm install` or `yarn` - install all dependencies
* `gulp` - run dev-server and let all tasks

-------------------------------------------------------

## List of Gulp tasks

To run separate task type in command line `gulp [task_name]`.

### Main tasks
Task name          | Description                                                      
:------------------|:----------------------------------
`default`          | will start all tasks required by project in dev mode: initial build, watch files, run server with livereload
`babel`            | will start babel task 
`sass`             | will start sass task 
`browser-sync`     | will start browsersync task
`mincss`           | will start gulp-cssmin task

### Other tasks
Task name          | Description                                                      
:------------------|:----------------------------------
`sass` 	           | compile .sass/.scss to .css. We also use [postcss](https://github.com/postcss/postcss) for
                   |   [autoprefixer](https://github.com/postcss/autoprefixer) and [Lost]                       
                   |     (https://github.com/peterramsing/lost), so feel free to include other awesome postcss            
                   |     [plugins](https://github.com/postcss/postcss#plugins) when needed
`babel`            | compile src/js/*, es6 transform in es2015 [https://babeljs.io/)
`browsersync`      | run dev-server watch changes js, css, html files powered by [BrowserSync]                                                 (https://www.browsersync.io/)
`mincss`           | run minification css file style.css                                                                                       (https://www.npmjs.com/package/gulp-cssmin)


_ All available tasks are placed in a folder `./gulp/tasks` as separate *.js files. Usually, file name = task name._






