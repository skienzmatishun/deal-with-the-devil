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
                <div className="deal-logo" />
              </SiteTitle>
              <SiteDescription>{config.description}</SiteDescription>
            </SiteHeaderContent>
			<div style={{ textAlign: "center", height: "35px", zIndex:"15", position:"relative", top:"-20px" }}>
            <div className="button-row">
              <a href="https://spot.fund/7p2k2se"> <span className="petition-button red" >Donate</span></a>
              <a href="https://deal-with-the-devil.com/full-story/"> <span className="petition-button white" >Full Story</span></a>
              </div>
          </div>
          </div>
        </div>
        <div css={inner}>
          
          <div className="topContainer" style={{ display: "flex", flexFlow: "row wrap" }}>
            <div className="address">
              <div>

                <h2 style={{ textAlign: "center", fontSize: "2rem", margin: "2rem", marginTop: "5rem" }}>Murray Bubba Lawrence Jr.</h2>
                <img className="profile-picture" src={Lawrence} alt="Murray Bubba Lawrence Jr." />
              </div>
              <div >
                <ul style={{ listStyle: "none", fontSize: "1.75rem", textAlign: "center", margin: "2rem" }}>

                  <li style={{ margin: "0", padding: "0" }}>AIS# 00241380</li>
                  <li style={{ margin: "0", padding: "0" }}>William C Holman</li>
                  <li style={{ margin: "0", padding: "0" }}>Correction Facility</li>
                  <li style={{ margin: "0", padding: "0" }}>1206 Ross Rd</li>
                  <li style={{ margin: "0", padding: "0" }}>Atmore, AL 36502</li>
                </ul>
              </div>
            </div>
            <div className="introduction">
              <p style={{ fontSize: "4rem", marginBottom: "2rem", marginTop: "5rem" }}>Ask yourself—</p>
              <p> How can someone be convicted of murder, based entirely on testimony of a single person who is bargaining on a reduced sentence?</p>
              <p>No blood, no DNA, no witnesses?</p>
              <p>5 alibi witnesses, no fingerprints, no fiber, no weapon, no ballistics— no justice.</p>
              <p>This case is destined to be a feature documentary exposing an inept and corrupt judicial system.</p>
              <p>No timeline, two medical examiner reports that dispute state's cause of death.</p>
              <h2 style={{ marginTop: "20px" }} >Mission Statement </h2>
              <p>The release of wrongfully convicted Murray "Bubba" Lawrence Jr.</p>
			  <a href="https://deal-with-the-devil.com/full-story/"> <span className="petition-button red" >Read the Full Story</span></a>
			  <a className="show-support-link" href="https://spot.fund/7p2k2se">
			  Show your Support
</a>
            </div>
          </div>
        </div>

        <main id="site-main" css={[SiteMain, outer]}>
		<h2 style={{textAlign:"center", fontSize:"2.3em", margin:"1.5em"}}>Related Articles</h2>
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
   
    header: file(relativePath: { eq: "img/blog-cover.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 2000, quality: 100, layout: FIXED, formats: [AUTO, WEBP, AVIF])
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
  .profile-picture {
  border-top-right-radius:4px;
  border-top-left-radius:4px;
  }
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
  .post-card-meta {
  display:none;
  }
  
  .show-support-link a{
  font-size:0.7em;
  text-align:center;
  margin: 2em;
  color: black, 
  font-weight: "700", 
  text-decoration: underline
  }
.address {
  text-align:center;
  flex-basis:28%;
  border-radius:4px;
font-size:2.3rem;
color:black;
margin-bottom:20px;
height:750px;
padding:.5rem;
}
.button-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.petition-button {
  padding: 1.2rem;
  color: white;
  height: 40px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 1.8rem;
  cursor: pointer;
  margin:2px;
}
.no-image {
  display:none;
  color:red;
}

.petition-button.red {
  background: #830000;
}

.petition-button.white {
  background: white;
  color: #1f7eb3;
  border-width:3px;
  border-style:solid;
  border-color:#26a6ed;
  font-weight:600;
}
.post-card-primary-tag {
  display:none;
}

.petition-button.blue {
  background: blue;
}

.introduction {
  font-size:2.3rem;
  flex-basis:60%;
  margin:auto; 
  padding:.5rem;
  margin-top:-15px;
}
.topContainer {
  background:#00000025;
  padding:2em;
  border-radius:4px;
  margin-top:8px;
  justify-content: center;
}

.deal-logo {
background-image: url("data:image/svg+xml,%3Csvg width='118.7' height='88' viewBox='0 0 31.4 23.3' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath style='font-size:10.5833px;line-height:1.25;font-family:Aleo;-inkscape-font-specification:Aleo;fill:%23fff;stroke-width:.999999' d='M5.8 0v1.7c0 .4.2.7.7.7l2.2.5v9.8H5v3h3.8v10l-2.2.5c-.5 0-.7.3-.7.8v1.6h13.3c2.8 0 5.2-.6 7.4-1.8 2.1-1.2 3.8-2.8 5-5 .9-1.8 1.5-3.8 1.6-6h5.3v10l-2.3.4c-.4 0-.6.3-.6.8v1.6h20.6V22h-2c-.4 0-.7.2-.8.6l-.2 3H42.3v-9.9H53V17l2.5-1.5 2.6-1.4-2.6-1.5L53 11v1.6H42.3V3.2h10.8l.2 3c.1.5.4.7.9.7h2V0H35.4v1.7c0 .4.2.7.6.7l2.3.5v9.8h-5.3a15 15 0 0 0-1.6-5.8 12.3 12.3 0 0 0-5-5A14.7 14.7 0 0 0 19.1 0H5.8zm65.4 0L60.8 26l-1.6.4c-.4 0-.5.3-.5.6v1.6h8.2V27c0-.3-.2-.5-.6-.6l-1.6-.5 2.2-5.7h12.4l2.2 5.7-1.6.5c-.4 0-.6.3-.6.6v1.6h8.3V27c0-.3-.2-.5-.5-.6l-1.6-.5L75 0h-4zm18.7 0v1.7c0 .2 0 .3.2.5l.4.2 2.3.5v22.8l-2.3.5c-.2 0-.3 0-.4.2l-.2.5v1.7h20v-6.2H108c-.2 0-.4 0-.5.2-.2.1-.3.3-.3.5l-.3 2.3H96.6V2.9l2.3-.5c.2 0 .3 0 .4-.2.2-.2.2-.3.2-.5V0H90zM12.6 3.1h6.5c3.2 0 5.7 1 7.4 3 1.5 1.7 2.4 4 2.6 6.6H12.6V3zm60.5.5.9 2.8 4.2 11H68l4.3-11 .8-2.8zM12.6 15.7h16.5c-.2 2.8-1 5.1-2.6 6.8-1.8 2-4.2 3-7.4 3h-6.5v-9.8zm-.5 22-.5.1a1 1 0 0 0-.2.4L7.5 49.5l-.3 1.4-.3-1.4-3-10.2a12.2 12.2 0 0 0 1.3-.2c.2 0 .3-.2.3-.4v-1H0v1c0 .2.1.3.4.4l1 .2L6 54h2l4.1-12.4a4.5 4.5 0 0 0 .1-.4l.1-.4.3.8 4 12.4h2l4.6-14.5 1.1-.3c.3 0 .4-.2.4-.4v-1h-5.4v1c0 .2.1.3.4.4h.4l.8.2-3 10.2-.1.6-.1.7-.4-1.3-3.8-11.3c-.1-.4-.4-.5-.8-.5h-.6zm13.7 0v1c0 .2.1.3.3.4l1.4.2v13l-1.4.2c-.2 0-.3.2-.3.4v1h5.5v-1c0-.2-.1-.3-.3-.4l-1.4-.2v-13l1.3-.2c.3 0 .4-.2.4-.4v-1h-5.5zm6.7 0v3.6h1c.3 0 .5-.1.5-.2l.2-1.6H38v12.8l-1.2.2c-.1 0-.2 0-.3.2l-.1.3v1h5.5v-1c0-.3 0-.4-.2-.4l-1.2-.3h-.2V39.6H44l.2 1.5.4.2h1.1v-3.6H32.5zm14.5 0v1c0 .2 0 .3.2.4l1.4.2v13l-1.3.2c-.2 0-.3.2-.3.4v1h5.4v-1c0-.2-.5-.4-1.6-.6v-5.8h8.7v5.8l-1.2.2c-.3 0-.4.2-.4.4v1h5.5v-1c0-.2-.1-.3-.3-.4l-1.4-.2v-13l1.4-.2c.2 0 .3-.2.3-.4v-1h-5.5v1c0 .2.1.3.3.4l1.3.2V45h-8.7v-5.6a24 24 0 0 0 1.4-.2l.2-.4v-1H47zm22.4 0v3.6h1.1c.3 0 .4-.1.5-.2l.2-1.6H75v12.8l-1.2.2c-.2 0-.3 0-.3.2l-.1.3v1h5.5v-1c0-.3-.1-.4-.3-.4l-1.1-.3h-.3V39.6H81l.3 1.5c0 .1.1.2.4.2h1v-3.6H69.5zm14.5 0v1c0 .2.1.3.3.4l1.4.2v13l-1.3.2c-.3 0-.4.2-.4.4v1h5.5v-1c0-.2-.6-.4-1.7-.6v-5.8h8.8v5.8l-1.3.2c-.2 0-.3.2-.3.4v1h5.4v-1c0-.2 0-.3-.2-.4l-1.4-.2v-13l1.3-.2c.2 0 .4-.2.4-.4v-1h-5.5v1c0 .2 0 .3.3.4l1.3.2V45h-8.7v-5.6a24 24 0 0 0 1.4-.2l.2-.4v-1h-5.5zm18 0v1c0 .2 0 .3.2.4l1.3.3v12.9l-1.3.2c-.2 0-.3.2-.3.5v1h11.6v-3.8h-1c-.3 0-.5 0-.5.3l-.2 1.6h-6v-5.5h6v-1.7h-6v-5.4h6l.2 1.7c0 .3.2.4.5.4h1v-3.9h-11.6zM2 59.2V61c0 .4.3.7.7.8l2.2.5V85l-2.2.4c-.4.1-.7.4-.7.8v1.7h13.3c2.8 0 5.2-.6 7.4-1.8 2.1-1.2 3.8-2.9 5-5 1.1-2.2 1.7-4.7 1.7-7.5s-.6-5.3-1.7-7.5a12.3 12.3 0 0 0-5-5 14.7 14.7 0 0 0-7.4-1.9H2zm29.8 0V61c0 .4.2.7.6.8l2.2.5V85l-2.2.4c-.4.1-.6.4-.6.8v1.7h20.5v-6.7h-1.9c-.5 0-.8.3-.9.7l-.2 2.9H38.6V75H49v-3H38.6v-9.6h10.7l.3 3c0 .5.3.8.8.8h2v-7H31.7zm22.8 0V61c0 .4.2.6.6.7l2 .5L67.7 88h3.5l10.5-25.8 2-.5c.4 0 .6-.3.6-.7v-1.7h-9.5v1.6c0 .4.2.7.6.8l2.3.5-7.3 18.2-.9 3.1c-.3-1.4-.6-2.5-1-3.1l-7.3-18.2 1.2-.2 1-.2c.5-.1.7-.4.7-.8v-1.8h-9.5zm31.8 0V61c0 .4.2.7.5.7l2.4.5V85l-2.3.4c-.4 0-.6.3-.6.8v1.7H96v-1.7c0-.4-.1-.7-.4-.8L93 85V62l2.3-.4c.4-.1.6-.4.6-.8v-1.7h-9.6zm12.2 0V61c0 .2 0 .4.2.5 0 .2.2.3.4.3l2.3.4V85l-2.3.4c-.2 0-.3.1-.4.3l-.2.5v1.7h20v-6.3h-1.9l-.5.2c-.2.2-.3.3-.3.5l-.3 2.3h-10.3V62.1l2.3-.4c.2 0 .3-.1.4-.3l.2-.5v-1.7h-9.6zM8.8 62.4h6.5c3.2 0 5.7 1 7.5 3a12 12 0 0 1 2.6 8.2c0 3.4-.9 6.2-2.7 8.2-1.7 2-4.2 3-7.4 3H8.8V62.4z' transform='scale(.26458)'/%3E%3C/svg%3E");
background-repeat: no-repeat no-repeat;
background-position: center center;
background-size: contain;
height:200px;
width:275px;
}

@media (max-width: 795px) {
.profile-picture {
height:200px;
}
  .introduction{flex-basis:99%;
   padding:.5em;
   margin:.5em;
   margin-top:-335px
  }
  .address{flex-basis:100%;
    margin-top:-15px;
  }

.button-row {
  display: flex;
  flex-flow:column nowrap;
  justify-content: center;
  align-items: center;
}
.no-image {
  display:none !important;
  color:red;
}
.petition-button {
  padding: 1.2rem;
  color: white;
  height: 40px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 1.8rem;
  cursor: pointer;
}

.petition-button.red {
  background: #830000;
}

.petition-button.blue {
  background: blue;
}

  
}
  @media (prefers-color-scheme: dark) {
    body{background: var(--darkmode);}
    .topics ul a {
      color:white;
    }
    .show-support-link {
	color:white;
	}

  }
  @media (prefers-color-scheme: dark) {
 .address, .topics {color:white;}
 
  }

`;


export default IndexPage;
