export default {
  files: ['tests/unit/**/*'],
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
