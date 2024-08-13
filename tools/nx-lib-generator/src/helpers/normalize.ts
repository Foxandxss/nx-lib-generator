import { type Tree, getWorkspaceLayout } from '@nx/devkit';
import { dasherize } from '@nx/devkit/src/utils/string-utils';
import { BaseSchema } from './types';

function extractVariableFromSchema(options: BaseSchema) {
  if (options.name) {
    return options.name;
  }

  if (options.scope.includes('/')) {
    return options.scope.split('/')[1];
  } else {
    return options.scope;
  }
}

export async function normalizeOptions(
  tree: Tree,
  options: BaseSchema,
  type: string
): Promise<BaseSchema> {
  options.skipFormat;
  const { scope, name } = options;

  if (scope === 'shared' && !name) {
    throw new Error(`To use "shared" scope, name must also be set.`);
  }

  const scopeDasherized = dasherize(scope.replace(/\//g, '-'));
  const parsedScope = scope.split('/')[0];

  const nameDasherized = name ? dasherize(name) : '';
  const fixedName = nameDasherized ? `-${nameDasherized}` : '';

  const projectName = `${scopeDasherized}-${type}${fixedName}`;
  const projectFolder =
    scope === 'shared'
      ? `/${scope}/${type}/${nameDasherized}`
      : `/${scope}/${type}${fixedName}`;
  const projectDirectory = `${
    getWorkspaceLayout(tree).libsDir
  }${projectFolder}`;
  const parsedTags = [`scope:${parsedScope}`, `type:${type}`];

  const nameForVariable = extractVariableFromSchema(options);

  return {
    ...options,
    name: projectName,
    directory: projectDirectory,
    nameDasherized,
    scope: parsedScope,
    tags: parsedTags.join(','),
    nameForVariable,
  };
}
