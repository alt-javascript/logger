export default [
  // Monolithic ESM bundle for browser module implementation.
  {
    input: 'index-browser.js',
    treeshake: true,
    output: {
      file: 'dist/alt-javascript-logger-esm.js',
      format: 'esm',
      strict: false,
      externalLiveBindings: false,
      freeze: false,
      sourcemap: false,
      sourcemapExcludeSources: true,
    },
  },
  // IIFE bundle for browsers global import.
  {
    input: 'LoggerFactory.js',
    treeshake: true,
    output: {
      file: 'dist/alt-javascript-loggerfactory-iife.js',
      format: 'iife',
      name: 'LoggerFactory',
      strict: false,
      externalLiveBindings: false,
      freeze: false,
      sourcemap: false,
      sourcemapExcludeSources: true,
    },
  },
];
