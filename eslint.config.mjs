import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/node_modules', '**/.next', '**/.swc', '**/coverage', '**/reports'],
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
            // ------------------------------------------------------------
            // 1. APLICACIONES (TOP LEVEL)
            // ------------------------------------------------------------
            {
              sourceTag: 'scope:frontend',
              onlyDependOnLibsWithTags: [
                'scope:shared', // Kernel, DTOs
                'type:util'     // Utilidades agnósticas (Toolbox Client)
              ]
            },
            {
              sourceTag: 'scope:backend',
              onlyDependOnLibsWithTags: [
                'scope:shared',
                'type:domain',
                'type:infra',
                'type:util'
              ]
            },

            // ------------------------------------------------------------
            // 2. CAPA DE DOMINIO (BUSINESS LOGIC)
            // ------------------------------------------------------------
            {
              sourceTag: 'type:domain',
              onlyDependOnLibsWithTags: [
                'scope:shared',
                'type:util',
                'type:infra',   // Para inyectar adaptadores
                'type:domain'   // Comunicación entre dominios (Eventos)
              ]
            },

            // ------------------------------------------------------------
            // 3. CAPA DE INFRAESTRUCTURA (ADAPTERS)
            // ------------------------------------------------------------
            {
              sourceTag: 'type:infra',
              onlyDependOnLibsWithTags: [
                'scope:shared',
                'type:util',
                'type:infra'    // Infra puede usar otra Infra (AI usa DB)
              ]
            },

            // ------------------------------------------------------------
            // 4. CAPA COMPARTIDA (KERNEL & UTILS)
            // ------------------------------------------------------------
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: [
                'scope:shared' // El núcleo solo se habla a sí mismo
              ]
            },
            {
              sourceTag: 'type:util',
              onlyDependOnLibsWithTags: [
                'scope:shared',
                'type:util'
              ]
            }
          ],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }]
    },
  },
];
