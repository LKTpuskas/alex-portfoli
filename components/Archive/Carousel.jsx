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
  margin-top: 10px;
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
  height: ${isMobile ? 'initial' : '10px'};
  width: ${isMobile ? 'initial' : '10px'};
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
  const [isNextPrevious, setIsNextPrevious] = useState(false);
  


  useEffect(() => {
    setCurrentImageIndex(props.projectImageIndex)
  }, [props.projectImageIndex]);

  const projectName = props.project && props.project.title;

  const previousSlide = () => {
    const lastIndex = props.project.images.length - 1;
    const shouldResetIndex = currentImageIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;
    /* setTimeout(() => this.setState({
      currentImageIndex: index,
      isFaded: true
    }), 800) */
    setCurrentImageIndex(index)
    setIsNextPrevious(true)
    Router.push(`/[projectName]/[projectImage]`, `/${projectName}/${index}`)
  }

  const nextSlide = () => {
    const lastIndex = props.project.images.length - 1;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;
    
    setCurrentImageIndex(index)
    setIsNextPrevious(true)
    Router.push(`/[projectName]/[projectImage]`, `/${projectName}/${index}`)
    /* this.setState({
      currentImageIndex: index,
      isNextPrevious: true,
      isFaded: true
    }) */
  }

  const move = (e) => {
  const x = e.pageX - 40;
  const y = e.pageY;
  const cursor = cursorContent.current

  cursor.style.left = x + 'px'
  cursor.style.top = y + 'px'
}

  const { project } = props    
  const selectedImage = project && project.images[currentImageIndex];
   
  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => previousSlide(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });
  return !isNaN(currentImageIndex) && <div className={archiveWrapper} onMouseMove={move}>
    <div {...handlers} className={flexRowWrapper}>
{/*       <div className={cursorBackground(props.isMobile)} ref={cursorContent}>{`Overview`}</div>*/}
    
    <div className={cursorBackground(props.isMobile)} ref={cursorContent}>{`${project && project.title} ${currentImageIndex}/${project && project.images.length - 1}`}</div> 
      {/* <CSSTransition
        in={isFaded}
        timeout={800}
        classNames={{
          enter: imageEnter,
          enterActive: imageEnterActive,
          exit: imageExit,
          exitActive: imageExitActive,
          exitDone: imageExitDone
        }}
        unmountOnExit
        appear
        >
        <ImageSlide currentIndex={currentImageIndex} selectedImage={selectedImage} opacity={isFaded} />
      </CSSTransition> */}
    
        <ImageSlide 
          currentIndex={currentImageIndex} 
          selectedImage={selectedImage} 
          opacity={isFaded} 
          />
  
      {/* <div className={scrollButtonWrapper}>
        <button
        
        className={scrollButton}
        onClick={() => setIsFaded(previousSlide)}>Prev</button> 
        <button
      
          className={scrollButton}
          onClick={() => setIsFaded(nextSlide)}>Next</button>
      </div> */}
    </div>
  </div>
} 

export default Carousel;
