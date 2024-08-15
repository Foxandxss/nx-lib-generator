import { BaseSchema } from '../../../helpers/types';

export type FeatureBaseSchema = BaseSchema & {
  skipRouting: boolean;
  skipComponent: boolean;
};
