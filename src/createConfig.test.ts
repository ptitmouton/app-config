import { AppConfig } from './AppConfig';
import { ConfigSchema } from './ConfigSchema.js';
import { createConfig } from './createConfig.js';
import { describe, expect, it } from 'vitest';

describe('createConfig', () => {
  it('should create a Config instance via createConfig', () => {
    const schema = {
      FOO: {},
      BAR: { fallback: 'BarValue' },
      COUNT: { convert: 'number' },
      TAGS: { convert: 'string-array' },
      IS_IMPORTANT: { convert: 'boolean', fallback: 'true' },
    } satisfies ConfigSchema;
    const config = createConfig(schema);

    expect(config).toBeInstanceOf(AppConfig);
    expect(config.keys()).toEqual(new AppConfig(schema).keys());
  });
});
