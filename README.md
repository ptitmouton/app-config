# @ptitmouton/app-config

AppConfig is a leightweight and type-safe app configuration tool.

Its goal is to add more type-safety to those `process.env`-Calls, which can start
to be daunting when they grow too fast.

It's just a little utility I figured was good for me so it could be good for others.

## Changelog

The changelog can be found on the [Releases page](/releases).

## license

The software is distributed under [LGPLv3 license](License.md).

## Usage

Create a file `config.ts` in your application:

```typescript
import { createConfig } from '@ptitmouton/app-config';

export const config = createConfig({
  PUBLIC_URL: {},
  PORT: {
    fallback: '3000',
    convert: 'number',
  },
  DEBUG_MODE: {
    fallback: 'false',
    convert: 'boolean',
  },
  FLAG_LIST: {
    fallback: 'one,two',
    convert: 'string-array',
  },
});
```

Now, import the object and use your type-safe config.
If an environment variable is not available and no fallback
has been set in the configuration, the application will crash.

```typescript
import { createServer } from 'node:http';
import { config } from 'config.js'; // Your config module from above
import { createConnectApp } from './app.js';

const debugMode = config.get('DEBUG_MODE'); // typescript infers a boolean
// > false
const featureFlags = config.get('FLAG_LIST'); // typescript infers a string[]
// > ["one", "two"]

const app = createConnectApp(debugMode, featureFlags);

createServer(app).listen(config.get('PORT'), () => {
  console.log(`Web server is listening on localhost:${PORT}`);
});
```
