module.exports = {
  entry: {
    install: './src/install.ts',
    precommit: './src/precommit.ts'
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
  target: 'node'
};