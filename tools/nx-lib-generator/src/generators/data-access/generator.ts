import {
  librarySecondaryEntryPointGenerator,
  libraryGenerator as ngLibraryGenerator,
} from '@nx/angular/generators';
import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  readProjectConfiguration,
  Tree,
} from '@nx/devkit';
import { deleteComponent } from '../../helpers/delete-files';
import { normalizeOptions } from '../../helpers/normalize';
import { applyDefaults } from './helpers/defaults';
import { DataAccessGeneratorSchema } from './schema';

export async function dataAccessGenerator(
  tree: Tree,
  schema: DataAccessGeneratorSchema
) {
  let normalizedOptions = await normalizeOptions(tree, schema, 'data-access');
  normalizedOptions = { ...normalizedOptions, ...schema };
  const options = applyDefaults(normalizedOptions);

  await ngLibraryGenerator(tree, options);

  if (options['isApi']) {
    generateFiles(
      tree,
      joinPathFragments(__dirname, './files'),
      readProjectConfiguration(tree, options.name).root,
      { name: options.nameForVariable, tpl: '' }
    );

    await librarySecondaryEntryPointGenerator(tree, {
      ...options,
      skipModule: true,
      name: 'mocks',
      library: options.name,
    });
  }

  await formatFiles(tree);

  deleteComponent(tree, options);

  console.log('tree', tree);
  return async () => {
    console.log(`\nProject: --project ${options.name}\n`);
    console.log(
      `Can be used to generate additional components, service or perform other commands like`
    );
    console.log(`eg "nx g remove --project ${options.name}"\n`);
  };
}

export default dataAccessGenerator;
