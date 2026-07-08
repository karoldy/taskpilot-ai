import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3000/graphql',
  documents: ['src/graphql/**/*.graphql'],
  generates: {
    'src/generated/graphql-types.ts': {
      plugins: [
        {
          typescript: {
            enumsAsTypes: true,
          },
        },
      ],
    },
    'src/generated/graphql.ts': {
      plugins: [
        {
          typescript: {
            enumsAsTypes: true,
          },
        },
        {
          'typescript-operations': {
            importSchemaTypesFrom: './src/generated/graphql-types',
          },
        },
        {
          'typescript-react-apollo': {
            importSchemaTypesFrom: './src/generated/graphql-types',
            withMutationFn: false,
            withMutationOptionsType: false,
          },
        },
      ],
      config: {
        // Prevent duplicate enum declarations from typescript + typescript-operations
        enumsAsTypes: true,
      },
    },
  },
};

export default config;
