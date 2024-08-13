import { UnitTestRunner } from '@nx/angular/generators';
import { Linter } from '@nx/eslint';
import { BaseSchema } from './../../../helpers/types';

const DEFAULTS: Partial<BaseSchema> = {
  prefix: 'seed',
  projectNameAndRootFormat: 'as-provided',
  buildable: true,
  publishable: false,
  linter: Linter.EsLint,
  unitTestRunner: UnitTestRunner.Jest,
  skipTests: false,
  style: 'scss',
  changeDetection: 'OnPush',
  standalone: true,
  inlineStyle: true,
  inlineTemplate: true,
  strict: true,
  viewEncapsulation: 'None',
};

export function applyDefaults(schema: BaseSchema): BaseSchema {
  return { ...DEFAULTS, ...schema };
}
