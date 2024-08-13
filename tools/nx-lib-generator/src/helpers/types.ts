import { Schema } from '@nx/angular/src/generators/library/schema';

export type BaseSchema = Schema & {
  scope: string;
  nameDasherized: string;
  nameForVariable: string;
  tags: string;
};
