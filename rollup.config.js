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
  // // Monolithic UMD bundle for browsers, AMD and old Node.js.
  // {
  //     input: 'modules/index-default.js',
  //     treeshake: false,
  //     output: monolithConf({
  //         file: 'underscore-umd.js',
  //         exports: 'default',
  //         format: 'umd',
  //         name: '_',
  //         amd: {
  //             id: 'underscore',
  //         },
  //         noConflict: true,
  //     }),
  // },
  // // Custom builds for Node.js, first pass. Second pass in rollup.config2.js.
  // {
  //     input: {
  //         'underscore-node-cjs-pre': 'modules/index-default.js',
  //         'underscore-node-mjs-pre': 'modules/index.js',
  //     },
  //     treeshake: false,
  //     output: sourcemapConf({
  //         chunkFileNames: 'underscore-node-f-pre.js',
  //         dir: '.',
  //         minifyInternalExports: false,
  //         format: 'esm',
  //     }),
  // },
  // AMD and CJS versions of the individual modules for development
  // and custom bundles.
  {
      input: [
          'modules/CachingConsole.js',
      ],
      preserveModules: true,
      output: [
          outputConf({
              dir: 'amd',
              exports: 'auto',
              format: 'amd',
          }),
          outputConf({
              dir: 'cjs',
              exports: 'auto',
              format: 'cjs',
          }),
      ],
  }
];
