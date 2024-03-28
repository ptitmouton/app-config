import { ConfigSchema } from './ConfigSchema.js';

export type AppConfigSchemaKey<S extends ConfigSchema> = keyof S;
export type AppConfigSchemaKeyDescriptor<
  S extends ConfigSchema,
  K extends AppConfigSchemaKey<S>,
> = S[K];
type AppConfigSchemaValue<
  S extends ConfigSchema,
  K extends AppConfigSchemaKey<S>,
> =
  AppConfigSchemaKeyDescriptor<S, K> extends { convert: 'number' }
    ? number
    : AppConfigSchemaKeyDescriptor<S, K> extends { convert: 'boolean' }
      ? boolean
      : AppConfigSchemaKeyDescriptor<S, K> extends {
            convert: 'string-array';
          }
        ? string[]
        : AppConfigSchemaKeyDescriptor<S, K> extends { fallback: infer F }
          ? F
          : string;

export type AppConfigOptions = { environment?: Record<string, string> };

export class AppConfig<S extends ConfigSchema> {
  public schema: S;

  protected environment = process.env as Record<string, string>;

  constructor(schema: S, options: AppConfigOptions = {}) {
    this.schema = schema;

    if (options.environment) {
      this.environment = options.environment;
    }
  }

  keys(): AppConfigSchemaKey<S>[] {
    return Object.keys(this.schema) as AppConfigSchemaKey<S>[];
  }

  get<K extends AppConfigSchemaKey<S>>(key: K): AppConfigSchemaValue<S, K> {
    const rawValue =
      key in this.environment ? this.environment[key as string] : null;

    if (!(key in this.schema)) {
      throw new Error(`Unknown key: ${key as string}`);
    }

    if (rawValue === null && !('fallback' in this.schema[key])) {
      throw new Error(
        `Missing required environment variable: ${key as string}`,
      );
    }

    const rawFallbackValue = this.schema[key].fallback as string;

    const stringValue = rawValue ?? rawFallbackValue;

    if ('convert' in this.schema[key]) {
      const conversion = this.schema[key].convert!;

      if (conversion === 'number') {
        return Number(stringValue) as AppConfigSchemaValue<S, K>;
      }

      if (conversion === 'boolean') {
        return (stringValue === 'true' ||
          stringValue === '1') as AppConfigSchemaValue<S, K>;
      }

      if (conversion === 'string-array') {
        return stringValue.split(',') as AppConfigSchemaValue<S, K>;
      }
    }

    return stringValue as AppConfigSchemaValue<S, K>;
  }
}
