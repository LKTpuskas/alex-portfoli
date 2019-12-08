import App from 'next/app';
import fetch from 'isomorphic-unfetch'

import Page from '../components/Page';
import ModalContent from '../components/Overlay/ModalContent';
import Overlay from '../components/Overlay/Overlay';
import LandingPage from '../components/Overlay/LandingPage';
import Spinner from '../components/Spinner';
import { css, injectGlobal } from 'emotion';
import { bulkData } from './data';
import Error from 'next/error'
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
  state = {
    fadeOutOverlay: true,
    unMountOverlay: true
  };
  componentDidMount() {
    setTimeout(() => this.setState({ fadeOutOverlay: false }), 6000);
    setTimeout(() => this.setState({ unMountOverlay: false }), 10000);
  }

  componentWillUnmount() {
  }
  render() {
    const { Component, pageProps, router } = this.props;
    const { fadeOutOverlay, unMountOverlay } = this.state;
    const content = <ModalContent {...bulkData} />;
    const loadComponents = bulkData
      ? <Page key={router.route}>
        <Component key={router.route} {...bulkData} />
      </Page> : <Spinner />;

    /* {overlayContent} */
    return (
        <PageTransition
          skipInitialTransition={true}
          timeout={400}
          classNames="page-transition" >
          {loadComponents}
        </PageTransition>
    )
  }
}

export default MyApp;
