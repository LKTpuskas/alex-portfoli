import { css } from 'emotion';

export const BodyHtml = css`
  margin: 0;
  padding: 0;
`;
// font: 14px Helvetica Neue, Helvetica, Arial, sans-serif;

export const Body = css`
  overflow: hidden;
  min-height: 100vh;
  min-width: 100vw;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -ms-font-smoothing: antialiased;
  ¨font-smoothing: antialiased;
  font-weight: 300;
  transition: opacity 1s ease-in-out;
  position: relative;
  list-style-type: none;
  ::selection {
    background: #151515;
  }
`;

/*   const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika_next';
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  button {  font-family: 'radnika_next'; }
`;
 */
