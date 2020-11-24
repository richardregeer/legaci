export default {
  files: ['tests/unit/**/*'],
  failWithoutAssertions: true,
  verbose: true,
  typescript: {
    rewritePaths: {
      'src/': 'dist/',
    },
    extensions: ['ts'],
  },
  require: ['ts-node/register'],
};
