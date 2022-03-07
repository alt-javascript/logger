export default [
  // Monolithic ESM bundle for browsers and deno.
  {
    input: 'modules/index.js',
    treeshake: true,
    output: {
      file: 'alt-javascript-logger-esm.js',
      format: 'esm',
      strict: false,
      externalLiveBindings: false,
      freeze: false,
      sourcemap: true,
      sourcemapExcludeSources: true,
    },
  },
  {
    input: 'modules/index.js',
    treeshake: true,
    output: {
      file: 'alt-javascript-logger-umd.js',
      name: 'alt-javascript-logger-umd',
      format: 'umd',
      strict: false,
      externalLiveBindings: false,
      freeze: false,
      sourcemap: true,
      sourcemapExcludeSources: true,
    },
  },
];
