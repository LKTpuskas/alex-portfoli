import { useState, useEffect, useRef, memo } from 'react';
import { useIntersection } from 'react-use';
import { useRouter } from 'next/router';

import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";

import { css } from 'emotion';
import LinkButton from '../LinkButton';
import Modal from './Modal'


// https://streamich.github.io/react-use/?path=/story/sensors-useintersection--docs



// small mobile 
// mobile 420px
// tablet 768px
// desktop 1024px
const photoOverlay = (isHovered) => css`
  position: fixed;
  width: 300px;
  height: auto;
  transition-duration: 400ms;
  transition-timing-function: ease-out;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: ${isHovered ? 1 : 0};
  filter: ${isHovered ? 'grayscale(40%)' : 'grayscale(0%)'};
  transition: opacity 0.3s;
  z-index: 1;
`;

const archiveWrapper = css`
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

const projectItem = (isHovered) => css`
  font-size: 3.5rem;
  color: black;
  letter-spacing: 8px;
  align-items: center;
  justify-content: center;
  transition: opacity 0.5s;
  @media (min-width: 734px) {
        font-size: 75px;
      }
`;

//   margin-top: 100px; 
const ulWrapper = css`
  font-size: 75px;
/*   margin-top: 100px;  */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  @media (min-width: 1020px) {
    flex-direction: column;
    margin-top: 100px;
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
  z-index: 2;
`;

function concatComma(str, index, array, width) {
  const MaxWidth = 800
  const lastIndex = array.length - 1;
  const isMobileLayout = width < MaxWidth
  return index === lastIndex || isMobileLayout ? str : str.concat(',') 
}

const Archive = memo(props => {
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  const [isHovered, handleHover] = useState(false);
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [currentPos, handlePosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const router = useRouter();
  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [windowWidth])

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
  // https://kentcdodds.com/blog/usememo-and-usecallback
  return (
    <div className={archiveWrapper}>
      <ul className={ulWrapper} >
        {
          !showDialog && props.projectData && props.projectData.map((item, index, array) => {
            // const titleWithoutSpaces = a.title.replace(/\s+/g, '');                           USE REACH UI MODAL
            return (
              <React.Fragment key={index}>
              <li className={archiveList} key={index} >
                  <LinkButton 
                    href={`/[projectName]/[projectImage]`}
                    as={`/${item.title}/${1}`}
                    name={item.title/* concatComma(item.title, index, array, windowWidth) */}
                    onClick={open}
                    className={projectItem(isHovered)}
                    onMouseMove={(e) => mouseMovement(e)}
                    onMouseEnter={() => onHover(index, true)}
                    onMouseLeave={() => onHover(index, false)} /> 
                {/*   <a 
                    onClick={open}
                    className={projectItem(isHovered)}
                    onMouseMove={(e) => mouseMovement(e)}
                    onMouseEnter={() => onHover(index, true)}
                    onMouseLeave={() => onHover(index, false)}> 
                      {concatComma(item.title, index, array, windowWidth)}
                    </a> */}
                </li>
                    {currentPos === index
                    ? <img src={item.images && item.images[0].url} alt="" className={photoOverlay(isHovered)} /> : null
                  }
              </React.Fragment>
              )
            }) 
                /* <Modal show={showDialog}> 
                  <Carousel currentPos={currentPos} projectData={props.projectData} closeModal={close} />
                </Modal> */
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
