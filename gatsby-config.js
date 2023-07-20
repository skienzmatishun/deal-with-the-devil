/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Deal with the Devil',
    description: 'Wrongful Conviction',
    siteUrl: 'https://deal-with-the-devil.com',
  },
  mapping: {
    'MarkdownRemark.frontmatter.author': 'AuthorYaml.name',
  },
  plugins: [
    `gatsby-plugin-preact`,
      {
          resolve: `gatsby-plugin-disqus`,
          options: {
              shortname: `deal-with-the-devil`
          }
      },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaultQuality: 75,
        stripMetadata: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: path.join(__dirname, 'src', 'content'),
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 2000,
              quality: 75,
            },
          },
          {
            resolve: `@raae/gatsby-remark-oembed`,
            options: {
              // usePrefix defaults to false
              // usePrefix: true is the same as ["oembed"]
              usePrefix: ["oembed", "video"],
              providers: {
                // Important to exclude providers
                // that adds js to the page.
                // If you do not need them.
                exclude: ["Reddit", "Instagram", "Flickr"],
              },
            },
          },
        ],
      },
    },
    
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://deal-with-the-devil.com',
      },
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-emotion',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => allMarkdownRemark.edges.map(edge => ({
              ...edge.node.frontmatter,
              description: edge.node.excerpt,
              date: edge.node.frontmatter.date,
              url: `${site.siteMetadata.siteUrl}${edge.node.fields.slug}`,
              guid: `${site.siteMetadata.siteUrl}${edge.node.fields.slug}`,
              custom_elements: [{ 'content:encoded': edge.node.html }],
            })),
            query: `
              {
                allMarkdownRemark(
                  filter: { frontmatter: { draft: { ne: true } } }
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Deal with the Devil',
            match: '^/blog/',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [require('postcss-color-function'), require('cssnano')()],
      },
    },
  ],
};
