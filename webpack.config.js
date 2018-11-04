const { spawn } = require('child_process');

module.exports = {
  entry: {
    install: './src/install.ts',
    precommit: './src/precommit.ts',
    tests: './test/run-tests.ts'
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  watch: true,
  resolve: {
    extensions: [ '.ts' ]
  },
  output: {
    filename: '[name].js',
    path: __dirname
  },
  target: 'node',
  plugins: [
    {
      apply: compiler => {
        compiler.hooks.afterCompile.tap('jest', compilation => {
          spawn('npm', ['test'], {stdio:'inherit'});
        });
      }
    }
  ]
};