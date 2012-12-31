# grunt-lint-inline

Grunt task for linting inline javascript.

## Getting started

```
npm install https://github.com/oxyc/grunt-lint-inline
```

```javascript
grunt.loadNpmTasks('grunt-lint-inline');
```

## Usage

The task works great as a replacement for the regular lint task, if a target
filename has an extension and it is not .js or .json it will only lint code
inside script tags. Otherwise it will default to the regular grunt lint task.

Jshint options will be read exactly the same as the lint task.

### Separate task

```javascript
'lint-inline': {
  html: ['**/*.html']
}
```

### Replace grunt lint

```javascript
grunt.initConfig({
  lint: {
    node: ['grunt.js', 'lib/*.js'],
    html: ['**/*.html']
  }
});
grunt.loadNpmTasks('grunt-lint-inline');
grunt.renameTasks('lint', 'grunt-lint');
grunt.renameTasks('lint-inline, 'lint');
```

## License

MIT License
(c) 2012 "Cowboy" Ben Alman

...with minor modifications from Oskar Schöldström
