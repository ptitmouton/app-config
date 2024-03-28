export type ConfigSchema = {
  [key: string]: ConfigField;
};

export type ConfigField = {
  fallback?: string;
  convert?: PossibleConversion;
};

export type PossibleConversion = 'number' | 'boolean' | 'string-array';
