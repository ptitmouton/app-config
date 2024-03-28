import { AppConfig } from './AppConfig.js';
import { assertType, describe, expectTypeOf, it } from 'vitest';

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

describe('AppConfig typings', () => {
  it('should have the correct typings for the keys', () => {
    // @ts-expect-error name is a string
    assertType(getConfig({}).get('DOES_NOT_EXIST'));
  });

  it('should correctly infer the type of the value', () => {
    expectTypeOf(getConfig({}).get('FOO')).toEqualTypeOf<string>();
    expectTypeOf(getConfig({}).get('BAR')).toEqualTypeOf<string>();
    expectTypeOf(getConfig({}).get('COUNT')).toEqualTypeOf<number>();
    expectTypeOf(getConfig({}).get('TAGS')).toEqualTypeOf<string[]>();
    expectTypeOf(getConfig({}).get('IS_IMPORTANT')).toEqualTypeOf<boolean>();
  });
});
