import { Link } from 'gatsby';
import React from 'react';
import { css } from '@emotion/react';



export const SiteNavLogo = () => (
 
      <Link className="site-nav-logo" css={SiteNavLogoStyles} to="/">
       <div className="deal-logo" />
      </Link>
 
);

const SiteNavLogoStyles = css`
  position: relative;
  z-index: 100;
  flex-shrink: 0;
  display: inline-block;
  margin-right: 32px;
  padding: 12px 0;
  color: #fff;
  font-size: 1.7rem;
  line-height: 1.8rem;
  font-weight: bold;
  letter-spacing: -0.5px;
  text-transform: none;

  :hover {
    text-decoration: none;
  }

  img {
    display: block;
    width: auto;
    height: 21px;
  }
  .deal-logo{
    background-image: url("data:image/svg+xml,%3Csvg width='118.682' height='87.958' viewBox='0 0 31.401 23.272' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext xml:space='preserve' style='font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-size:10.5833px;line-height:1.25;font-family:Aleo;-inkscape-font-specification:Aleo;fill:%23fff;stroke-width:.264583' x='24.655' y='275.645' transform='translate(-23.473 -268.067)'%3E%3Ctspan style='font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-family:Aleo;-inkscape-font-specification:Aleo;fill:%23fff;stroke-width:.264583' x='24.655' y='275.645'%3EDEAL%3C/tspan%3E%3C/text%3E%3Cpath style='fill:%23fff;fill-opacity:.996078;stroke-width:9.5;stroke-opacity:.996078' transform='translate(.007 -141.258) scale(.20472)' d='m68.268 711.99.036-3.835.037-3.834 3.302 1.949 3.302 1.949-3.339 1.885z'/%3E%3Cpath style='fill:%23fff;fill-opacity:1;stroke-width:1.45188;stroke-opacity:.996078' d='M24.758 271.421h10.398v.806H24.758z' transform='translate(-23.473 -268.067)'/%3E%3Ctext xml:space='preserve' style='font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-size:5.99004px;line-height:1.25;font-family:Aleo;-inkscape-font-specification:Aleo;fill:%23fff;stroke-width:.149751' x='11.434' y='247.728' transform='translate(-11.542 -233.464)'%3E%3Ctspan style='font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-family:Aleo;-inkscape-font-specification:Aleo;fill:%23fff;stroke-width:.149751' x='11.434' y='247.728'%3EWITH THE%3C/tspan%3E%3C/text%3E%3Ctext xml:space='preserve' style='font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-size:10.5833px;line-height:1.25;font-family:Aleo;-inkscape-font-specification:Aleo;fill:%23fff;stroke-width:.264583' x='11.722' y='256.715' transform='translate(-11.542 -233.464)'%3E%3Ctspan style='font-style:normal;font-variant:normal;font-weight:400;font-stretch:normal;font-family:Aleo;-inkscape-font-specification:Aleo;fill:%23fff;stroke-width:.264583' x='11.722' y='256.715'%3EDEVIL%3C/tspan%3E%3C/text%3E%3C/svg%3E");
background-repeat: no-repeat no-repeat;
background-position: center center;
background-size: cover;
height:19px;
width:26px;
  }
`;

