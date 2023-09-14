import { Link } from 'gatsby';
import { setLightness } from 'polished';
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { colors } from '../styles/colors';
import { outer, inner } from '../styles/shared';
import config from '../website-config';
export const Footer: React.FC = () => (
  <footer css={[outer, SiteFooter]}>
    <div css={[inner, SiteFooterContent]}>
      <section className="copyright">
        <Link to="/">{config.title}</Link> &copy; {new Date().getFullYear()}{' '}
        {config.footer && (
          <Link to="/">
            | {config.title} {config.footer}
          </Link>
        )}
      </section>
      <SiteFooterNav>
        <Link to="https://spot.fund/7p2k2se">Make a Donation</Link>
        {config.facebook && (
          <a href={config.facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        )}
        {config.twitter && (
          <a href={config.twitter} target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        )}


        Sponsor:<a href="https://rippreport.com">Rippreport.com</a>
      </SiteFooterNav>
    </div>
  </footer>
);

const SiteFooter = css`
  position: relative;
  padding-top: 20px;
  padding-bottom: 60px;
  color: #fff;
  background: linear-gradient(0deg, #420000, #3e0101, #3b0201, #370301, #330402, #300502, #2c0502, #290402, #260301, #230201, #1f0101, #1b0000);  `;

const SiteFooterContent = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.3rem;
  a {
    color: rgba(255, 255, 255, 0.7);
  }
  a:hover {
    color: rgba(255, 255, 255, 1);
    text-decoration: none;
  }
  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

const SiteFooterNav = styled.nav`
  display: flex;

  a {
    position: relative;
    margin-left: 20px;
  }

  a:before {
    content: '';
    position: absolute;
    top: 11px;
    left: -11px;
    display: block;
    width: 2px;
    height: 2px;
    background: #fff;
    border-radius: 100%;
  }

  a:first-of-type:before {
    display: none;
  }
  @media (max-width: 650px) {
    a:first-of-type {
      margin-left: 0;
    }
  }
`;
