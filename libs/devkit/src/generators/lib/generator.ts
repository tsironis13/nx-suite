import { libraryGenerator } from '@nx/angular/generators';
import { formatFiles, readNxJson, Tree } from '@nx/devkit';

import { LibGeneratorSchema } from './schema';

export async function libGenerator(tree: Tree, options: LibGeneratorSchema) {
  const nxJson = readNxJson(tree);
  const { type, name, scope } = options;
  const shortName = `${type}-${name}`;
  const fullName = `${scope}-${shortName}`;
  const projectRoot = `libs/${scope}/${shortName}`;
  const defaultSettings = {
    ...nxJson.generators['@nx/angular']?.library,
    ...nxJson.generators['@nx/angular:library'],
  };
  // throw error if lib type doesn't exist
  if (
    ![
      'data-access',
      'feat',
      'ui',
      'type',
      'util',
      'state',
      'guard',
      'const',
    ].includes(type)
  ) {
    throw new Error('Invalid library type');
  }
  // Generate the lib with the correct info
  await libraryGenerator(tree, {
    name: fullName,
    directory: projectRoot,
    tags: `type:${type},scope:${scope}`,
    ...defaultSettings,
  });
  // Delete stuff we don't want
  tree.delete(`${projectRoot}/src/lib/${fullName}`);
  tree.write(`${projectRoot}/src/index.ts`, '');
  await formatFiles(tree);
}

export default libGenerator;
