import { useState, useMemo, memo, useCallback , useEffect } from 'react'
import { css } from 'emotion';
import Router from 'next/router'

import { useTrail, useTransition, animated } from 'react-spring'

const image = css`
width: 100%;
height: auto;
cursor: pointer;
`;

const projectTitle = (isHovered, delayed) => css`
/* @font-face {
  font-family: 'annlie';
  src: url('./annliefont.ttf');
} */
/* font-family: 'annlie'; */
 display: ${isHovered ? 'flex' : 'none'};
 margin: 0;
 font-size: 35px
 font-style: ${isHovered ? 'italic' : 'none'};
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translate(-50%, -50%);
 opacity: ${isHovered ? 1 : 0};
 animation: fade 2s linear;
 transition: opacity 1.35s;
 letter-spacing: 8px;
 font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", 
  Helvetica, Arial, "Lucida Grande", sans-serif;
  @media (min-width: 734px) {
    font-size: 55px;
  }
`;

const imageWrapper = css`
max-width: 75px;
padding: 3px;
margin-bottom: 17px;
@media (min-width: 1200px) {  /* Desktop  */
  margin-right: 30px;
  max-width: 120px;
  margin-bottom: 8px;
}
`;

const projectItem = (moreThanSeven) => css`   
height: auto;   
margin: 0 auto;
display: flex;
flex-wrap: wrap;
position: relative;
@media (min-width: 1300px) {  /* Desktop  */
/*   margin: 5px auto; */
/*   justify-content: ${moreThanSeven ? 'flex-start' : 'center'};
  margin: 0 25%; */
margin-bottom: 100px;

}
@media (min-width: 2000px) {  /* Desktop  */

 /*  margin: 5px auto;
  justify-content: ${moreThanSeven ? 'flex-start' : 'center'};
  margin: 0 20%; */
}
`;

const titleWrapper = (height) => css`
  position: fixed;
  width: 100%;
  height: auto;
  margin-top: ${height}px;
  text-align: center;
  vertical-align: middle;
`;

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const Images = memo(function GetImage({ project,  projectIndex, closeModal, setReverse }) {
  const [reverseStyle, setReverseStyle] = useState(false);



  const onSetCurrentItem = (imageIndex) => {
    setReverse(true)
    Router.push(`/[projectName]/[projectImage]`, `/${project.title}/${imageIndex}`);
    setTimeout(() => closeModal(), 2000);
    //setReverseStyle(true);
  }
 
  return <>
    {project.images.map((project, imageIndex) => {
    
    const trueIndex = imageIndex + 1
      return <div key={imageIndex} className={imageWrapper} onClick={() => onSetCurrentItem(trueIndex)}>
        <img
          className={image} 
          src={project.url} 
          />
      </div> 
    })}
  </>
})


function Prints({ isMobile, projectData, closeModal }) {
  const [currentPos, handlePosition] = useState(null);
  const [delayed, setDelayed] = useState(true);
  const [reverseTrail, setReverse] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  const config = {  // not all props are listed here, check type definition
    velocity: 4,
   }

   console.log(reverseTrail)
  const trail = useTrail(projectData.length, {
    reverse: reverseTrail,
    config,
    opacity: 1,
    width: '100%',
    from: { opacity: 0, x: -100 },
    to: { opacity: reverseTrail ? 0 : 1, x: reverseTrail ? -100 : 0 },
    delay: 1000
  })


  return (
    <>
      {
       trail.map(({ x, width, opacity, ...rest }, projectIndex) => {
        const project = projectData[projectIndex]
          const isHovered = currentPos === projectIndex
          const moreThanSeven = project.images.length > 7;
       //   console.log('prints component, inside map project')
          return(
            <animated.div 
              key={projectIndex}
              style={{ opacity: opacity, transform: x.interpolate(x => `translate3d(${x}%,0,0)`) }}
              className={projectItem(moreThanSeven)} 
              key={projectIndex}
              onMouseEnter={() => !isMobile && handlePosition(projectIndex)}
              onMouseLeave={() => !isMobile && handlePosition(projectIndex)}>
              <animated.li key={projectIndex} className={projectTitle(isHovered)}>{project.title}</animated.li> 
                <Images setReverse={setReverse} project={project} projectIndex={projectIndex} closeModal={closeModal}/> 
            </animated.div>
          )
        })
      }
    </>
  )
}

export default memo(Prints);
