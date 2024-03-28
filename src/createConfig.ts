import { AppConfig, AppConfigOptions } from './AppConfig.js';
import { ConfigSchema } from './ConfigSchema.js';

export const createConfig = <S extends ConfigSchema>(
  schema: S,
  options?: AppConfigOptions,
) => new AppConfig(schema, options);
