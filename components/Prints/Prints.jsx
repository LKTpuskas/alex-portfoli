import { useState } from 'react'
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
position: relative;
`;

const projectTitle = (isHovered) => css`
 margin: 0;
 font-style: ${isHovered ? 'italic' : 'none'};
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translate(-50%, -50%);
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
      const trueIndex = imageIndex + 1
      return <div key={imageIndex} className={imageWrapper} onClick={() => onSetCurrentItem(trueIndex)}>
            <img className={image} src={img.url} alt="" /> 
      </div>
    })}
  </>
}

function Prints({ isMobile, children: { props: { projectData } }, closeModal }) {
  const [currentPos, handlePosition] = useState(null);

  return (
    <>
      {
        projectData.map((project, index) => {
          const isHovered = currentPos === index
          return (
            <div 
              className={projectItem} 
              key={index}  
              onMouseEnter={() => !isMobile && handlePosition(index)}
              onMouseLeave={() => !isMobile && handlePosition(index)}>
                <h2 className={projectTitle(isHovered)}>{project.title}</h2>
                {getImage(project, closeModal)}
            </div>
          )
        })
      }
    </>
  )
}

export default Prints;
