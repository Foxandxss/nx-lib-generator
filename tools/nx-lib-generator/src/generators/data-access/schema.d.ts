import { BaseSchema } from '../../helpers/types';

export type DataAccessGeneratorSchema = BaseSchema & {
  name: string;
  scope: string;
  skipTestConfig: boolean;
  isApi: boolean;
};
