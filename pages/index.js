// import Link from 'next/link';
import { css, hydrate, injectGlobal } from 'emotion';
import Link from "next/link";

import Archive from '../components/Archive/Archive';

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids)
}

injectGlobal`
/*     @font-face {
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", 
  Helvetica, Arial, "Lucida Grande", sans-serif;
    src: url('/static/nivea.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    } */
    *,
    *::after,
    *::before {
      box-sizing: border-box;
    }
    html {
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", 
  Helvetica, Arial, "Lucida Grande", sans-serif;
    }
    body {
      font-size: 100%;
      min-height: 100%;
      position: relative;
      margin: 0;
    }
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
    button {
      background: none;
      outline: none;
      border: none;
      font-family: inherit;
    }
    a {
      text-decoration: none;
    }
    img[height],
    img[width] {
      max-width: none;
    }
    h1,h2,h3 {

    }
    svg {
      height: auto;
    }
    img {
      width: 100%;
      height: auto;
    }
`;

const basicStyle = css`
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", 
  Helvetica, Arial, "Lucida Grande", sans-serif;
  background-color: white;
`;
// default route : localhost/...

// add another file inside pages folder to add a route
// then add the components inside the new route


const Index = props => (
  <div className={basicStyle}>
    <Archive {...props} />
  </div>
);

export default Index;
