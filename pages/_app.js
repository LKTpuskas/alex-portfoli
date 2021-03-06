import App from 'next/app';

import Page from '../components/Page';
import ModalContent from '../components/Overlay/ModalContent';
/* import Overlay from '../components/Overlay/Overlay';
import LandingPage from '../components/Overlay/LandingPage'; */
import Spinner from '../components/Spinner';
import { css, injectGlobal } from 'emotion';
import { bulkData } from '../components/data';
/* import Error from 'next/error' */
// import fetch from 'isomorphic-unfetch'

import { PageTransition } from 'next-page-transitions'

injectGlobal`
  .page-transition-enter {
    opacity: 0;
  }
  .page-transition-enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }
  .page-transition-exit { 
    opacity: 1;
  }
  .page-transition-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
`

/* const status = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText));
};

const json = response => response.json(); */

class MyApp extends App {
  render() {
    const { Component, router } = this.props;
    
    const loadComponents = bulkData
      ? <Page key={router.route} router={router}>
        <Component key={router.route} {...bulkData} />
      </Page> : <Spinner />;

    /* {overlayContent} */
    return loadComponents
  }
}

export default MyApp;
