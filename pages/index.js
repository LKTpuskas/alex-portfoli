// import Link from 'next/link';
import { css, hydrate, injectGlobal } from 'emotion';
import Home from '../components/Home/Home';

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  hydrate(window.__NEXT_DATA__.ids);
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
    }
    a {
      text-decoration: none;
    }
    img[height],
    img[width] {
      max-width: none;
    }
    svg {
      height: auto;
    }
    h1 {
      font-size: 7.9vw;
    }
    h2 {
      font-size: 6.0vh;
    }
    p {
      font-size: 2vmin;
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
    <Home {...props} />
  </div>
);

export default Index;
