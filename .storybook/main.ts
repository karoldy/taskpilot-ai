import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-mcp',
  ],
  framework: '@storybook/react-vite',
  viteFinal(config) {
    const existingAlias = config.resolve?.alias;
    config.resolve = {
      ...config.resolve,
      alias: {
        ...(Array.isArray(existingAlias) ? {} : (existingAlias ?? {})),
        '@': path.resolve(__dirname, '../src'),
      },
    };
    return config;
  },
};

export default config;
