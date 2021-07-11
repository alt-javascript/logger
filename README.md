[![NPM](https://nodei.co/npm/config.svg?downloads=true&downloadRank=true)](https://nodei.co/npm/config/)&nbsp;&nbsp;
![Language Badge](https://img.shields.io/github/languages/top/craigparra/alt-logger)
![Package Badge](https://img.shields.io/npm/v/@alt-javascript/logger)
# <a name="home"></a>@alt-javascript/logger

A simple configurable logging facade for javascript, using the popular [config](https://www.npmjs.com/package/config)
package interface.

## Usage

To use the module, import the LoggerFactory and call the `getLogger` function with a logging category (your module 
requires path is a sensible choice).

```javascript
const {LoggerFactory} = require('@alt-javascript/logger');
const logger = LoggerFactory.getLogger('@myorg/mypackage/MyModule');

logger.info('Hello world!');
```
The LoggerFactory will create a ConsoleLogger (uses `console.log('...')`) object instance, with the root logging level 
set to `info` by default.  To change the logging level for your module (category), add something similar to the
following in your [config](https://www.npmjs.com/package/config) files.

`local-development.json`
```json
{
  "logger" : {
     "level" : {
       "/" : "info",
       "@myorg/mypackage/MyModule" : "debug"
     }
  }
}
```

The logger supports the following levels by default, but is fully configurable.

```javascript
{
  ENUMS: {
    fatal: 0, error: 1, warn: 2, info: 3, verbose: 4, debug: 5,
  },
  DEBUG: 'debug',
  VERBOSE: 'verbose',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  FATAL: 'fatal',
}
```

You can test if a level is enabled for your module (category), for example.

```javascript
if (logger.isDebugEnabled()){
    logger.debug(`This a performance impacting logline => ${costlyFunction()}`)
}
```
## Configuring

While the LoggerFactory uses sensible defaults, it is flexible and pluggable.  To use the popular 
[winston](https://www.npmjs.com/package/winston) package you can pass a `WinstonLogger` provider to the `getLogger`
function, passing it your winston options (nullish options will fall back to defaults).

>Be aware [winston](https://www.npmjs.com/package/winston) is not included as a package dependency for 
> [@alt-javascript/logger](https://www.npmjs.com/package/@alt-javascript/logger) to keep it light-weight.
    

```javascript
const {LoggerFactory,WinstonLogger} = require('@alt-javascript/logger');
const logger = LoggerFactory.getLogger('@myorg/mypackage/MyModule', new WinstonLogger({/*mywinstonoptions*/}));

logger.info('Hello world!');
```
    