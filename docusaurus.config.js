// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const remarkMath = require('remark-math');
const rehypeKatex = require('rehype-katex');

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With respect to the given GitHub repo structure, we assume each software has its documentation
// The 'LishuZhang' GitHub user should be replaced with the actual user name

/**
 * @type {import('@docusaurus/types').DocusaurusConfig}
 */
module.exports = {
  title: 'Computational Materials Physics',
  tagline: 'Notes and codes for computational materials physics',
  url: 'https://github.com',
  baseUrl: '/LishuZhang/ComputationalMaterialsPhysics/', // Adjust this to match the GitHub Pages URL
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'LishuZhang', // Usually your GitHub org/user name.
  projectName: 'ComputationalMaterialsPhysics', // Usually your repo name.

  // Even though the project is structured in different folders, we assume that
  // the Docusaurus site will serve as a unified documentation portal.
  // Hence, we link to different sections of the site rather than GitHub folders.

  themeConfig: {
    navbar: {
      title: 'CMP Notes',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Tutorial',
        },
        // Assuming each folder in the GitHub repo has a corresponding documentation section
        {
          href: 'https://github.com/LishuZhang/ComputationalMaterialsPhysics',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/LishuZhang/ComputationalMaterialsPhysics',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Made with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/LishuZhang/ComputationalMaterialsPhysics/edit/main/website/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
