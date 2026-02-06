/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/docs/**/*.mdx',
    '../src/apps/**/*.mdx',
    '../src/apps/**/*.stories.@(js|jsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@chromatic-com/storybook',
    'storybook-addon-pseudo-states',
    '@storybook/addon-designs',
    'storybook-addon-apollo-client',
    'storybook-addon-redux-store',
    'storybook-dark-mode',
  ],
  framework: '@storybook/react-vite',

  refs: {
    portfolio: {
      title: 'Portfolio Components',
      url: 'https://el-jefe.me/storybook',
    },
  },
  async viteFinal(config) {
    // Use esbuild for CSS minification instead of LightningCSS.
    // Semantic UI CSS 2.5.0 contains pseudo-element syntax that
    // LightningCSS rejects (e.g. `::after .header`).
    config.build = config.build || {};
    config.build.cssMinify = 'esbuild';
    return config;
  },
};
export default config;
