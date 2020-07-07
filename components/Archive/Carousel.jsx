import { useRef, useState, useEffect } from 'react';

import ImageSlide from './ImageSlide';
import Link from 'next/link';
import Arrow from './Archive';
import { css } from 'emotion';
import { CSSTransition } from 'react-transition-group';
import LinkButton from '../LinkButton';
import Router from 'next/router'
import { useSwipeable, Swipeable } from 'react-swipeable';
import { cursorBackground } from '../Page'
import CustomCursor from '../CustomCursor'
import { useRouter } from 'next/router'
import { useCursorContext } from '../CursorContext'


const textCursor = (isMobile) => css`
  pointer-events: none;
  position: ${isMobile ? 'relative' : 'absolute'};
  z-index: 100;
  transition: 200ms;
`
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
const flexRowWrapper = (imgMounted) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  /* padding: 8vh 22vw; */
  padding: 10% 400px;
  transition: transform 650ms ease-in-out;
/*   transform: ${imgMounted ? 'scaleX(1)' : 'scaleX(0)'};  */
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

const scrollButtonWrapper = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const imageOverlay = (isAnimated) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  transition: transform 1000ms ease-in;
  transform: ${isAnimated ? 'translateY(-100%)' : 'translateY(0%)'};
  border-radius: 120%;
 
`

const imagetext = css`
  display: flex;
  align-items: flex-end;
  height: auto;
  width: 100%;
`

const cursortext = css`
  color: white;
`

function Carousel(props) {
  const router = useRouter()
 
  const cursorContent = useRef(null)
  const { mouseCoordinate } = useCursorContext();
  const [mousePosition, setCarMousePos] = useState(props.mousePosition)
  const [isFaded, setIsFaded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(props.projectImageIndex)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(props.currentProjectIndex)
  const [carouselMounted, setCarouselMounted] = useState(false)
  const [isNextPrevious, setIsNextPrevious] = useState(false)
  // console.log('props.mousePosition', props.mousePosition)
  useEffect(() => {
    const timer1 = setTimeout(() => setCarouselMounted(true), 700)
    return () => {
      clearTimeout(timer1)
    }
  }, [])

  useEffect(() => {
    setCurrentImageIndex(props.projectImageIndex)
    setCurrentProjectIndex(props.currentProjectIndex)
    setCarMousePos(props.mousePosition)
  }, [props.projectImageIndex, props.currentProjectIndex, props.mousePosition])

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
      const shouldResetProjectIndex = currentProjectIndex === 0
      return shouldResetProjectIndex ? props.projectData.length - 1 : currentProjectIndex - 1
    }
    return currentProjectIndex
  }

  const previousSlide = () => {
    const shouldResetIndex = currentImageIndex === 1
    const previousProject = handlePreviousPosition(shouldResetIndex)
    const lastImageIndexOfLastProject = props.projectData[previousProject].images.length
    const index = shouldResetIndex ? lastImageIndexOfLastProject : currentImageIndex - 1
    const selectedProject = props.projectData[previousProject].title
    const trueIndex = index
    setCurrentImageIndex(trueIndex)
    setCurrentProjectIndex(previousProject)
    setIsNextPrevious(true)
    Router.push('/[projectName]/[projectImage]', `/${selectedProject}/${trueIndex}`)
  }

  const nextSlide = () => {
    const lastIndex = props.project.images.length
    const shouldResetIndex = currentImageIndex === lastIndex
    const index = shouldResetIndex ? 1 : currentImageIndex + 1
    // const nextProjectImage = handleNextPosition(props.project.images.length, currentImageIndex)
    const nextProject = handleNextPosition(shouldResetIndex)

    const trueIndex = index
    const selectedProject = props.projectData[nextProject].title
    setCurrentImageIndex(trueIndex)
    setCurrentProjectIndex(nextProject)
    setIsNextPrevious(true)
    Router.push('/[projectName]/[projectImage]', `/${selectedProject}/${trueIndex}`)
  }

  const onClickWindow = event => {
    const midScreen = props.windowWidth / 2
    if (event.clientX > midScreen) {
      nextSlide()
    } else {
      previousSlide()
    }
  }

  const { project, onHoverFooter, isMobile, modalMounted, modalType } = props
  const selectedImage = project && project.images[currentImageIndex - 1]

  const handlers = useSwipeable({
    onSwipedLeft: () => isMobile && nextSlide(),
    onSwipedRight: () => isMobile && previousSlide(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  function handleCursorText() {
    if (!modalMounted) {
      return mouseCoordinate.x > props.windowWidth / 2 ? 'Next' : 'Prev'
    }
    return modalType === 'description' ? '' : 'Pick'
  }
  return !isNaN(currentImageIndex) && <div className={archiveWrapper}>
    <div {...handlers} onClick={event => !isMobile && onClickWindow(event)} className={flexRowWrapper(carouselMounted)}>
      {!onHoverFooter && <CustomCursor style={cursortext} clickScale={1} childrenXPos={-10} childrenYPos={-15}>
        <div>{handleCursorText()}</div>
      </CustomCursor>}
      <div className={imagetext}>{`${project && project.title} ${currentImageIndex}/${project && project.images.length}`}</div>
      <ImageSlide
        projectTitle={project && project.title}
        projectSize={project && project.images.length}
        currentIndex={currentImageIndex}
        selectedImage={selectedImage}
        opacity={isFaded}
      />
        <div className={imageOverlay(carouselMounted)}/>
    </div>
  </div>
}

export default Carousel


/*
overflow: hidden
    min-height: 100vh
    min-width: 100vw
    -webkit-font-smoothing: antialiased
    -moz-font-smoothing: antialiased
    -ms-font-smoothing: antialiased
    ¨font-smoothing: antialiased
    font-weight: 300
    -webkit-transition: opacity 1s ease-in-out
    transition: opacity 1s ease-in-out
    position: relative
    list-style-type: none

    */