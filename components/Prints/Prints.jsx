import { useState, useMemo, memo, useCallback , useEffect } from 'react'
import { css } from 'emotion';
import Router from 'next/router'

import { useTrail, useTransition, animated } from 'react-spring'

const image = css`
width: 100%;
height: auto;
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
`;

const imageWrapper = css`
max-width: 75px;
padding: 3px;
margin-bottom: 17px;
@media (min-width: 1200px) {  /* Desktop  */
  margin-right: 30px;
  max-width: 140px;
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
margin-bottom: 60px;

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

const Images = memo(function GetImage({ project,  projectIndex, closeModal }) {
  const [reverseStyle, setReverseStyle] = useState(false);



  const onSetCurrentItem = (imageIndex) => {
    Router.push(`/[projectName]/[projectImage]`, `/${project.title}/${imageIndex}`);
    closeModal();
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


function Prints({ isMobile, children: { props: { projectData } }, closeModal }) {
  //console.log('Prints rerendered')
  const [currentPos, handlePosition] = useState(null);
  const [delayed, setDelayed] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  const config = {  // not all props are listed here, check type definition
    velocity: 4,
   }

  const trail = useTrail(projectData.length, {
    config,
    opacity: 1,
    width: '100%',
    from: { opacity: 0, width: '0%' },
    delay: 1000
  })


  return (
    <>
      {
       trail.map(({ x, width, ...rest }, projectIndex) => {
        const project = projectData[projectIndex]
          const isHovered = currentPos === projectIndex
          const moreThanSeven = project.images.length > 7;
       //   console.log('prints component, inside map project')
          return(
            <animated.div 
              key={projectIndex}
              style={{ width }}
              className={projectItem(moreThanSeven)} 
              key={projectIndex}
              onMouseEnter={() => !isMobile && handlePosition(projectIndex)}
              onMouseLeave={() => !isMobile && handlePosition(projectIndex)}>
                
                <h4 className={projectTitle(isHovered, delayed)}>{project.title}</h4>
              <animated.h4 key={projectIndex} className={projectTitle(isHovered)}>{project.title}</animated.h4> 
                <Images project={project} projectIndex={projectIndex} closeModal={closeModal}/> 
            </animated.div>
          )
        })
      }
    </>
  )
}

export default memo(Prints);
