var grunt = require('grunt')
  , lintinline = require('../tasks/lib/lint-inline')
  , jshint = require('grunt-contrib-jshint/tasks/lib/jshint').init(grunt)
  , path = require('path')
  , fs = require('fs')
  , fixtures = path.join(__dirname, 'fixtures');

exports.inlinelint = {
  'test-1': function (test) {
    test.expect(4);
    var files = [path.join(fixtures, 'fail.html')];
    var options = {};
    var tempFiles = lintinline.wrapReporter(jshint, options, files);

    jshint.lint(tempFiles, options, function (results, data) {
      test.equal(results[0].file, files[0], 'Should use real filepaths in `results`');
      test.equal(results[0].error.code, 'W033', 'Should detect errors');
      test.equal(data[0].file, files[0], 'Should use real file paths in `data`');
      test.ok(results.length === 2, 'Should check all `<script>` tags');
    });
    test.done();
  },
  'test-2': function (test) {
    test.expect(1);
    var files = [path.join(fixtures, 'pass.html')];
    var options = {};
    var tempFiles = lintinline.wrapReporter(jshint, options, files);

    jshint.lint(tempFiles, options, function (results, data) {
      test.ok(results.length === 0, 'Should validate correct files.');
    });
    test.done();
  },
  'test-3': function (test) {
    test.expect(1);
    var files = [path.join(fixtures, 'fail.html')];
    var options = {};
    var tempFiles = lintinline.wrapReporter(jshint, options, files);

    jshint.lint(tempFiles, options, function (results, data) {
      tempFiles.forEach(function (file, index) {
        test.ok(!fs.existsSync(file), 'Should delete temporary files');
      });
      test.done();
    });
  },
  'test-4': function (test) {
    test.expect(1);
    var files = [path.join(fixtures, 'fail.html')];
    var expected = 9; // hard coded but what to do?
    var options = {};
    var tempFiles = lintinline.wrapReporter(jshint, options, files);

    jshint.lint(tempFiles, options, function (results, data) {
      test.equal(expected, results[0].error.line, 'Should report line numbers in original file');
    });
    test.done();
  }
};
