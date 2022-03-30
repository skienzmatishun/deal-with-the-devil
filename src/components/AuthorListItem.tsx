import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as _ from 'lodash';
import { lighten } from 'polished';
import React, { useState } from 'react';

import { css } from '@emotion/react';

import { colors } from '../styles/colors';
import { Author } from '../templates/post';
import { AuthorProfileImage } from './PostCard';
import styled from '@emotion/styled';

interface AuthorListItemProps {
  tooltip: 'small' | 'large';
  author: Author;
}

export const AuthorListItem: React.FC<AuthorListItemProps> = props => {
  const [hovered, setHover] = useState(false);
  let timeout: ReturnType<typeof setTimeout>;
  function handleMouseEnter() {
    if (props.tooltip !== 'large') {
      return;
    }

    clearTimeout(timeout);
    setHover(true);
  }

  function handleMouseLeave() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setHover(false);
    }, 600);
  }

  return (
    <AuthorListItemLi
      className="author-list-item"
      onMouseEnter={() => {
        handleMouseEnter();
      }}
      onMouseLeave={() => {
        handleMouseLeave();
      }}
    >
      {props.tooltip === 'small' && (
        <AuthorNameTooltip className="author-name-tooltip">{props.author.name}</AuthorNameTooltip>
      )}
      {props.tooltip === 'large' && (
        <div css={[AuthorCardStyles, hovered && Hovered]} className="author-card">
          {props.author.avatar && (
            <GatsbyImage
              image={getImage(props.author.avatar)!}
              css={AuthorProfileImage}
              className="author-profile-image"
              alt={props.author.name}
            />
          )}
          <div className="author-info">
            <div className="bio">
              <h2>{props.author.name}</h2>
              <p>{props.author.bio}</p>
              <p>
                <Link to={`/author/${_.kebabCase(props.author.name)}/`}>More posts</Link> by{' '}
                {props.author.name}.
              </p>
            </div>
          </div>
        </div>
      )}
      <Link
        css={AuthorAvatar}
        className="author-avatar"
        to={`/author/${_.kebabCase(props.author.name)}/`}
      >
        <div
          className="author-profile-image"
        />
      </Link>
    </AuthorListItemLi>
  );
};

const Hovered = css`
  opacity: 1;
  transform: scale(1) translateY(0px);
  pointer-events: auto;
`;

const AuthorListItemLi = styled.li`
  position: relative;
  flex-shrink: 0;
  margin: 0;
  padding: 0;

  :hover .author-name-tooltip {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const AuthorNameTooltip = styled.div`
  position: absolute;
  bottom: 105%;
  z-index: 999;
  display: block;
  padding: 2px 8px;
  color: white;
  font-size: 1.2rem;
  letter-spacing: 0.2px;
  white-space: nowrap;
  /* background: var(--darkgrey); */
  background: ${colors.darkgrey};
  border-radius: 3px;
  box-shadow: rgba(39, 44, 49, 0.08) 0 12px 26px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
  opacity: 0;
  transition: all 0.35s cubic-bezier(0.4, 0.01, 0.165, 0.99);
  transform: translateY(6px);
  pointer-events: none;

  @media (max-width: 700px) {
    display: none;
  }
`;

const AuthorCardStyles = css`
  position: absolute;
  bottom: 130%;
  left: 50%;
  z-index: 600;
  display: flex;
  justify-content: space-between;
  margin-left: -200px;
  width: 400px;
  font-size: 1.4rem;
  line-height: 1.5em;
  background: white;
  border-radius: 3px;
  box-shadow: rgba(39, 44, 49, 0.08) 0 12px 26px, rgba(39, 44, 49, 0.06) 1px 3px 8px;
  opacity: 0;
  transition: all 0.35s cubic-bezier(0.4, 0.01, 0.165, 0.99);
  transform: scale(0.98) translateY(15px);
  pointer-events: none;
  padding: 20px 20px 22px;

  :before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    display: block;
    margin-left: -8px;
    width: 0;
    height: 0;
    border-top: 8px solid #fff;
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
  }

  .author-info {
    flex: 1 1 auto;
    padding: 0 0 0 20px;
  }

  .author-info h2 {
    margin: 8px 0 0;
    font-size: 1.6rem;
  }

  .author-info p {
    margin: 4px 0 0;
    color: color(var(--midgrey) l(-10%));
  }

  .author-info .bio h2 {
    margin-top: 0;
  }

  .author-info .bio p {
    margin-top: 0.8em;
  }

  .author-profile-image {
    flex: 0 0 60px;
    margin: 0;
    width: 60px;
    height: 60px;
    border: none;
  }

  @media (max-width: 1170px) {
    margin-left: -50px;
    width: 430px;

    :before {
      left: 50px;
    }
  }

  @media (max-width: 650px) {
    display: none;
  }

  @media (prefers-color-scheme: dark) {
    /* background: color(var(--darkmode) l(+4%)); */
    background: ${lighten('0.04', colors.darkmode)};
    box-shadow: 0 12px 26px rgba(0, 0, 0, 0.4);

    :before {
      /* border-top-color: color(var(--darkmode) l(+4%)); */
      border-top-color: ${lighten('0.04', colors.darkmode)};
    }
  }
`;

const AuthorAvatar = css`
  display: block;
  overflow: hidden;
  margin: 0 -4px;
  width: 40px;
  height: 40px;
  transition: all 0.5s cubic-bezier(0.4, 0.01, 0.165, 0.99) 700ms;
   background-image: url("data:image/svg+xml,%3Csvg width='100' height='83' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath style='fill:%23000;stroke-width:.246073' d='m676.3 172.7-.6-5c-.6-4.7-1.6-11.1-2-12.4-.2-.8-.2-.8-1 1.9a23 23 0 0 1-6.1 10.4c-1.5 1.3-4.3 3-4.7 2.8a9 9 0 0 1 1-2.8c1.6-3.4 3.4-8 3.4-8.5a72.7 72.7 0 0 1-12 8.8 428.6 428.6 0 0 0-6.8 4.2l4.4-8 4.5-8-7 5.6-7.8 6.4-.9.7.8-2c1.9-5.1 4.2-11.7 4-11.8l-1 1.3A48.6 48.6 0 0 1 631 167l1.5-2.3c2.4-3.2 5.2-7.4 5-7.5l-1.9 1.6c-3 2.9-5.2 4.5-4.7 3.5a3297.3 3297.3 0 0 1 2.1-5.3c0-.2-.9.6-2 1.7a42.8 42.8 0 0 1-9.5 8l1.8-5.8 1.8-5.8-2.6 2.3c-4.1 3.8-9.4 7.8-9.8 7.3l.8-2c1.2-2.4 2.3-5 3.2-7.7 1.1-3.5.8-3.3-2.7 1.6a49 49 0 0 1-9.3 10.9c-1 .8-1 .8-.9.2l.5-1.2c1-2 1.7-5.9 1.1-6.2-.1-.1-.7.3-1.4.8-2.6 2.3-5 5.8-5.9 8.4-.2.8-.5 1.5-.6 1.5a9 9 0 0 1-.1-2.8c.1-3.2.7-5 2.5-8.5 2.2-4 5.1-7.6 11.1-13.9a31 31 0 0 0 6.4-7.8c.8-1.7.7-2.8-.5-5.2-1.7-3.2-4.5-5.8-11.2-10.3l-4-2.8-3.6.2a32 32 0 0 1-12.7-1.4c-.3-.2-.5 0-1 .8-.4 1-.5 1.4-.5 4.2l-.1 3.2c-.5 0-1.7-2-2.4-4-1.2-3.2-.8-6.8 1.2-11l2-3.4c3-3.5 9-6.8 15.4-8.3 1.8-.5 2-.6 3.7-2.4 2.1-2 3.6-3 5.5-3.1l1.3-.1-.7.5c-1.3 1-.7 1 1.9-.2 4.2-2 9-3.5 11.1-3.5h.7l-.7.8-.5.7 2.5-.7c4.7-1.5 9.5-2.2 13.4-1.9l2.3.2-1.3.4-1.4.6 2.3.3c3.8.2 8 1.4 13.2 3.7l2.7 1.2-1.2.1c-.6 0-1.1.2-1.1.3a43.2 43.2 0 0 1 7 3.5 38.2 38.2 0 0 1 8.2 7.5l-2.1-.5a7 7 0 0 0-2-.5l1.6 1.4c5.6 4 9.4 9.1 10.6 14.4l.3 1.1-2-2.1c-1.8-2-2.8-2.7-2.3-1.9 3.4 5.4 5.4 9.5 5.7 11.5l.1 1.1-1-.9c-2.1-1.8-3-2.5-3-2.3l1.2 2c3 4.7 4 8 4.6 14l.1 1.3-2-2c-1-1.2-1.9-2-1.9-2l.6 2.2a46.6 46.6 0 0 1 1.8 19c-.5 3.1-1.4 6.5-2.3 8.4-.5 1-.5 1.1-.7.6zm-21.4-7.4a55.9 55.9 0 0 0 14.8-13.7 77.8 77.8 0 0 1-3.8 13.6c.3.3 2.6-2.8 3.5-4.5a50.8 50.8 0 0 0 3.8-12 50.2 50.2 0 0 1 4.1 15.2c.1 1.2.2 1.2.4.7.2-.4.3-2.1.3-4.1 0-4.2-.8-8.9-2.7-16.5l-1.2-5.2 2.3 1.7c1.3 1 2.3 1.6 2.4 1.6l-.5-2.3c-.6-2-2.8-6.4-6.5-13.3l-1.4-2.7 1.1.9a14 14 0 0 0 3.8 2.4c.1-.1-.9-2.2-2.2-4.7l-2.6-5.2c-.2-.6-.2-.6.5-.3l1.9 1.3c1.8 1.5 2 1.5 1.1 0-1.4-2.6-6.1-7-13-12l-1.2-.7 2.6.1 2.6.2-.8-.8a44.8 44.8 0 0 0-11.6-7.1l-3-1.4 1-.2.8-.3-1.3-.6c-3-1.4-5.6-2-10.2-2.4a44 44 0 0 0-5.1-.1h-2l.8-.7.8-.7h-.9a62 62 0 0 0-14.6 4c-2 .7-2 .6-.6-1 1.4-1.7 1.4-1.8.6-1.5a21 21 0 0 0-4.3 2.3c-1.7 1.3-3.7 4.2-2.6 3.7 2-.7 7.2-.8 8.7-.1.8.3.8.3-1 .4-3.4 0-7.1 1.5-9.3 3.6-.8.7-1.1 1.1-.8 1l1.8-.5c1.5-.4 4.7-.5 5.6-.1.4.1.2.2-.8.4-1.8.2-3.7 1-5.2 2-1.2.7-1.8 1.5-1 1.2a17 17 0 0 1 7.7-1.1c2.2 0 5.1.1 6.5.3 2.2.3 3 .5 5.2 1.6 1.7.8 3 1.7 3.6 2.3 1.4 1.5 4 2.6 6.9 3 2.6.4 6.7 1.6 5.4 1.6l-2.1-.4c-.8-.2-2.3-.3-3.5-.3-1.7 0-2.3-.1-3.8-.8a19 19 0 0 0-3.2-1c-1.3-.2-1.4-.2-2.2.4l-1.3 1.3c-.3.6-.3.6 1 2 1.7 1.8 1.9 2.2.3.8-1.2-1.1-1.1-1-1.7-.9-.5.2-.5.8 0 1.1.6.3.4.3-2.5-.1-2.2-.4-2.6-.4-2.8-.1-.2.3-.3.3-.6 0-.8-.7-.5-1 1-.7 1.7.3 2.8 0 2.8-.7 0-.4.4-.5.6-.1.3.4.6.3.8-.2 0-.2.5-1 1-1.7.8-1.2.8-1.3.6-2a6 6 0 0 0-1-1.8c-.5-.5-.7-.6-.5-.3.3.8.3 2.5-.1 3.3-.2.4-.8 1-1.2 1.2-1.2.7-1.4.6-.5-.1 1.6-1.4 2-3.5 1-4.7-.6-.6-.8-.7-3.2-.8l-2.6-.1-.6.8c-1 1-1 2.7 0 4 .5 1 .5 1 0 .6l-1-1.5c-.2-.6-.7-1.3-1.2-1.7l-.7-.8v1c0 1 .8 2.3 2.2 3.6 1 .9 1.2 1.4.8 1.4-.4 0-2.8-2.5-3.7-3.8-1.6-2.4-2.2-1-.8 1.8 1 2 2.6 4 3.6 4.5l2.3.8c1.5.5 2.2 1 2.2 1.7 0 .5.4.6 2.3.8 2.2.2 1.7.5-.6.5H624l-.1-.8c0-.6 0-.6-1.8-.6-1.5 0-2-.2-4.1-1.2a21.1 21.1 0 0 0-7.4-2.2l-2.8-.5c-.6-.2-2.8-.2-8 0a63.4 63.4 0 0 1-7 0h2l-1.6-.6c-1.3-.6-2-.7-3.7-.7-2.3 0-3.6.4-4.3 1.4l-.3.8 1.3-.5c.8-.5 1.7-.7 2.9-.8h1.7s-.4.3-1 .4c-1.2.5-2.3 1.3-2 1.6.1.1 2.7.3 5.7.4l6.4.4c.6 0 1.8-.1 3.4-.5 2.2-.6 2.7-.6 3.2-.4.4.2 1.6.4 2.9.4 2 .1 2.3.2 4.5 1.5 3.3 1.8 4.4 2 7.2 2.1 2.1 0 2.3.1 1.7.4-.4.2-1.3.3-2.7.2-2 0-2.2 0-2 .4l.6.5c.3.1.4.2.3.3-.2.2-4-1.2-5.7-2l-1.2-.6 1 1c.6.5 2.5 1.7 4.3 2.6 1.8.8 3.2 1.6 3.1 1.6a84.7 84.7 0 0 1-5.2-1.3c.2.4 4 1.9 8 3.2 3.5 1.2 5.6 2.1 5.3 2.4l-1-.2a15 15 0 0 0-2.1-.6l-1.1-.1 1.2 1.2c1.4 1.3 2 2.6 2.2 4l.2 1-.4-.7c-.4-1-2.2-2.7-3.4-3.4-.8-.4-.8-.4-.4 0 .8 1 1.4 2.7 1.4 4.2 0 1.7-.7 4.3-1.5 5.4l-.3.3c1.4-4.5 1.3-7.2-.7-9l-.6-.5.5 1.4c.5 1.5.5 3.2-.1 4.3-.3.6-.4.5-.4-1 0-1-.2-2-.4-2.5l-.4-.8-.1 1.3a8 8 0 0 1-1.7 4c-.5.5-.5.5-.2 0 .1-.3.3-1.1.3-1.8v-1.4l-1 1.9c-.8 1.9-2.5 4.4-4.8 7a24 24 0 0 0-4.8 7c.1.5.5.2 4.2-3.4l5.2-5.4 1.2-1.4-.9 1.8c-.8 1.6-2.1 3.8-6.3 10.6-.8 1.4-1.5 2.6-1.4 2.7.3.2 4.6-4.3 7-7.4a25 25 0 0 1 2.3-2.5c0 .1-2.5 10-3.2 12-.6 1.8-.6 1.8-.1 1.6 1.2-.7 3.7-2.9 7.3-6.6 2.1-2.2 3.9-3.9 3.9-3.8 0 .7-3 11-3.7 12.6l-.5 1 .7-.4c1.6-1.2 7.4-7.6 10-11 .6-.7.6-.7.5-.1-.3 1.8-.9 6-.7 6 0 .2 1.8-1.5 3.9-3.6 2-2 3.8-3.7 4-3.6.2.2-2 4.3-5.8 10.9l.6-.3a110.5 110.5 0 0 0 12.5-13.8s-1 3.6-2.5 7.8l-2.4 7.8c0 .1 3.4-2.5 7.5-5.8 6-4.8 7.4-5.9 7.3-5.3a99.4 99.4 0 0 1-7.8 15.4l3.1-2zm-6.6-43a64.8 64.8 0 0 1-12.3-6.4c.3-.2.2-.3-.5-.8-1.6-1-1.5-1.2.2-.5 2 1 4 1.4 7.6 1.7 2.7.2 5.5.8 5.5 1.2h-1.2c-1.4-.3-1.6 0-.5.6a27 27 0 0 1 5 4c.3.5.3.5-.3 0a37 37 0 0 0-7.5-4.5s.5.6 1.3 1.2c2 1.4 2.8 2.3 1.3 1.3-1.5-1-4.2-2.1-4.5-2-.5.2 3.1 2.4 5.7 3.6 2.5 1 2.5 1.2.2.6zM623.5 112c-1.2-.4-1.6-2-.7-2.8 1-1 2.7-.3 2.7 1.2 0 1-1.1 1.8-2 1.6zm-12.3 46.9 1.5-2.3c0-.1-.5.1-1 .5a13 13 0 0 1-3.3 1.8l2.2-4.4 2.3-4.4-2.5 2.4-2.6 2.5-.1-1.5c-.1-.8-.3-1.5-.4-1.4-.8.2-5.2 6.3-6.4 8.7-1.2 2.3-1 2.4.6.6 1.8-2 3.5-3.2 4.4-3.2.5 0 .7.2.9.9.3.8.2 3.3-.2 4.7-.2 1 2.8-2.3 4.6-5zm8-27c-.4-1-1.2-2.2-1.8-2.8l-1.1-1.3.7.2c2.2.4 2.6.4 2.5.2a26 26 0 0 1-8.4-5c-.5-.5-.4-.6.8-.2.4 0 .8.1.8 0l-2-1.4c-1.9-1.3-2-1.5-1.3-1.5.3 0 1.4 0 2.2.2a6 6 0 0 0 1.7.1c.3-.3-2.7-1-5-1-3.8-.2-4-.1-1.8 1.3 4.1 2.8 8.6 7 12 11.2.7 1 1.5 1.8 1.5 1.7l-.7-1.8zm-36-11 .3-1.5.5-1.8c.5-3 4.1-4 9.4-2.4 2.2.6 2.4.7 3.8.4 1-.2 2.7-.2 5-.2 3.2.2 3.4.2 2.6-.2l-.9-.3 1.3.1 2.2.5 1 .2-.6-.8-.7-.6.9.4 1.5 1c.3.3 1 .6 1.8.7 1.4.2 4.5 1.3 7.2 2.5 1.4.6 2.3.9 3.2.9.7 0 1.3-.1 1.3-.2l-1.3-.5a8.5 8.5 0 0 1-4.9-2.8c-.5-.7-1-1.5-1-1.8 0-.7-1.7-3.1-3-4.3a9 9 0 0 0-2-1.3c-4-1.7-5.4-2.8-7.4-6l-1.2-2a38 38 0 0 0-6.4 1.7c-8.6 3.2-14 9.7-13.5 16.2.1 2.2.3 3 .6 2.8l.2-.7zm15.2-12.7c-1-.5-2-1.7-1.9-2 .2 0 2.6 1.8 2.7 2.2.2.4.3.4-.8-.2zm2.7-.5c-.4 0-1.5-.8-2.6-1.6-2-1.6-2.3-2.2-.8-2.2h.4c-.6.2-.5.9 0 .9 1.1 0 4 2 4 2.8 0 .4 0 .4-1 .1zm8-1.7 1.8-1.4c.7-.3.9-.5.5-.4-.8.2-2.4 1-3 1.5-.5.4-.5.4-.3-.6.4-2 2-3.7 4.7-5 .8-.4 1.4-.7 1.2-.7-.5 0-3 .7-3.7 1.2-.7.4-.8.4-.8 0 0-.6 1.2-2.7 2.4-4l1.1-1.4-3.2 1.6-3 1.3.5-1.2.3-1c-.8 0-4 3.9-4 5 0 .9 1 2.5 2.7 4.2l1.8 1.6 1-.7z' transform='translate(-580.8 -90)'/%3E%3C/svg%3E");
background-repeat: no-repeat no-repeat;
background-position: center center;
background-size: contain;

  @media (max-width: 500px) {
    width: 36px;
    height: 36px;
  }

  @media (prefers-color-scheme: dark) {
    /* border-color: color(var(--darkgrey) l(+2%)); */
    border-color: ${lighten('0.02', colors.darkgrey)};
    filter:invert(100%);
  }
`;
