import { BaseSchema } from '../../helpers/types';

export type FeatureGeneratorSchema = BaseSchema & {
  scope: string;
  name: string;
  prefix: string;
  skipComponent: boolean;
  skipRouting: boolean;
  skipTestsConfig: boolean;
};
