import { graphql, Link } from 'gatsby';
import { getSrc, getImage } from 'gatsby-plugin-image';
import React from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/react';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import Pagination from '../components/Pagination';
import { PostCard } from '../components/PostCard';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  PostFeed,
  Posts,
  SiteDescription,
  SiteHeader,
  SiteHeaderContent,
  SiteMain,
  SiteTitle,
  SiteHeaderStyles,
} from '../styles/shared';
import config from '../website-config';
import { PageContext } from './post';
import Lawrence from '../content/img/lawrence.jpg';
export interface IndexProps {
  pageContext: {
    currentPage: number;
    numPages: number;
  };
  data: {
    logo: any;
    header: any;
    allMarkdownRemark: {
      edges: Array<{
        node: PageContext;
      }>;
    };
  };
}

const IndexPage: React.FC<IndexProps> = props => {
  const width = getImage(props.data.header)?.width;
  const height = getImage(props.data.header)?.height;

  return (
    <IndexLayout css={HomePosts}>
      <Helmet>
        <html lang={config.lang} />
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={config.title} />
        <meta property="og:description" content={config.description} />
        <meta property="og:url" content={config.siteUrl} />
        <meta property="og:image" content={`${config.siteUrl}${getSrc(props.data.header)}`} />
        {config.facebook && <meta property="article:publisher" content={config.facebook} />}
        {config.googleSiteVerification && (
          <meta name="google-site-verification" content={config.googleSiteVerification} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.title} />
        <meta name="twitter:description" content={config.description} />
        <meta name="twitter:url" content={config.siteUrl} />
        <meta name="twitter:image" content={`${config.siteUrl}${getSrc(props.data.header)}`} />
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        <meta property="og:image:width" content={width?.toString()} />
        <meta property="og:image:height" content={height?.toString()} />
      </Helmet>
      <Wrapper>
        <div
          css={[outer, SiteHeader, SiteHeaderStyles]}
          className="site-header-background"
          style={{
            backgroundImage: `url('${getSrc(props.data.header)}')`,
          }}
        >
          <div css={inner}>
          <SiteNav isHome />
            <SiteHeaderContent className="site-header-content">
              <SiteTitle className="site-title">
                {props.data.logo ? (
                  <img
                    style={{ maxHeight: '200px' }}
                    src={getSrc(props.data.logo)}
                    alt={config.title}
                  />
                ) : (
                  config.title
                )}
              </SiteTitle>
              <SiteDescription>{config.description}</SiteDescription>
            </SiteHeaderContent>
          </div>
        </div>
        <div css={inner}>
          <div>
          <p style={{fontSize:"2.25rem",margin:"75px"}}>“I have made a deal, a deal with the devil so that evidence could be heard, so the dots could be connected. If you don’t like that deal, you come after your D.A.”<br /> - David Whetstone.</p>
          </div>
        <div className="topContainer" style={{display:"flex",flexFlow:"row wrap"}}>
          <div className="introduction">
          
            <p style={{fontSize:"4rem",margin:"4rem"}}>Ask yourself—</p>
            <p> How can someone be convicted of murder, based entirely on testimony of a single person who is an acomplice bargaining on a reduced sentence?</p>
            <p>No blood, no DNA, no witnesses?</p>
            <p>5 alibi witnesses, no fingerprints, no fiber, no weapon, no ballistics— no justice.</p>
            <p>This case is destined to be a feature documentary exposing an inept and corrupt judical system.</p>
            <p>No timeline, two medical examiner reports that dispute state's cause of death.</p>
            <h2 style={{marginTop:"20px"}} >Mission Statement </h2>
            <p>The release of wrongfully convicted Murray "Bubba" Lawrence</p>
            <h2 style={{fontSize:"4rem",margin:"4rem"}}>Topics</h2>
            <ul style={{listStyle:"none"}}>
            <Link to={`/introduction/`}>
            <li>Introduction</li>
                </Link>
                <Link to={`/tags/baldwin-county/`}>
            <li>Baldwin County</li>
                </Link>
                <Link to={`/tags/testimonials/`}>
            <li>Testimonials</li>
                </Link>
                </ul>
            </div>

            <div className="address" >
<img src={Lawrence} alt="Murray Bubba Lawrence" />
<div style={{color:"black"}}>
<ul style={{listStyle:"none", fontSize:"1.75rem",textAlign:"center"}}>
<li style={{padding:".5rem", margin:".5rem",fontSize:".5rem"}}><h2 style={{textAlign:"center", fontSize:"2rem"}}>Murray Bubba Lawrence</h2></li>
<li>AIS# 00241380</li>
<li>William C Holman</li>
<li>Correction Facility</li>
<li>1206 Ross Rd</li>
<li>Atmore, AL 36502</li>
</ul>
              </div>
            </div>
          </div>
        
            </div>
        <main id="site-main" css={[SiteMain, outer]}>
          <div css={[inner, Posts]}>
            <div css={[PostFeed]}>
              {props.data.allMarkdownRemark.edges.map((post, index) =>
                // filter out drafts in production
                (
                  (post.node.frontmatter.draft !== true
                    || process.env.NODE_ENV !== 'production') && (
                    <PostCard key={post.node.fields.slug} post={post.node} large={index === 0} />
                  )
                ),
              )}
            </div>
          </div>
        </main>
        {props.children}
        {props.pageContext.numPages > 1 && (
          <Pagination
            currentPage={props.pageContext.currentPage}
            numPages={props.pageContext.numPages}
          />
        )}
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};


export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    logo: file(relativePath: { eq: "img/ghost-logo.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FIXED)
      }
    }
    header: file(relativePath: { eq: "img/blog-cover.png" }) {
      childImageSharp {
        gatsbyImageData(width: 2000, quality: 100, layout: FIXED)
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            tags
            draft
            excerpt
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
          excerpt
          fields {
            readingTime {
              text
            }
            layout
            slug
          }
        }
      }
    }
  }
`;

const HomePosts = css`
  @media (min-width: 795px) {
    .post-card-large {
      flex: 1 1 100%;
      flex-direction: row;
      padding-bottom: 40px;
      min-height: 280px;
      border-top: 0;
    }
    .post-card-large .post-card-title {
      margin-top: 0;
      font-size: 3.2rem;
    }
    .post-card-large:not(.no-image) .post-card-header {
      margin-top: 0;
    }
    .post-card-large .post-card-image-link {
      position: relative;
      flex: 1 1 auto;
      margin-bottom: 0;
      min-height: 380px;
    }
    .post-card-large .post-card-image {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .post-card-large .post-card-content {
      flex: 0 1 361px;
      justify-content: center;
    }
    .post-card-large .post-card-title {
      margin-top: 0;
      font-size: 3.2rem;
    }
    .post-card-large .post-card-content-link {
      padding: 0 0 0 40px;
    }
    .post-card-large .post-card-meta {
      padding: 0 0 0 40px;
    }
    .post-card-large .post-card-excerpt p {
      margin-bottom: 1.5em;
      font-size: 1.8rem;
      line-height: 1.5em;
    }
  }
.address {
  text-align:center;
  width:45%;
  background:#e7e7e7;
  margin:2rem; 
  padding:2rem; 
  border-radius:4px;
font-size:2.3rem;
max-height:900px;
}
.introduction {
  font-size:2.3rem;
  width:45%;
  margin:2rem; 
  padding:2rem; 
}
@media (max-width: 795px) {
  .introduction{width:95%;
   
  }
  .address{width:95%;}
}
  @media (prefers-color-scheme: dark) {
    body{background: var(--darkmode);}

  }
  @media (prefers-color-scheme: dark) {
  }

`;


export default IndexPage;
