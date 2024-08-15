import { libraryGenerator as ngLibraryGenerator } from '@nx/angular/generators';
import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  readProjectConfiguration,
  Tree,
} from '@nx/devkit';
import { camelize } from '@nx/devkit/src/utils/string-utils';
import { deleteComponent } from '../../helpers/delete-files';
import { normalizeOptions } from '../../helpers/normalize';
import { applyDefaults } from './helpers/defaults';
import { FeatureGeneratorSchema } from './schema';

export async function featureGenerator(
  tree: Tree,
  schema: FeatureGeneratorSchema
) {
  const normalizedOptions = await normalizeOptions(tree, schema, 'feature');
  const options = applyDefaults(normalizedOptions);

  await ngLibraryGenerator(tree, options);

  if (options.skipComponent) {
    deleteComponent(tree, options);

    if (!options.skipRouting) {
      const routerName = camelize(options.name);

      generateFiles(
        tree,
        joinPathFragments(__dirname, './files'),
        readProjectConfiguration(tree, options.name).root,
        { routerName, tpl: '' }
      );
    }
  }

  await formatFiles(tree);

  return async () => {
    console.log(`\nProject: --project ${options.name}\n`);
    console.log(
      `Can be used to generate additional components, service or perform other commands like`
    );
    console.log(`eg "nx g remove --project ${options.name}"\n`);
  };
}

export default featureGenerator;
