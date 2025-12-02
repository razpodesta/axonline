// RUTA: scripts/verify-packages.mjs
/**
 * @fileoverview AUDITOR DE IDENTIDAD DE PAQUETES
 * @description Escanea el monorepo buscando referencias a la identidad antigua (@razworks).
 */
import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
// Términos prohibidos en nombres de paquetes o dependencias internas
const LEGACY_TERMS = ['@razworks', 'razpodesta', 'web-admin'];

let errorCount = 0;

function scan(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (['node_modules', '.git', 'dist', '.nx', '.husky'].includes(file)) continue;
      scan(fullPath);
    } else if (file === 'package.json') {
      checkPackageJson(fullPath);
    }
  }
}

function checkPackageJson(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const pkg = JSON.parse(content);
    const relativePath = path.relative(ROOT_DIR, filePath);
    const isRoot = relativePath === 'package.json';

    // 1. Validar Nombre del Paquete
    if (pkg.name) {
      if (LEGACY_TERMS.some(term => pkg.name.includes(term))) {
        console.error(`❌ [NOMBRE] ${relativePath}: '${pkg.name}' es legacy.`);
        errorCount++;
      }
      // Check específico para la app 'api' antigua
      if (pkg.name === 'api' && !isRoot) {
        console.error(`❌ [NOMBRE] ${relativePath}: 'api' es legacy (debe ser @axonline/backend).`);
        errorCount++;
      }
    }

    // 2. Validar Dependencias
    const checkDeps = (deps, type) => {
      if (!deps) return;
      Object.keys(deps).forEach(dep => {
        // Si la dependencia empieza con @razworks, es un error crítico
        if (dep.startsWith('@razworks')) {
          console.error(`❌ [DEP] ${relativePath}: Depende de '${dep}' (${type}).`);
          errorCount++;
        }
        // Si apunta a workspace:* pero el nombre es legacy
        if (deps[dep].startsWith('workspace:') && LEGACY_TERMS.some(term => dep.includes(term))) {
           console.error(`❌ [WORKSPACE] ${relativePath}: '${dep}' apunta a un workspace legacy.`);
           errorCount++;
        }
      });
    };

    checkDeps(pkg.dependencies, 'dependencies');
    checkDeps(pkg.devDependencies, 'devDependencies');
    checkDeps(pkg.peerDependencies, 'peerDependencies');

  } catch (e) {
    console.error(`⚠️ Error leyendo ${filePath}: ${e.message}`);
  }
}

console.log("🔍 Iniciando escaneo de identidad AXONLINE...");
scan(ROOT_DIR);

if (errorCount === 0) {
  console.log("\n✅ EXCELENTE. No se encontraron rastros de 'RazWorks'. La identidad @axonline es sólida.");
  process.exit(0);
} else {
  console.log(`\n🔥 SE ENCONTRARON ${errorCount} REFERENCIAS LEGACY. Corrección requerida.`);
  process.exit(1);
}
