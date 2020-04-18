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

const projectTitle = css`
 margin: 0;
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
            <div className={projectItem} key={index}>
              <h2 className={projectTitle}>{project.title}</h2>
              {getImage(project, closeModal)}
              
            </div>
          )
        })
      }
    </>
  )
}

export default Prints;
