import { AppConfig } from './AppConfig.js';
import { describe, expect, it } from 'vitest';

const getConfig = (environment?: Record<string, string>) =>
  new AppConfig(
    {
      FOO: {},
      BAR: { fallback: 'BarValue' },
      COUNT: { convert: 'number' },
      TAGS: { convert: 'string-array' },
      IS_IMPORTANT: { convert: 'boolean', fallback: 'true' },
    },
    { environment },
  );

describe('AppConfig', () => {
  it('should return the keys of the schema', () => {
    const config = getConfig();
    expect(config.keys()).toEqual([
      'FOO',
      'BAR',
      'COUNT',
      'TAGS',
      'IS_IMPORTANT',
    ]);
  });

  it('should throw an error if non-optional value is not present', () => {
    const config = getConfig();
    expect(() => config.get('FOO')).toThrowError();
  });

  it('should return the fallback value if present', () => {
    const config = getConfig();
    expect(config.get('BAR')).toBe('BarValue');
  });

  it('should return the environment value if present', () => {
    const config = getConfig({ FOO: 'FooValue' });
    expect(config.get('FOO')).toBe('FooValue');
  });

  describe('conversion', () => {
    it('should convert a string to a number', () => {
      const config = getConfig({ COUNT: '42' });
      expect(config.get('COUNT')).toBe(42);
    });

    it('should convert a string to a boolean', () => {
      expect(getConfig({ IS_IMPORTANT: 'true' }).get('IS_IMPORTANT')).toBe(
        true,
      );
      expect(getConfig({ IS_IMPORTANT: '1' }).get('IS_IMPORTANT')).toBe(true);
      expect(getConfig({ IS_IMPORTANT: '0' }).get('IS_IMPORTANT')).toBe(false);
      expect(getConfig({ IS_IMPORTANT: 'false' }).get('IS_IMPORTANT')).toBe(
        false,
      );
    });

    it('should convert a string to a string array', () => {
      const config = getConfig({ TAGS: 'one,two,three' });

      expect(config.get('TAGS')).toEqual(['one', 'two', 'three']);
    });
  });
});
