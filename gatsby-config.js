const config = require('./config');
require('dotenv').config();

const gatsbyRemarkPlugins = [
  'gatsby-remark-sectionize',
  {
    resolve: `gatsby-remark-autolink-headers`,
    options: {
      icon: `<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 6.33337H15.5" stroke="#CBD5E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M1.5 11.6666H15.5" stroke="#CBD5E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.75 1L5 17" stroke="#CBD5E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 1L10.25 17" stroke="#CBD5E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      className: `title-link`,
    },
  },
  {
    resolve: `gatsby-remark-images`,
  },
];

if (process.env.NODE_ENV === 'development') {
  gatsbyRemarkPlugins.push('gatsby-remark-check-links');
}

module.exports = {
  pathPrefix: config.gatsby.pathPrefix,
  siteMetadata: {
    title: config.siteMetadata.title,
    description: config.siteMetadata.description,
    keywords: config.siteMetadata.keywords,
    header: config.header,
    siteUrl: config.gatsby.siteUrl,
    footer: config.footer,
    docsLocation: config.siteMetadata.docsLocation,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-typescript',
    'gatsby-image',
    'gatsby-plugin-styled-components',
    `gatsby-plugin-smoothscroll`,
    {
      resolve: `gatsby-plugin-algolia`,
      options: require(`./src/utils/algolia`),
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        sitemapSize: 5000,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }],
          },
        },
      },
    },
    // 'gatsby-plugin-offline', // it causes infinite loop issue with workbox
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        decks: [],
        defaultLayouts: {
          default: require.resolve('./src/layouts/articleLayout.tsx'),
        },
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'docs',
        path: `${__dirname}/content`,
        ignore: ['**/.tsx*'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-plugin-remove-trailing-slashes',
  ],
};
