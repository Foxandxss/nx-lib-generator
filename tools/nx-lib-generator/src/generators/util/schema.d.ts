import { BaseSchema } from '../../helpers/types';

export type UtilGeneratorSchema = BaseSchema & {
  scope: string;
  name: string;
  skipTestsConfig: boolean;
};
