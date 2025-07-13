const fs = require('fs');
const path = require('path');

const packagePath = path.resolve(__dirname, '../package.json');

if (!fs.existsSync(packagePath)) {
  console.error('❌ package.json não encontrado.');
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));

if (!pkg.version) {
  console.error("❌ Campo 'version' não encontrado no package.json.");
  process.exit(1);
}

const [major, minor, patch] = pkg.version.split('.').map(Number);

const newVersion = `${major}.${minor}.${patch + 1}`;
pkg.version = newVersion;

fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n');

console.log(`✅ Versão atualizada para: ${newVersion}`);
