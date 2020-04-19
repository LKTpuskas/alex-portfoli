import { css } from 'emotion';


// transform: translateY(-100px) scale(4);
export const mainNav = css`
  display: flex;
  position: relative;
  justify-content: center;
  text-decoration: none;
  list-style-type: none;
  a {
    text-align: center;
    margin: 10px;
    padding: 15px;
    text-decoration: none;
  }
`;

export const navLinks = css`
  color: black;
`;

export const mainBtn = (isAnimating) => css`
  font-weight: bold;
${isAnimating ? `transform: scale(1);` : `transform: scale(1.5);`};
  transition: 3s;
  transition-timing-function: ease-out;
`;

export const sideLinks = (isAnimating, isHovered) => css`
  display: ${isHovered ? 'initial' : 'none'};
`

export const mobileSideLinks = css`
  display: initial;
`