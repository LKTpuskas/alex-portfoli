import { css } from 'emotion';

export const imageWrapper = css`
width: 100%;
max-width: 800px;
min-height: 400px;
margin: auto;
text-align: center;
`;

export const gallery = css`
  background-color: white;
  @media screen and (min-height: 24em) {
    height: auto;
    width: 38%;
  }

  @media screen and (min-height: 48em) {
    height: auto;
    width: 50%;
  }

  @media screen and (min-height: 64em) {
    height: auto;
    width: 50%;
  }

  @media screen and (min-height: 85.375em) {
    height: auto;
    width: 50%;
  }

  @media screen and (min-height: 120em){
    
  }
`;
