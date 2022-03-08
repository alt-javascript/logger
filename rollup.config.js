export default [
  // Monolithic ESM bundle for browsers and demo.
  {
    input: 'index.js',
    treeshake: true,
    output: {
      file: 'dist/alt-javascript-logger-esm.js',
      format: 'esm',
      strict: false,
      externalLiveBindings: false,
      freeze: false,
      sourcemap: true,
      sourcemapExcludeSources: true,
    },
  },
  {
    input: 'index-browser.js',
    treeshake: true,
    output: {
      file: 'dist/test-esm.js',
      format: 'esm',
      strict: false,
      externalLiveBindings: false,
      freeze: false,
      sourcemap: true,
      sourcemapExcludeSources: true,
    },
  },
  {
    input: 'index-browser.js',
    treeshake: true,
    output: {
      file: 'dist/test-iife.js',
      format: 'iife',
      name: 'alt',
      strict: false,
      externalLiveBindings: false,
      freeze: false,
      sourcemap: true,
      sourcemapExcludeSources: true,
    },
  },
  {
    input: 'index.js',
    treeshake: true,
    output: {
      file: 'dist/alt-javascript-logger-umd.js',
      name: 'alt',
      format: 'umd',
      strict: false,
      externalLiveBindings: false,
      freeze: false,
      sourcemap: true,
      sourcemapExcludeSources: true,
    },
  },
];
