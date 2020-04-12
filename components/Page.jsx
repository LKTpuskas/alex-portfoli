import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import Modal from './Archive/Modal';
import Prints from './Prints/Prints';

import { BodyHtml, Body } from './PageStyle';

import Nav from '../components/Home/Nav';
import { css } from 'emotion';

const archiveFooter = (isAnimating) => css`
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
/*     transform: ${!isAnimating ? `translateY(40)` : `translateY(0)`};
    transition-timing-function: ease-in;
    transition: 0.2s; */
    transition: 3s;
    
/* cubic-bezier() values for first example from preceding demo page */
    transition-timing-function: cubic-bezier(.1, .1, .2, .1);
    ${isAnimating ? `transform: translateY(0px);` : `transform: translateY(-350px);`}
   /*  margin-bottom: ${!isAnimating ? '400px' : '100px '}; */
  }
/*   @media (min-width: 1020px) {
    font-size: 50px;
    margin-bottom: 200px;
  } */

`;

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

const childrenWithProps = (children, windowWidth, isMobile) => {
  return React.Children.map(children, child =>
    React.cloneElement(child, { windowWidth: windowWidth, isMobile })
  );
}

function renderPageElements(currentRoute, onMouseMove, isMobile, children, windowWidth) {
  const routes =  { 
    '/': () => {
      return onMouseMove && !isMobile ? <div className={childrenAnimation(onMouseMove)}>{childrenWithProps(children, windowWidth, isMobile)}</div> 
    : childrenWithProps(children, windowWidth, isMobile)

    },
    '/[projectName]/[projectImage]': () => {
      return childrenWithProps(children, windowWidth, isMobile)
    },
    '/prints': () => {
      return childrenWithProps(children, windowWidth, isMobile)
    },
    '/about': () => {
      return childrenWithProps(children, windowWidth, isMobile)
    }
  }
    return routes[currentRoute]();
}


const descriptionStyle = css`
  height: 100vh;
  background: blue;
`;

const descriptionParagraph = css`
  text-align: center;
  margin: 0;
  font-size: 40px;
  padding: 50px;
`;

function DescriptionPage(props) {
  const selectedProject = props.children.props.projectData.find(proj => proj.title === props.router.query.projectName)
  return <div className={descriptionStyle} onClick={props.closeModal}>
      <p className={descriptionParagraph}>
        {selectedProject.description}
      </p>
  </div>
}

function Thumbnails(props, closeModal) {
  return <div className={descriptionStyle}>
      <Prints {...props} onClose={closeModal}/>
  </div>
}

const Page = props => {
    const [firstRender, setFirstRender] = useState(true);
    const [onMouseMove, setMouseMove] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [windowWidth, setWindowWidth] = useState(0);

    const triggerModal = useCallback((type) => {
      setShowModal(true);
      setModalType(type);
    });

    const closeModal = useCallback(() => {
      setShowModal(false);
    });
    
    useEffect(() => {
      setWindowWidth(window.innerWidth)
    }, [windowWidth])
    useEffect(() => {
      onMouseMove && setTimeout(() => setFirstRender(false), 4000)
    }, [onMouseMove])
    const isMobile = windowWidth < 1100;
    return (
      <div className={classNames(BodyHtml, Body)} > 
        <>
        {renderPageElements(props.router.route, onMouseMove, isMobile, props.children, windowWidth)}
        <footer onMouseMove={() => setMouseMove(true)} className={archiveFooter(onMouseMove)}>
          <Nav router={props.router} isAnimating={!firstRender} mouseMoved={onMouseMove} isMobile={isMobile} triggerModal={triggerModal}/>
        </footer>
     
          <Modal show={showModal} isMobile={isMobile}> 
            {modalType === 'description' ? <DescriptionPage {...props} closeModal={closeModal}/> :  <Thumbnails {...props} closeModal={closeModal}/>}
          </Modal>
      
        </>
      </div>
    );
}

export default Page;
