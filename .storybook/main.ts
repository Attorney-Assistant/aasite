import type { StorybookConfig } from "@storybook/html-vite";

const config: StorybookConfig = {
  stories: ["../src/stories/**/*.mdx", "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@chromatic-com/storybook",
  ],
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  staticDirs: [],
};

export default config;
