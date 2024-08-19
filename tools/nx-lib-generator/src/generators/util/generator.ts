import { libraryGenerator as ngLibraryGenerator } from '@nx/angular/generators';
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
import { UtilGeneratorSchema } from './schema';

export async function utilGenerator(tree: Tree, schema: UtilGeneratorSchema) {
  const normalizedOptions = await normalizeOptions(tree, schema, 'util');
  const options = applyDefaults(normalizedOptions);

  await ngLibraryGenerator(tree, options);
  deleteComponent(tree, options);
  generateFiles(
    tree,
    joinPathFragments(__dirname, './files'),
    readProjectConfiguration(tree, options.name).root,
    { tpl: '' }
  );
  await formatFiles(tree);

  return async () => {
    console.log(`\nProject: --project ${options.name}\n`);
    console.log(
      `Can be used to generate additional components, service or perform other commands like`
    );
    console.log(`eg "nx g remove --project ${options.name}"\n`);
  };
}

export default utilGenerator;
