import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

const DIST_DIR = './dist';

const jsFiles = globSync(`${DIST_DIR}/**/*.js`, {
  ignore: ['./node_modules/**']
});

const tsImportRegex = /((?:import|export)[^'"]+['"])([^'"]+)\.ts(['"])/g;

for (const file of jsFiles) {
  const absPath = path.resolve(file);
  const content = fs.readFileSync(absPath, 'utf8');

  const updated = content.replace(tsImportRegex, (_match, p1, p2, p3) => {
    return `${p1}${p2}.js${p3}`;
  });

  if (content !== updated) {
    fs.writeFileSync(absPath, updated, 'utf8');
    console.log('✓ Обновлён:', file);
  }
}

console.log('✅ Импорты в dist переписаны (.ts → .js)');
