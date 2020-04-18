import { useState, useRef, useLayoutEffect,useCallback, useMemo } from 'react';
import { css } from 'emotion';
import Router from 'next/router'

const image = css`
width: 100%;
height: auto;
`;

const imageWrapper = css`
max-width: 75px;
padding: 3px;
margin-bottom: 17px;
`;

const projectItem = css`   
height: auto;   
margin: 0 auto;
display: flex;
flex-wrap: wrap;
`;

const projectTitle = css`
 margin: 0;
`;

const titleWrapper = (height) => css`
  position: fixed;
  width: 100%;
  height: auto;
  margin-top: ${height}px;
  text-align: center;
  vertical-align: middle;
`;

function getImage(project, closeModal) {
  const onSetCurrentItem = (imageIndex) => {
    Router.push(`/[projectName]/[projectImage]`, `/${project.title}/${imageIndex}`);
    closeModal();
  }

  return <>
    {project.images.map((img, imageIndex) => {
      return <div key={imageIndex} className={imageWrapper} onClick={() => onSetCurrentItem(imageIndex)}>
            <img className={image} src={img.url} alt="" /> 
      </div>
    })}
  </>
}

function Prints({ children: { props: { projectData } }, closeModal }) {
  const [currentRef, setCurrentRef] = useState(0)
  const projectsRef = useRef([]);

  useLayoutEffect(() => { // useLayoutEffect is fired synchronously after all DOM mutations. it doesn’t really care whether the browser has painted the DOM changes or not. It triggers the function right after the DOM mutations are computed.
    projectsRef.current = projectsRef.current.slice(0, projectData.length);
    setCurrentRef(projectsRef.current)
  },[projectData])

  
  const centralizeTitleHeight = (projectRef, index) => useMemo(() => projectRef && projectRef[index].clientHeight / 2);
  return (
    <>
      {
        projectData.map((project, index) => {
          return (
            <div className={projectItem} key={index} ref={el => projectsRef.current[index] = el}>
              {getImage(project, closeModal)}
                  <div className={titleWrapper(centralizeTitleHeight(currentRef, index))} >
                    <h2 className={projectTitle}>{project.title}</h2>
                  </div>
            </div>
          )
        })
      }
    </>
  )
}

export default Prints;
