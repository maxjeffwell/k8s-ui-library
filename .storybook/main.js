/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/docs/**/*.mdx',
    '../src/apps/**/*.mdx',
    '../src/apps/**/*.stories.@(js|jsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-designs',
  ],
  framework: '@storybook/react-vite',
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
