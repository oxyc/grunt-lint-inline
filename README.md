grunt-lint-inline [![Build Status](https://travis-ci.org/oxyc/grunt-lint-inline.png?branch=master)](https://travis-ci.org/oxyc/grunt-lint-inline) [![NPM version](https://badge.fury.io/js/grunt-lint-inline.png)](http://badge.fury.io/js/grunt-lint-inline)
=================

> Grunt task for linting inline JavaScript.

## Getting started

This plugin requires Grunt `>=0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out
the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains
how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as
install and use Grunt plugins. Once you're familiar with that process, you may
install this plugin with this command:

```sh
npm install grunt-lint-inline --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile
with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-lint-inline');
```

## Usage

The task leverages [grunt-contrib-jshint][1] by wrapping around it and removing
all code not within `<script>`-tags.

All options defined in the task will be passed on to JSHint with the exception of those defined under [Additional Options](#options).

```js
grunt.initConfig({
  inlinelint: {
    options: { /* options here */ }
    html: ['**/*.html'],
    php: {
      src: ['**/*.php'],
      options: { /* php-task-specific options here */ }
    }
  }
});
```

### Additional Options<a name="options"></a>

#### patterns

Type: `Array`
Default: `[]`

Enable pattern replacement by sending in an array of objects containing a
`match` property and an (optional) `replacement` property.

Replacements are done inside the script tags and matches are replaced with
provided replacement or defaults to an empty string.

```js
grunt.initConfig({
  inlinelint: {
    cshtml: {
      src: ['**/*.html'],
      options: {
        patterns: [
          {
            match: /([\"|\']?)@\w[\w\.\(\)]+/g,
            replacement: ''
          }
        ]
      }
    }
  }
});
```

#### patterns.match

Type: `RegExp|String`

Indicates the matching expression.

#### patterns.replacement

Type: `String|Function`
Default: `''`

Indicates the replacement for match, for more information about replacement
have a look at [String.replace][2].

## License

MIT

[1]: https://github.com/gruntjs/grunt-contrib-jshint
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
