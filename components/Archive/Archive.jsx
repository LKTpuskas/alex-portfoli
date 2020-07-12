import { useState, useEffect, useRef, memo } from 'react';
import Link from "next/link";
import { useIntersection } from 'react-use';
import Router, { useRouter } from 'next/router';

import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";

import { css } from 'emotion';
import LinkButton from '../LinkButton';
import Modal from './Modal'
import { useCursorContext } from '../CursorContext'


// https://streamich.github.io/react-use/?path=/story/sensors-useintersection--docs



// small mobile 
// mobile 420px
// tablet 768px
// desktop 1024px

const imageOverlay = (isAnimated, archieveMounted) => css`
  width: 100%;
  height: 100%;
  background: white;
  opacity: 1;
  /* background: palegreen; */
  transition: transform 650ms ease-in;
  transform: ${!archieveMounted || isAnimated ? 'translateY(-0%)' : 'translateY(-112%)'}; 
  
`

const wrap = (isAnimated) => css`
transition: transform 650ms ease-in;
 /*  transform: ${isAnimated ? 'translateY(-15%)' : 'translateY(-100%)'};  */
  width: 100%;
  height: 100%;

  top: 0;
  left: 0;
  position: absolute;
`
/* const svg = (isAnimated) => css`
position: absolute;
top: 0;
  left: 0;
    height: 29%;
    width: 100%;
    transform: ${isAnimated ? 'translate(100%)' : 'translateY(-44%)'} rotate(180deg);
 
   
` */



const imageOverlaySvg = css`
  background: blue;
  position: absolute;
`

const overlaybottom = css`
  bottom: 0;
  background: transparent;
`
//&:before

const image = (isHovered, isAnimated) => css`
  position: fixed;
  width: 500px;
  height: auto;
  /* transition-duration: 400ms; */
  /* transition-timing-function: ease-out; */
   opacity: ${isHovered ? 1 : 1};
 /*  filter: ${isHovered ? 'grayscale(40%)' : 'grayscale(0%)'}; */
 /*  transition: opacity 0.3s; */
  /* transition: ${isHovered ? 'opacity 0.3s' : 'opacity 0.0s'}; */
  z-index: 1;

/*   transition-delay: 600ms; */

  transition: opacity 300ms ease-in-out;
 /*  transform-origin:top;
  transition: transform 650ms cubic-bezier(0.68, -0.55, 0.99, 1.01);
  transform: ${isAnimated ? 'scaleX(0)' : 'scaleX(1)'};  */
  @media (min-width: 300px) {
    width: 250px;
  }
  @media (min-width: 700px) {
    width: 450px;
  }
  @media (min-width: 900px) {
    width: 500px;
  }
`


const archiveWrapper = css`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const projectItem = (isHovered, isAnimated) => css`
  cursor: pointer;
  font-size: 30px;
  color: ${isHovered ? 'white' : 'white'};
  letter-spacing: 8px;
  align-items: center;
  transition: opacity 2000ms;
  /* opacity: ${isAnimated ? 0 : 1}; */
  justify-content: center;
  @media (min-width: 700px) {
        font-size: 50px;
    }
  @media (min-width: 900px) {
    font-size: 60px;
  }
`

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
  // const { bindHoverable } = useCursorContext()
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  const [isHovered, handleHover] = useState(false);
  const [currentPos, handlePosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [timeoutStarted, startTimeout] = useState(false);
  const [imgIsAnimated, setAnimationDone] = useState(false);
  const [archieveMounted, setArchieveMounted] = useState(false);

  const [clickedTitle, setClickedTitle] = useState()

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [windowWidth])

  useEffect(() => {
    const timer1 = setTimeout(() => setArchieveMounted(true), 700)
    return () => {
      clearTimeout(timer1)
    }
  }, [])

  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log('App is changing to: ', url)
    }

    Router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      Router.events.off('routeChangeStart', handleRouteChange)

    }
  }, [])

  useEffect(() => {
    if (timeoutStarted) {
      setAnimationDone(true)
      const timer1 = setTimeout(() => Router.push('/[projectName]/[projectImage]', `/${clickedTitle}/${1}`), 700)
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

  const handleOnLinkClick = title => {
    setClickedTitle(title)
    startTimeout(true)
  }
  // https://kentcdodds.com/blog/usememo-and-usecallback
  return (
    <div className={archiveWrapper}>
      <ul className={ulWrapper} >
        {
          !showDialog && props.projectData && props.projectData.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <li className={archiveList} key={index} >
                  <button
                    onClick={() => handleOnLinkClick(item.title)}
                    className={projectItem(isHovered, imgIsAnimated)}
                    onMouseEnter={() => onHover(index, true)}
                    onMouseLeave={() => !imgIsAnimated && onHover(index, false)} >{item.title}</button>
                </li>
                {currentPos === index
                  ? (
                    <div className={image(isHovered, imgIsAnimated)}>
                      <img src={item.images && item.images[0].url} alt="" />
                      <div className={wrap(imgIsAnimated)}>
                      <div className={imageOverlay(imgIsAnimated, archieveMounted)}>
                      </div>
                      {/*   <svg className={svg(imgIsAnimated)} viewBox="0 0 1000 1">
                          <path fill="#fff" fillOpacity="1" d="M0,32L48,80C96,128,192,224,288,224C384,224,480,128,576,90.7C672,53,768,75,864,96C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                        </svg>
 */}
                      </div>
                   
                    </div>

                  ) : null
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
