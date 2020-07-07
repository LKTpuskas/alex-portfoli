import App, { Container } from 'next/app';
import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';

import { sideLinks, mobileSideLinks } from '../components/Home/NavStyle'
import Nav from '../components/Home/Nav'
import Modal from '../components/Archive/Modal'
import { BodyHtml, Body } from '../components/PageStyle'
import { useRouter } from 'next/router'

import Page from '../components/Page';
import ModalContent from '../components/Overlay/ModalContent';
/* import Overlay from '../components/Overlay/Overlay';
import LandingPage from '../components/Overlay/LandingPage'; */
import Spinner from '../components/Spinner';
import { css, injectGlobal } from 'emotion';
import { bulkData } from '../components/data';
import Prints from '../components/Prints/Prints';

import CustomCursor from '../components/CustomCursor'
import { CursorContextProvider, useCursorContext } from '../components/CursorContext'

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

export const cursorCircle = css`
  @keyframes spinner {
  0% {
      transform:  rotate(0deg);
  }
  100% {
       transform:  rotate(360deg);
  }
  }
}
  &:after {
      animation: 3.5s linear infinite spinner;
      /* border: black 2px dotted; */
      border-radius: 50%;
      content: "";
      height: 50px;
    
      /* border: 2px dotted #6aa8ff; */
      border: 1px solid #181818ed;
      background: #040404e8;;
      
      position: absolute;
      transform: translate3d(-50%, -50%, 0);
      transform-origin: center;
      width: 50px;
      will-change: transform;
  } 
`
/* const status = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText));
};

const json = response => response.json(); */

const descriptionStyle = css`
  display: flex;
  align-items: center;
`

const modalWrapper = css`
  height: 100vh;
  width: 100vw;
  margin: 8px;
`
const descriptionParagraph = css`
  text-align: center;
  margin: 0;
  font-size: 40px;
  padding: 50px;
  @media (min-width: 1300px) {  /* laptop */
    margin: 15vw;
  }
`

function DescriptionPage(props) {
  const selectedProject = props.projectData.find(proj => proj.title === props.router.query.projectName)
  return <div className={classNames(descriptionStyle, modalWrapper)} onClick={props.closeModal}>
    <p className={descriptionParagraph}>
      {selectedProject.description}
    </p>
  </div>
}

const Thumbnails = function Thumbnails(props) {

  return <div className={modalWrapper}>
    <Prints projectData={props.projectData} closeModal={props.closeModal} />
  </div>
}

function MyApp({ Component, pageProps, router }) {

  const [firstRender, setFirstRender] = useState(true);
  const [mouseMove, setMouseMove] = useState(false);
  const [onHoverFooter, setOnHoverFooter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [windowWidth, setWindowWidth] = useState(0);
  
  const isMobile = windowWidth < 1100


  const triggerModal = useCallback((type) => {
    setShowModal(true)
    setModalType(type)
  }, [])

  const closeModal = useCallback(() => { // might be wrong use of useCallback
    setShowModal(false)
    setTimeout(() => setModalType(null), 2000)
  }, [])

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [windowWidth])

  const modalTypes = modalType === 'description'
  const modalTypeNotNull = modalType !== null
  const showSideLinksStyle = isMobile ? mobileSideLinks : sideLinks
  const isIndex = router.route === '/'
  const isAbout = router.route === '/about'
  const AboutOrDescription = isIndex ? 'About' : 'Description'
  const InstaOrThumbs = isIndex ? 'Instagram' : 'Thumbnails'
  const instaLink = 'https://instagram.com/alexanderhana'

  return (

    <CursorContextProvider>
      <div className={classNames(BodyHtml, Body)}>
       <CustomCursor clickScale={1.05} style={cursorCircle}/>
       <Component key={router.route} windowWidth={windowWidth} modalType={modalType} modalMounted={showModal} {...bulkData} />
     {/*  <Page key={router.route} router={router}>
      </Page> */}
      <Nav router={router} isAbout={isAbout} triggerModal={triggerModal} isMobile={isMobile} setOnHoverFooter={setOnHoverFooter}/>
      <Modal modalTypeSelected={modalTypes} show={showModal} isMobile={isMobile}>
          {modalTypeNotNull && (modalTypes ? <DescriptionPage {...bulkData} router={router} closeModal={closeModal} /> : <Thumbnails {...bulkData} isMobile={isMobile} closeModal={closeModal} />)}
        </Modal>
      </div>
  </CursorContextProvider>
  )
}

/* class MyApp extends App {
  render() {
    const { Component, router } = this.props
    
    const loadComponents = bulkData
      ? (
        <CursorContextProvider>
          <Container>
            <CustomCursor style={cursorCircle}/>
              <Component key={router.route} {...bulkData} />
            <Page key={router.route} router={router}>
            </Page>
          </Container>
        </CursorContextProvider>
      )
      : <Spinner />
    return loadComponents
  }
} */

export default MyApp;
