import { graphql } from 'gatsby';
import React from 'react';
import { PostCard } from '../components/PostCard';

import { PostFeed } from '../styles/shared';
import { PageContext } from '../templates/post';
interface CommentProps {

    allMarkdownRemark: {
        data: {
        edges: Array<{
        node: PageContext;
      }>;
    };
  };
}

const Tags = ({  data }: CommentProps) => {
  const { edges } = data.allMarkdownRemark;
  
  return (
    <div css={[PostFeed]}>
    {edges.map(({ node }) => (
      <PostCard key={node.excerpt} post={node} />
    ))}
  </div>
  );
  
};

export default Tags;

export const pageQuery = graphql`
  query ($tag: String) {

    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, draft: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          frontmatter {
            title
            excerpt
            tags
            date
            image {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
            author {
              name
              bio
              avatar {
                childImageSharp {
                  gatsbyImageData(layout: FULL_WIDTH, breakpoints: [40, 80, 120])
                }
              }
            }
          }
          fields {
            layout
            slug
          }
        }
      }
    }
  }
`;
;
