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
                 <div className="deal-logo" />
                ) : (
                  config.title
                )}
              </SiteTitle>
              <SiteDescription>{config.description}</SiteDescription>
            </SiteHeaderContent>
          </div>
        </div>
        <div css={inner}>
          <div style={{ padding: "1rem" }}>
            <p style={{ fontSize: "2.25rem", marginTop: "3rem", marginBottom: "1.5rem" }}>“I have made a deal, a deal with the devil so that evidence could be heard, so the dots could be connected. If you don’t like that deal, you come after your D.A.”</p>
            <p style={{ marginTop: "0", marginBottom: "4rem" }}> - David Whetstone.</p>
          </div>
          <div className="topContainer" style={{ display: "flex", flexFlow: "row wrap" }}>
            <div className="introduction">

              <p style={{ fontSize: "4rem", marginBottom: "4rem" }}>Ask yourself—</p>
              <p> How can someone be convicted of murder, based entirely on testimony of a single person who is bargaining on a reduced sentence?</p>
              <p>No blood, no DNA, no witnesses?</p>
              <p>5 alibi witnesses, no fingerprints, no fiber, no weapon, no ballistics— no justice.</p>
              <p>This case is destined to be a feature documentary exposing an inept and corrupt judical system.</p>
              <p>No timeline, two medical examiner reports that dispute state's cause of death.</p>
              <h2 style={{ marginTop: "20px" }} >Mission Statement </h2>
              <p>The release of wrongfully convicted Murray "Bubba" Lawrence Jr.</p>
            </div>
            <div className="address">
              <a href="https://chng.it/pv4xJVYLPR"> <span className="petition-button" >Sign Petition</span></a>
              <div>

                <h2 style={{ textAlign: "center", fontSize: "2rem", margin: "2rem", marginTop:"5rem" }}>Murray Bubba Lawrence Jr.</h2>
                <img style={{ borderTopRightRadius: "4px", borderTopLeftRadius: "4px" }} src={Lawrence} alt="Murray Bubba Lawrence Jr." />
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
          </div>
          <div className="topics">
            <h2 style={{ margin: "4rem" }}>Topics</h2>
            <ul style={{ listStyle: "none", fontSize: "3rem", display: "inline-flex", flexFlow: "row wrap", background:"#00000025" }}>
              <Link to={`/introduction/`}>
                <li style={{minWidth:"240px"}}>Introduction</li>
              </Link>
              <Link to={`/tags/baldwin-county/`}>
                <li style={{minWidth:"240px"}}>Baldwin County</li>
              </Link>
              <Link to={`/tags/testimonials/`}>
                <li style={{  minWidth:"240px" }}>Testimonials</li>
              </Link>
            </ul>
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
    header: file(relativePath: { eq: "img/blog-cover.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 2000, quality: 50, layout: FIXED)
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
  flex-basis:28%;
  border-radius:4px;
font-size:2.3rem;
color:black;
margin-top:-100px;
height:750px;
padding:.5rem;
}

.topics {
  border-radius:4px;
  color:black;
  margin-bottom:2rem;
  padding:1rem;
} 
.topics ul a {
  margin-left:.5em;
  padding:1em;
  color:black;
}
.introduction {
  font-size:2.3rem;
  flex-basis:61%;
  margin:.5rem; 
  padding:.5rem;
  margin-right:2rem;
  
}
.topContainer {
  background:#00000025;
  padding:2em;
  border-radius:4px;
}

.petition-button {
  background: #830000;
  padding:1.5rem;
margin:2rem;
color:white;
}

.deal-logo {
background-image: url("data:image/svg+xml,%3Csvg width='118.682' height='87.9581' viewBox='0 0 31.4013 23.2722' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath style='font-size:10.5833px;line-height:1.25;font-family:Aleo;-inkscape-font-specification:Aleo;fill:%23fff;stroke-width:.999999' d='M5.8281 0v1.6797c0 .4265.212.6796.6387.7598l2.2402.4804v9.754H4.8574v3.0468H8.707v10.039l-2.2402.4395c-.4267.08-.6387.3331-.6387.7598v1.6816h13.2403c2.8 0 5.265-.6008 7.3984-1.8008 2.1333-1.2 3.7876-2.879 4.961-5.039.9755-1.7959 1.5425-3.8234 1.707-6.0801h5.293v10.039l-2.2794.4395c-.4.08-.6015.3331-.6015.7598v1.6816h20.5605V22h-1.9199c-.5068 0-.801.214-.8809.6406l-.2382 2.879H42.3477v-9.7989h10.5312v1.3066l2.5684-1.4824 2.5703-1.4844-2.5703-1.4824-2.5684-1.4843v1.5859h-8.7227v-.0059h-1.8085V3.1602h10.7207l.2793 3.08c.08.4534.3598.6797.8398.6797h1.92V0H35.5468v1.6797c0 .4265.2015.6796.6015.7598.24.08.9993.2405 2.2793.4804v9.754h-5.3105c-.184-2.1355-.7338-4.0665-1.6504-5.793-1.1467-2.16-2.7866-3.841-4.92-5.041C24.4136.6131 21.9218 0 19.0685 0H5.828zm65.3594 0L60.7871 25.92l-1.5996.4804c-.3467.08-.5195.292-.5195.6387v1.6015h8.1992v-1.6015c0-.3466-.1729-.5586-.5195-.6387l-1.6407-.4805 2.2403-5.7597h12.3593l2.2403 5.7597-1.6387.4805c-.3733.08-.5605.292-.5605.6387v1.6015h8.2402v-1.6015c0-.3466-.1729-.5586-.5195-.6387l-1.6016-.4805L75.1074 0h-3.9199zm18.7207 0v1.6797c0 .1866.0516.3595.1582.5195.1066.1333.2547.2135.4414.2403l2.2793.4414v22.8398l-2.2793.4395c-.1867.0267-.3348.1193-.4414.2793-.1066.1332-.1582.2937-.1582.4804v1.7207h20.08v-6.2402h-1.9609c-.2133 0-.4005.066-.5605.1992-.16.1333-.2526.2938-.2793.4805-.0801.2933-.1604 1.0526-.2402 2.2793H96.627V2.8809l2.2812-.4414c.1868-.0268.3329-.107.4395-.2403.1065-.16.1601-.3328.1601-.5195V0h-9.5996zM12.627 3.1191h6.4414c3.2266 0 5.7185 1.0144 7.4785 3.041 1.467 1.6893 2.3222 3.861 2.5664 6.5137H12.627V3.1191zm60.4804.5215c.3733 1.28.6675 2.1854.8809 2.7188l4.2383 11H68.0273l4.2793-11c.2134-.5867.4808-1.492.8008-2.7188zM12.627 15.7207h16.5097c-.2136 2.81-1.0902 5.0765-2.6289 6.7988-1.76 2-4.2394 3-7.4394 3H12.627v-9.7988zm-.5137 21.9336c-.166 0-.3257.061-.4766.1816-.1358.1207-.2261.2407-.2715.3614L7.5391 49.4727c-.0907.2867-.204.7533-.3399 1.4023-.0453-.332-.1503-.7986-.3164-1.4023L3.8945 39.33c.0905-.0151.2418-.0465.4532-.0918.2113-.0451.4824-.106.8144-.1817.2414-.0451.3613-.1797.3613-.4062v-.9746H0v.9746c0 .2263.1219.3609.3633.4062.166.0605.5422.1528 1.1308.2735l4.5274 14.58h1.9922l4.121-12.3613a4.456 4.456 0 0 0 .045-.205 4.322 4.322 0 0 1 .0469-.2032l.1113-.4082c.0753.3622.151.6353.2266.8164l4.0976 12.3614h1.9922l4.5293-14.5586 1.1309-.248c.2413-.0455.3632-.1903.3632-.4317v-.9727h-5.3886v.9512c0 .2414.1216.3843.3632.4297l.4747.0918c.4377.1056.7025.1582.793.1582l-3.0118 10.1426-.1348.6328-.1132.7246c-.0754-.3924-.1973-.8443-.3633-1.3574L13.494 38.1973c-.1358-.3623-.3858-.543-.748-.543h-.6328zm13.7187.045v.951c0 .2264.0904.363.2715.4083l1.3594.2715v12.9258l-1.3145.25c-.2114.0453-.3164.1883-.3164.4296v.9747h5.4551v-.9747c0-.2263-.0903-.3628-.2715-.4082l-1.3808-.2714V39.33l1.3125-.25c.2265-.0454.3398-.1883.3398-.4297v-.9512h-5.455zm6.6328 0v3.578h1.088c.2564 0 .4077-.0756.453-.2265.0454-.166.1127-.6724.2032-1.5176h3.8262v12.7227l-1.2461.25c-.121.015-.2177.0677-.293.1582-.0605.0756-.0918.1742-.0918.2949v.9512h5.4785v-.9512c0-.2263-.0756-.3629-.2266-.4082-.0603-.0151-.4365-.0908-1.1308-.2266l-.2715-.0449V39.5566h3.8027c.0756.7396.1513 1.2376.2266 1.4942.0454.151.1883.2265.4297.2265h1.1094v-3.578H32.4648zm14.4903 0v.951c0 .2264.0903.363.2715.4083l1.3574.2715v12.9258l-1.289.25c-.2266.0453-.34.1883-.34.4296v.9747h5.4552v-.9747c0-.2262-.5423-.4531-1.629-.6796v-5.7266h8.7383v5.7266l-1.2675.25c-.2414.0453-.3633.1883-.3633.4296v.9747h5.4785v-.9747c0-.2263-.0903-.3628-.2715-.4082l-1.3574-.2714V39.33l1.3125-.25c.2265-.0454.3398-.1883.3398-.4297v-.9512h-5.4785v.9512c0 .2263.0903.3628.2715.4082l1.3594.2715v5.5918h-8.7403V39.33c.7547-.1358 1.2148-.2262 1.3809-.2715.151-.0452.2266-.1817.2266-.4082v-.9512H46.955zm22.4804 0v3.578h1.086c.2565 0 .4078-.0756.4531-.2265.0454-.166.1146-.6724.205-1.5176h3.8263v12.7227l-1.2461.25c-.121.015-.2196.0677-.295.1582-.0604.0756-.0898.1742-.0898.2949v.9512h5.4785v-.9512c0-.2263-.0756-.3629-.2265-.4082-.0604-.0151-.4366-.0908-1.131-.2266l-.2733-.0449V39.5566h3.8046c.0756.7396.1513 1.2376.2266 1.4942.0454.151.1883.2265.4297.2265h1.1094v-3.578H69.4355zm14.4883 0v.951c0 .2264.0923.363.2735.4083l1.3574.2715v12.9258l-1.291.25c-.2265.0453-.3399.1883-.3399.4296v.9747h5.457v-.9747c0-.2262-.5441-.4531-1.6308-.6796v-5.7266h8.7402v5.7266l-1.2675.25c-.2414.0453-.3633.1883-.3633.4296v.9747h5.4785v-.9747c0-.2263-.0903-.3628-.2715-.4082l-1.3574-.2714V39.33l1.3125-.25c.2262-.0454.3398-.1883.3398-.4297v-.9512h-5.4785v.9512c0 .2263.0903.3628.2715.4082l1.3574.2715v5.5918h-8.7383V39.33c.7547-.1358 1.2148-.2262 1.3809-.2715.151-.0452.2266-.1817.2266-.4082v-.9512h-5.457zm17.8868 0v.951c0 .2415.1116.3844.3378.4298.1359.0453.5666.1357 1.291.2715v12.9277l-1.291.25c-.2262.0454-.3378.1883-.3378.4297v.9512h11.6367v-3.7598h-1.088c-.2866 0-.4526.1219-.498.3633l-.1347 1.6289h-6.0684v-5.5469h5.9766V44.877h-5.9766v-5.3887h6.0684l.1582 1.7422c.0452.2565.2029.3847.4746.3847h1.0879v-3.916h-11.6367zM2.043 59.2382v1.6797c0 .4265.212.6796.6386.7597l2.2403.4805V84.998l-2.2403.4395c-.4266.08-.6386.3331-.6386.7598v1.6816h13.2402c2.8 0 5.2651-.6008 7.3984-1.8008 2.1334-1.2 3.7877-2.879 4.961-5.039 1.1733-2.16 1.7597-4.6538 1.7597-7.4805 0-2.8-.574-5.2795-1.7207-7.4395-1.1466-2.16-2.7865-3.841-4.9199-5.041-2.1333-1.2266-4.6252-1.8398-7.4785-1.8398H2.043zm29.7187 0v1.6797c0 .4265.1996.6796.5996.7597.24.0802 1.0013.2406 2.2813.4805V84.998l-2.2813.4395c-.4.08-.5996.3331-.5996.7598v1.6816h20.5606v-6.6406h-1.92c-.5067 0-.801.214-.8808.6406l-.2403 2.879H38.5626v-9.799H49.123v-3.041H38.5625v-9.5195h10.7188l.2812 3.0801c.08.4534.3598.6797.8398.6797h1.92v-6.92H31.7617zm22.8399 0v1.7597c0 .4002.2015.6409.6015.7208.24.08.919.2386 2.039.4785L67.7228 87.959h3.4785l10.5215-25.7617 2-.4785c.3733-.08.5585-.3208.5585-.7208v-1.7207l-9.4785-.039v1.6797c0 .4265.1996.6796.5996.7597.24.0802.9993.2406 2.2793.4805l-7.2402 18.1992c-.24.56-.5466 1.6135-.92 3.1602-.3466-1.44-.6656-2.4792-.9589-3.1192l-7.3203-18.2011 1.1992-.2383.8809-.2012c.5333-.08.8007-.333.8007-.7598v-1.7597h-9.5214zm31.8007 0v1.6797c0 .3998.1605.6405.4805.7207l2.3984.4804V84.959l-2.3183.4394c-.3734.08-.5606.3331-.5606.7598v1.7207h9.6407v-1.7207c0-.3999-.1605-.6406-.4805-.7207l-2.4414-.4785V62.119l2.3203-.4414c.4-.08.6016-.333.6016-.7597v-1.6797h-9.6407zm12.1993 0v1.6797c0 .1866.0535.3595.1601.5195.1066.1333.2528.2135.4395.2402l2.2812.4395V84.959l-2.2812.4394c-.1868.0267-.3329.1193-.4395.2793-.1066.1333-.1601.2938-.1601.4805v1.7207h20.08v-6.2402h-1.959c-.2133 0-.4005.0659-.5605.1992-.16.1333-.2526.2938-.2793.4805-.0801.2933-.1604 1.0526-.2402 2.2793h-10.3203V62.1172l2.2793-.4395c.1867-.0267.3348-.107.4414-.2402.1065-.16.1582-.3328.1582-.5195v-1.6797h-9.5996zM8.8418 62.3574h6.4414c3.2267 0 5.7185 1.0144 7.4785 3.041 1.76 2.0267 2.6406 4.7469 2.6406 8.1602 0 3.4667-.893 6.1992-2.6796 8.1992-1.76 2-4.2395 3-7.4395 3H8.8418V62.3574z' transform='scale(.26458)'/%3E%3C/svg%3E");
background-repeat: no-repeat no-repeat;
background-position: center center;
background-size: cover;
height:200px;
width:275px;
}

@media (max-width: 795px) {
  .introduction{flex-basis:95%;
   padding:.5em;
   margin:.5em;
  }
  .address{flex-basis:100%;
    min-height:975px;
    margin-top:1em;
  }
  .topics {
    width:100%;
  }
  
}
  @media (prefers-color-scheme: dark) {
    body{background: var(--darkmode);}
    .topics ul a {
      background:#00000025;
      color:white;
    }
    

  }
  @media (prefers-color-scheme: dark) {
 .address, .topics {color:white;}
 
  }

`;


export default IndexPage;
