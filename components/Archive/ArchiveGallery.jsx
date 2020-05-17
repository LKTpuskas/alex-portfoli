import { useState, useEffect } from 'react';
import { css } from 'emotion';
import { withRouter, useRouter } from 'next/router'
import classNames from 'classnames';
import Carousel from './Carousel';
import LinkButton from '../LinkButton';
import Modal from './Modal'

const photoOverlay = (isHovered) => css`
  position: absolute;
  width: 300px;
  height: auto;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: ${isHovered ? 1 : 0};
  filter: ${isHovered ? 'grayscale(40%)' : 'grayscale(0%)'};
  transition: opacity 0.3s;
  z-index: 2;
`;

const archiveWrapper = css`
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

const archiveList = css`
  text-align: center;
`

const ArchiveGallery = withRouter(props => {
  const [projectImage, setNewRouter] = useState(props.router.query.projectImage)
  useEffect(() => {
      setNewRouter(props.router.query.projectImage)
  },[props.router.query])

const projectName = props.router.query.projectName
const getProject = props.projectData.find(project => project.title === projectName);
const currentProjectIndex = props.projectData.findIndex(proj => proj.title === projectName)
const trueIndex = Number(projectImage)
  return (
    <div className={archiveWrapper}>
     <Carousel 
      {...props}  
      projectImageIndex={trueIndex}
      project={getProject}
      currentProjectIndex={currentProjectIndex}
      />
    </div>
  )
})

ArchiveGallery.getInitialProps = async () => {
  return {};
};

export default ArchiveGallery;
