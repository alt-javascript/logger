A Simple Log Facade for JavaScript
===================================

[![NPM](https://nodei.co/npm/@alt-javascript/logger.svg?downloads=true&downloadRank=true)](https://nodei.co/npm/@alt-javascript/logger/)
<br/>
![Language Badge](https://img.shields.io/github/languages/top/craigparra/alt-logger)
![Package Badge](https://img.shields.io/npm/v/@alt-javascript/logger) <br/>
[release notes](https://github.com/craigparra/alt-logger/blob/main/History.md)

<a name="intro">Introduction</a>
--------------------------------
A simple configurable logging facade for JavaScript, using the popular [config](https://www.npmjs.com/package/config)
package interface.

<a name="usage">Usage</a>
-------------------------

### Standalone

To use the module, import the LoggerFactory and call the `getLogger` function with a logging category (your module 
requires path is a sensible choice).

```javascript
import config from 'config';
import { LoggerFactory } from '@alt-javascript/logger';
const logger = LoggerFactory.getLogger('@myorg/mypackage/MyModule',config);

logger.info('Hello world!');
```
The LoggerFactory will create a ConsoleLogger (uses `console.log('...')`) object instance, with the root logging level 
set to `info` by default.  To change the logging level for your module (category), add something similar to the
following in your [config](https://www.npmjs.com/package/config) files.

`local-development.json`
```json
{
  "logging" : {
     "format" : 'json',
     "level" : {
       "/" : "info",
       "@myorg/mypackage/MyModule" : "debug"
     }
  }
}
```

### @alt-javascript/boot

The Logger syntax is more fluent if you combine  
[@alt-javascript/boot](https://www.npmjs.com/package/@alt-javascript/boot) and 
[@alt-javascript/config](https://www.npmjs.com/package/@alt-javascript/config) to bind the LoggerFactory 
to the global root context, freeing your sub-modules from requiring and injecting the config.  

`MyModule.js`
```javascript
import config from '@alt-javascript/config';
import { LoggerFactory } from '@alt-javascript/logger';
import { boot } from '@alt-javascript/boot';
boot({config:config});

```

Then in your application modules, you only need.

`MyModule.js`
```javascript
import { LoggerFactory } from '@alt-javascript/logger';

const logger = LoggerFactory.getLogger('@myorg/mypackage/MyModule');
logger.info('Hello from MyModule!')
```
### Browser

The module is also able to be used directly in the browser, in combination with the config module.
You can either import the LoggerFactory globally as an IIFE (Immediately Invoked Function Expression),
as follows:

```html
   <script src="https://cdn.jsdelivr.net/npm/@alt-javascript/logger/dist/alt-javascript-loggerfactory-iife.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/@alt-javascript/config/dist/alt-javascript-configfactory-iife.js"></script>
   <script>
       var config = ConfigFactory.getConfig({
           logging : {
               format : 'json',
               level : {
                   '/' : 'info',
                   '/MyPage': 'info'
               }
           }
       })
       var logger = LoggerFactory.getLogger('/MyPage',config);
       logger.debug('Hello World');
   </script>
```

Or import the ES6 module bundle from a module, as follows:

```javascript
import { LoggerFactory } from 'https://cdn.jsdelivr.net/npm/@alt-javascript/logger/dist/alt-javascript-logger-esm.js'
import { ConfigFactory } from 'https://cdn.jsdelivr.net/npm/@alt-javascript/logger/dist/alt-javascript-config-esm.js'

//...as above
```

### Log Levels

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
<a name="conf">Configuring</a>
------------------------------

While the module uses sensible defaults, it is flexible and pluggable.  To use the popular 
[winston](https://www.npmjs.com/package/winston) package you can use a `WinstonLoggerFactory`, passing it your 
winston and winston options (nullish options will fall back to defaults).

```javascript
const config = require('config');
const {winston} = require('winston');
const {WinstonLoggerFactory} = require('@alt-javascript/logger');
const logger = WinstonLoggerFactory.getLogger('@myorg/mypackage/MyModule', config, winston,  {/*mywinstonoptions*/}));

logger.info('Hello world!');
```

The `ConsoleLogger` uses a JSONFormatter, but a PlainTextFormatter (or similar implementation) can easily be
substituted in the config by setting the 'logging.format' config value to 'text'

```json
{
  "logging" : {
     "format" : 'text',
     "level" : {
       "/" : "info",
       "@myorg/mypackage/MyModule" : "debug"
     }
  }
}
```

<a name="testing">Testability</a>
-------------------------

Testing loggers is hard, and testability is a first class concern at @alt-javascript so the module exports a 
'CachingLoggerFactory' that will provide a logger implementation that will capture log lines that can be asserted.

```javascript
import config from 'config';
import { CachingLoggerFactory } from '@alt-javascript/logger';
const logger = CachingLoggerFactory.getLogger('@myorg/mypackage/MyModule', config);

logger.info('Hello world!');

//...

assert.isTrue(logger.provider.console.cache[0].contains('Hello world!'))
```

<a name="license">License</a>
-----------------------------

May be freely distributed under the [MIT license](https://raw.githubusercontent.com/craigparra/alt-logger/master/LICENSE).

Copyright (c) 2021-2022 Craig Parravicini    
