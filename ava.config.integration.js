export default {
  files: ['tests/integration/**/*'],
  failWithoutAssertions: false,
  verbose: true,
  typescript: {
    rewritePaths: {
      'src/': 'dist/',
    },
    extensions: ['ts'],
  },
  require: ['ts-node/register'],
};
