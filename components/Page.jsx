import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import Modal from './Archive/Modal';
import Prints from './Prints/Prints';
import LinkButton from './LinkButton';
import Link from 'next/link';

import { BodyHtml, Body } from './PageStyle';
import { mainNav, navLinks, mainBtn, sideLinks, mobileSideLinks, archiveFooter } from './Home/NavStyle';


import Nav from '../components/Home/Nav';
import { css } from 'emotion';

const childrenAnimation = (onMouseMove) => css`
  opacity: 1;
	animation-name: 'fadeInOpacity';
	animation-iteration-count: ${onMouseMove ? 1 : 0};
	animation-timing-function: ease-in;
	animation-duration: 5s;
  @keyframes fadeInOpacity {
	0% {
		opacity: 0;
	}
  25% {
    opacity: 0;
  }
	100% {
		opacity: 1;
	}
}
`;

/* const childrenWithProps = (...params) => {
  console.log(params)
  // [true, "hus"] pass params like that to function
  return React.Children.map(params.children, child =>
    React.cloneElement(child, params)
  );
} */
const childrenWithProps = (children, windowWidth, isMobile, onHoverFooter, showModal) => {
  return React.Children.map(children, child =>
    React.cloneElement(child, { windowWidth: windowWidth, isMobile, onHoverFooter, showModal })
  )
}

const RenderPageElements = function renderPageElements({ currentRoute, isMobile, children, windowWidth, onHoverFooter, showModal }) {

  // ADD CUSTOM STYLING WARPPER AROUND CHILDREWITHPROPS FUNCTION 

  const routes = {
    '/': () => {
      return !isMobile ? (
        <div /* className={childrenAnimation(onMouseMove)} */>{childrenWithProps(children, windowWidth, isMobile)}</div>)
        : childrenWithProps(children, windowWidth, isMobile)

    },
    '/[projectName]/[projectImage]': () => {
   
      return childrenWithProps(children, windowWidth, isMobile, onHoverFooter, showModal)
    },
    '/prints': () => {
      return childrenWithProps(children, windowWidth, isMobile)
    },
    '/about': () => {
      return childrenWithProps(children, windowWidth, isMobile)
    },
    '/404': () => {
      return childrenWithProps(children, windowWidth, isMobile)
    },
    '/_error': () => {
      return childrenWithProps(children, windowWidth, isMobile)
    }
  }
  return routes[currentRoute]()
}

const archiveFooter33 = css`
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

const descriptionStyle = css`
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
`;

function DescriptionPage(props) {
  const selectedProject = props.children.props.projectData.find(proj => proj.title === props.router.query.projectName)
  return <div className={descriptionStyle} onClick={props.closeModal}>
    <p className={descriptionParagraph}>
      {selectedProject.description}
    </p>
  </div>
}

const Thumbnails = function Thumbnails(props, closeModal) {

  return <div className={descriptionStyle}>
    <Prints {...props} onClose={closeModal} />
  </div>
}

const Page = function Page(props) {
  // const cursorContent = useRef(null);

/*   const [firstRender, setFirstRender] = useState(true);
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

  const modal = modalType === 'description'
  const modalMounted = modalType !== null
  const showSideLinksStyle = isMobile ? mobileSideLinks : sideLinks
  const isIndex = props.router.route === '/'
  const isAbout = props.router.route === '/about'
  const AboutOrDescription = isIndex ? 'About' : 'Description'
  const InstaOrThumbs = isIndex ? 'Instagram' : 'Thumbnails'
  const instaLink = */ 'https://instagram.com/alexanderhana'



  return (
    <div /* className={classNames(BodyHtml, Body)}  */>
      <>
       {/*  <div className={cursorBackground(isMobile)} style={{ left: `${left}px`, top: `${top}px` }}/> */}
     {/*  <div className={cursorBackground(isMobile, onHoverFooter)} ref={cursorContent} /> */}
      {/*   <RenderPageElements
          currentRoute={props.router.route}
          isMobile={isMobile}
          children={props.children}
          windowWidth={windowWidth}
          onHoverFooter={onHoverFooter}
          showModal={showModal}
          mousePosition={{x: 2, y: 2}}
          setMousePosition={() => {}}
        /> */}
        {props.children}
       
        {/* <Modal modalTypeSelected={modal} show={showModal} isMobile={isMobile}>
          {modalMounted && (modal ? <DescriptionPage {...props} closeModal={closeModal} /> : <Thumbnails {...props} isMobile={isMobile} closeModal={closeModal} />)}
        </Modal> */}
      </>
    </div>
  );
}

export default Page;
