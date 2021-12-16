// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const customFields = require('./src/config/customFields');

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'COOL',
  tagline:
      'A cohort OLAP system specialized for cohort analysis with extremely low latency.',
  organizationName: 'National University of Singapore (DB2)',
  projectName: 'COOL',
  url: 'https://www.comp.nus.edu.sg/~dbsystem/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'assets/icons/svg/logo.png',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // showLastUpdateAuthor: true,
          // showLastUpdateTime: true,
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: "https://github.com/KimballCai/COOL-website/edit/main/",
        },
        blog: {
          blogSidebarTitle: 'All Blog Posts',
          showReadingTime: true,
          editUrl: "https://github.com/KimballCai/COOL-website/edit/main/",
        },
        theme: {
          customCss: [
              require.resolve('./src/css/custom.css'),
              require.resolve('./src/css/navbar.scss'),
              require.resolve('./src/css/index.scss'),
            // require.resolve('./src/css/customTheme.scss'),
          ]
        },
      }),
    ],
  ],
  plugins:[
    'docusaurus-plugin-sass',
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        id: 'github-star',
        content:
            'If you like COOL, give us a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/cool-squad/">Github</a>!🌟',
        backgroundColor: '#20232a',
        textColor: '#ffffff',
        isCloseable: false,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
        switchConfig: {
          darkIcon: '🌙',
          darkIconStyle: {
            marginLeft: '2px',
          },
          lightIconStyle: {
            marginLeft: '1px',
          },
        },
      },
      navbar: {
        hideOnScroll: true,
        title: customFields.name,
        logo: {
          src: 'assets/icons/svg/logo.png',
          srcDark: 'assets/icons/svg/logo.png',
          alt: 'COOL logo',
        },
        items: [
          {
            label: customFields.versions[0],
            to: '/',
            position: 'left',
          },
          {
            type: 'doc',
            docId: 'intro',
            position: 'right',
            label: 'Docs',
          },
          {
            to: '/download',
            label: 'Download',
            position: 'right',
          },
          {
            to: '/blog',
            label: 'Blog',
            position: 'right'
          },
          {
            href: customFields.githubAppUrl,
            label: 'GitHub',
            position: 'right',
          },
          {
            href: customFields.githubAppUrl,
            'aria-label': 'GitHub repository',
            position: 'right',
            className: 'navbar-github-link',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'About',
            items: [
              {
                label: 'What is COOL?',
                href: 'https://www.comp.nus.edu.sg/~dbsystem/cool/#/',
              },
              {
                label: 'Who uses COOL?[TODO]',
                to: '/',
              },
              {
                label: 'Use Case',
                href: 'https://www.comp.nus.edu.sg/~dbsystem/cool/#/covid-19',
              },
            ],
          },
          {
            title: 'Integrations',
            items: [
              {
                label: 'A[TODO]',
                to: '/',
              },
            ],
          },
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Start',
                href: customFields.githubUrl,
              },
              {
                label: 'User Guide',
                to: '/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Github',
                href: customFields.githubUrl,
              },
              {
                label: 'Mailing List',
                href: 'mailto:dbsystem@comp.nus.edu.sg?Subject=SubscribeToCOOL',
              },
            ],
          },
          // {
          //   title: 'Apache[TODO]',
          //   items: [
          //     {
          //       label: 'Foundation',
          //       href: 'https://apache.org/',
          //     },
          //     {
          //       label: 'License',
          //       href: 'https://apache.org/licenses',
          //     },
          //     {
          //       label: 'Events',
          //       href: 'https://apache.org/current-event',
          //     },
          //     {
          //       label: 'Thanks',
          //       href: 'https://apache.org/thanks.html',
          //     },
          //   ],
          // },
        ],
        logo: {
          alt: 'COOL Open Source Logo',
          src: 'assets/icons/svg/logo.svg',
          href: customFields.githubUrl,
        },
        copyright: `Copyright © ${new Date().getFullYear()} COOL, Inc.`,
      },
      prism: {
        defaultLanguage: 'bash',
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
