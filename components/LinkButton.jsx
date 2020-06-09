import React from 'react';
import { css } from 'emotion';
import Link from 'next/link';
import classNames from 'classnames';

export const styledLink = css`
  :hover {
    cursor: pointer;
  }
  height: auto;
  text-decoration: none;
  color: black;
  font-weight: unset;
`
const styleCheck = (specificStyle, defaultStyle) => specificStyle !== undefined ? classNames(defaultStyle, specificStyle) : defaultStyle;

export default ({ href, as, name, onClick, className, onMouseMove, onMouseEnter, onMouseLeave }) => (
  <Link href={href} as={as} passHref>
    <a
      className={styleCheck(className, styledLink)}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {name}
    </a>
  </Link>
)
