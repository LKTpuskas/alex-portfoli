import { css } from 'emotion';

export const archiveFooter = css`
  margin-bottom: 25px;
  position: absolute;
  -webkit-appearance: 0;
  bottom: 0;
  width: 100vw;
  font-size: 12px;
  @media (min-width: 360px) {
        font-size: 12px;
  }
  @media (min-width: 720px) {
    font-size: 25px;
    transition-timing-function: ease-in;
    transition: 0.2s; 
    transition: 3s;
  }
/* cubic-bezier() values for first example from preceding demo page */
/*     transition-timing-function: cubic-bezier(.1, .1, .2, .1);
  

  }
/*   @media (min-width: 1020px) {
    font-size: 50px;
    margin-bottom: 200px;
  } */

`;
/*  transform: translateY(-100px) scale(4); */
export const mainNav = css`
width: 100%;
  display: flex;
  position:relative;
  justify-content: center;
`;

export const navLinks = css`
  color: black;
  border: none;
  outline: none;
  padding: 0;
  cursor: pointer;
`;

export const mainBtn = css`
/* margin-right: 16px; */
/* width: 250px; */
    text-align: center;
    cursor: pointer;
    margin: 0 16px;
`

export const sideLinks = css`
/* width: 75px; */
    text-align: center;
    
 
 /*  &:first-child {margin-right: 16px;} */
/*   display: initial;
  min-width: 100px;
  text-align: center; */
`

export const mobileSideLinks = css`
  display: initial;
`