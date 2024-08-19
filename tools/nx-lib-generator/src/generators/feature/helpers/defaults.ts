import { UnitTestRunner } from '@nx/angular/generators';
import { Linter } from '@nx/eslint';
import { FeatureBaseSchema } from './types';

const DEFAULTS: Partial<FeatureBaseSchema> = {
  projectNameAndRootFormat: 'as-provided',
  buildable: false,
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

export function applyDefaults(schema: FeatureBaseSchema): FeatureBaseSchema {
  let defaults = { ...DEFAULTS };

  if (!schema.skipRouting) {
    defaults = {
      ...defaults,
      routing: true,
      lazy: true,
    };
  }

  if (schema.scope === 'shared') {
    defaults = { ...defaults, buildable: true };
  }

  return { ...defaults, ...schema };
}
