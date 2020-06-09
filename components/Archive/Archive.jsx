import { useState, useEffect, useRef, memo } from 'react';
import { useIntersection } from 'react-use';
import Router, { useRouter } from 'next/router';

import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";

import { css } from 'emotion';
import LinkButton from '../LinkButton';
import Modal from './Modal'


// https://streamich.github.io/react-use/?path=/story/sensors-useintersection--docs



// small mobile 
// mobile 420px
// tablet 768px
// desktop 1024px
const photoOverlay = (isHovered, isAnimated) => css`
  position: fixed;
  width: 400px;
  height: auto;
  transition-duration: 400ms;
  transition-timing-function: ease-out;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: ${isHovered ? 1 : 1};
  filter: ${isHovered ? 'grayscale(40%)' : 'grayscale(0%)'};
  transition: ${isHovered ? 'opacity 0.3s' : 'opacity 0.0s'};
  z-index: 1;
  transform-origin:top;
  transition: transform 650ms cubic-bezier(0.68, -0.55, 0.99, 1.01);
  transform: ${isAnimated ? 'scaleX(0)' : 'scaleX(1)'}; 
`

const archiveWrapper = css`
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const projectItem = (isHovered, isAnimated) => css`
  cursor: pointer;
  font-size: 3.5rem;
  color: ${isHovered ? 'white' : 'black'};
  letter-spacing: 8px;
  align-items: center;
  transition: opacity 2000ms;
  /* opacity: ${isAnimated ? 0 : 1}; */
  justify-content: center;
  @media (min-width: 734px) {
        font-size: 75px;
      }
`

//   margin-top: 100px; 
const ulWrapper = css`
  font-size: 75px;
/*   margin-top: 100px;  */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: inherit;
  
  @media (min-width: 1020px) {
    flex-direction: column;
  }
  @media (max-width: 320px) {
    font-size: initial;
  }
  @media (min-width: 2500px) {
    flex-direction: row;
    margin: 20% 300px;
  }
`;


//   opacity: 1;
// display: inherit;
const archiveList = css`
  color: black;
  letter-spacing: 8px;
  text-align: center;
  display: flex;
  z-index: 2;
`;

const Archive = memo(props => {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  const [isHovered, handleHover] = useState(false);
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [currentPos, handlePosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [timeoutStarted, startTimeout] = useState(false);
  const [imgIsAnimated, setAnimationDone] = useState(false);

  const [clickedTitle, setClickedTitle] = useState()

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [windowWidth])

  useEffect(() => {
    if (timeoutStarted) {
      setAnimationDone(true)
      const timer1 = setTimeout(() => Router.push(`/${clickedTitle}/${1}`), 700)
      return () => {
        clearTimeout(timer1)
      }
    }
  }, [timeoutStarted, clickedTitle])

  const onHover = (index, hovered) => {
    handleHover(hovered)
    handlePosition(index)
  }
  // const projectExists = props.projectData && props.projectData.data;

  const mouseMovement = (event) => {
    //console.log('horizontal', event.clientX)
    // console.log('vertical', event.clientY)
    /*  useCallback(() => setXPosition(event.clientX + 20), [xPosition])
    useCallback(() => setYPosition(event.clientY + 20), [yPosition]) */
    setXPosition(event.clientX + 20, [xPosition])
    setYPosition(event.clientY + 20, [yPosition])
  }

  const handleOnLinkClick = title => {
    setClickedTitle(title)
    startTimeout(true)
  }
  // https://kentcdodds.com/blog/usememo-and-usecallback
  return (
    <div className={archiveWrapper}>
      <ul className={ulWrapper} >
        {
          !showDialog && props.projectData && props.projectData.map((item, index, array) => {
            return (
              <React.Fragment key={index}>
                <li className={archiveList} key={index} >
                  <button
                    onClick={() => handleOnLinkClick(item.title)}
                    className={projectItem(isHovered, imgIsAnimated)}
                    onMouseMove={(e) => mouseMovement(e)}
                    onMouseEnter={() => onHover(index, true)}
                    onMouseLeave={() => !imgIsAnimated && onHover(index, false)} >{item.title}</button>
                </li>
                {currentPos === index
                  ? <img src={item.images && item.images[0].url} alt="" className={photoOverlay(isHovered, imgIsAnimated)} /> : null
                }
              </React.Fragment>
            )
          })
        }
      </ul>
    </div>
  )
})

export default Archive;

// margin: 0;
/* margin-block-end: 0; */
/* margin-block-start: 0; */
// max-width: 25vw;
// margin: 0 auto;
