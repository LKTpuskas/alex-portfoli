import { useState } from 'react';
import { css } from 'emotion';
import Router from 'next/router'

const image = css`
width: 100%;
height: auto;
`;

const imageWrapper = css`
max-width: 80px;
padding: 3px;
margin-bottom: 17px;
`;

const projectItem = css`      
margin: 0 auto;
display: flex;
flex-wrap: wrap;
`;

const projectTitle = css`
color: pink;
 position: fixed;
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

  return (
    <>
      {
        projectData.map((project, index) => {
          return (
            <div className={projectItem} key={index} >
              {getImage(project, closeModal)}
              {/* <ul>
                    {project.images.map((project, index) => {
                    return <li key={index}>
                      <img className={image} src={project.url} alt="" />
                      </li> 
                    })}
                  </ul> */}
              <h2 className={projectTitle}>{project.title}</h2>
            </div>
          )
        })
      }
    </>
  )
}

export default Prints;
