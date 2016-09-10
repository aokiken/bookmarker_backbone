module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'power-assert'],
    files: [
      'test/**/*.js'
    ],
    exclude: [],
    preprocessors: {},
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox'],
    singleRun: true,

    concurrency: Infinity
  });
  if (process.env.TRAVIS) {
    var configuration = {
      customLaunchers: {
        chromeTravisCi: {
          base: 'Chrome',
          flags: ['--no-sandbox']
        }
      },
      browsers: ['chromeTravisCi']
    };
    config.set(configuration);
  }
};