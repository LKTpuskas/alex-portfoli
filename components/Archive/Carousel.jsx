import React, { useRef, useState, useEffect }  from 'react';

import ImageSlide from './ImageSlide';
import Link from 'next/link';
import Arrow from './Archive';
import { css } from 'emotion';
import { CSSTransition } from 'react-transition-group';
import LinkButton from '../LinkButton';
import Router from 'next/router'
import { useSwipeable, Swipeable } from 'react-swipeable';

const imageEnter = css`
  opacity: 0;
`
const imageEnterActive = css`
  opacity: 1;
  transition: opacity 200ms;
`
const imageExit = css`
  opacity: 1;
`
const imageExitActive = css`
  opacity: 0;
  transition: opacity 200ms;
`
const imageExitDone = css`
  background-color: blue;
`
//  flex-direction row on desktop
const flexRowWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 8vh 22vw;
`

const archiveWrapper = css`
  
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

const scrollButton = css`
  height: 100%;
  width: 100%;
  background-color: transparent;
  float: left;
`

const closeBtn = css`
  text-align: right;
  margin: 2rem 2rem;
`

const cursorBackground = (isMobile) => css`
  position: ${isMobile ? 'relative' : 'absolute' };
  z-index: 100;
  margin-top: 8px;
  height: ${isMobile ? 'initial' : '10px'};
  width: ${isMobile ? 'initial' : 'fit-content'};
`

const scrollButtonWrapper = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

function Carousel(props) {
  const cursorContent = useRef(null);
  const [isFaded, setIsFaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(props.projectImageIndex);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(props.currentProjectIndex);
  const [isNextPrevious, setIsNextPrevious] = useState(false);
  
  
  
  useEffect(() => {
    setCurrentImageIndex(props.projectImageIndex)
    setCurrentProjectIndex(props.currentProjectIndex)
  }, [props.projectImageIndex, props.currentProjectIndex]);
  
  const projectName = props.project && props.project.title;
 
  const handleNextPosition = (shouldResetIndex) => {
    if (shouldResetIndex) {
      const newPosition = currentProjectIndex + 1 
      const shouldResetProjectIndex = newPosition === props.projectData.length
      return shouldResetProjectIndex ? 0 : newPosition
    }
    return currentProjectIndex
  }

  const handlePreviousPosition = (shouldResetIndex) => {
    if (shouldResetIndex) {
      const shouldResetProjectIndex = currentProjectIndex === 0;
      return shouldResetProjectIndex ? props.projectData.length - 1 : currentProjectIndex - 1
    }
    return currentProjectIndex
  }

  const previousSlide = () => {
    const shouldResetIndex = currentImageIndex === 1;
    const previousProject = handlePreviousPosition(shouldResetIndex)
    const lastImageIndexOfLastProject = props.projectData[previousProject].images.length;
    const index = shouldResetIndex ? lastImageIndexOfLastProject : currentImageIndex - 1;
    const selectedProject = props.projectData[previousProject].title
    const trueIndex = index;
    setCurrentImageIndex(trueIndex)
    setCurrentProjectIndex(previousProject)
    setIsNextPrevious(true)
    Router.push(`/[projectName]/[projectImage]`, `/${selectedProject}/${trueIndex}`)
  }
  
  const nextSlide = () => {
    const lastIndex = props.project.images.length;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 1 : currentImageIndex + 1;
    // const nextProjectImage = handleNextPosition(props.project.images.length, currentImageIndex)
    const nextProject = handleNextPosition(shouldResetIndex)
    
    const trueIndex = index;
    const selectedProject = props.projectData[nextProject].title
    setCurrentImageIndex(trueIndex)
    setCurrentProjectIndex(nextProject)
    setIsNextPrevious(true)
    Router.push(`/[projectName]/[projectImage]`, `/${selectedProject}/${trueIndex}`)
  }
  
  const onClickWindow = event => {
    const midScreen = props.windowWidth / 2;
    if (event.clientX > midScreen) {
      nextSlide()
    } else {
      previousSlide()
    }
  }
  const move = (e) => {
  const x = e.pageX - 40;
  const y = e.pageY;
  const cursor = cursorContent.current

  cursor.style.left = x + 'px'
  cursor.style.top = y + 'px'
}

  const { project, onHoverFooter, isMobile } = props    
  const selectedImage = project && project.images[currentImageIndex - 1];
   
  const handlers = useSwipeable({
    onSwipedLeft: () => isMobile && nextSlide(),
    onSwipedRight: () => isMobile && previousSlide(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });
 
  
  return !isNaN(currentImageIndex) && <div className={archiveWrapper} onMouseMove={!isMobile ? move : undefined}>
    <div {...handlers} onClick={event => !isMobile && onClickWindow(event) } className={flexRowWrapper}>    
    {!onHoverFooter && <div className={cursorBackground(isMobile, onHoverFooter)} ref={cursorContent}>{
    `${project && project.title} ${currentImageIndex}/${project && project.images.length}`}
    </div> }
        <ImageSlide 
          currentIndex={currentImageIndex} 
          selectedImage={selectedImage} 
          opacity={isFaded} 
          />
    </div>
  </div>
} 

export default Carousel;


/*     
overflow: hidden;
    min-height: 100vh;
    min-width: 100vw;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    -ms-font-smoothing: antialiased;
    ¨font-smoothing: antialiased;
    font-weight: 300;
    -webkit-transition: opacity 1s ease-in-out;
    transition: opacity 1s ease-in-out;
    position: relative;
    list-style-type: none; 
    
    */