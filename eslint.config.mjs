import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/node_modules', '**/.next'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            // 1. FRONTEND: Solo consume UI y Kernel (Tipos)
            {
              sourceTag: 'scope:frontend',
              onlyDependOnLibsWithTags: ['scope:shared', 'type:util', 'type:ui']
            },
            // 2. BACKEND: Orquesta los Dominios
            {
              sourceTag: 'scope:backend',
              onlyDependOnLibsWithTags: ['scope:shared', 'type:domain', 'type:util', 'type:infra']
            },
            // 3. DOMINIOS (Identity, Billing): Núcleo puro
            {
              sourceTag: 'type:domain',
              onlyDependOnLibsWithTags: ['scope:shared', 'type:util', 'type:infra'] // Infra solo para inyección de puertos
            },
            // 4. INFRAESTRUCTURA: Adaptadores concretos
            {
              sourceTag: 'type:infra',
              onlyDependOnLibsWithTags: ['scope:shared', 'type:util']
            },
            // 5. KERNEL (Shared): Base de la pirámide
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared']
            }
          ],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['error', 'warn', 'info'] }]
    },
  },
];
