import { Tree } from '@nx/devkit';
import { BaseSchema } from './types';

export function deleteComponent(tree: Tree, options: BaseSchema) {
  tree.delete(`${options.directory}/src/index.ts`);
  tree.delete(
    `${options.directory}/src/lib/${options.name}/${options.name}.component.spec.ts`
  );
  tree.delete(
    `${options.directory}/src/lib/${options.name}/${options.name}.component.ts`
  );
}
