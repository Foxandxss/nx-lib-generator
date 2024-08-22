import { BaseSchema } from '../../helpers/types';

export type UiGeneratorSchema = BaseSchema & {
  scope: string;
  name: string;
  skipTestsConfig: boolean;
};
