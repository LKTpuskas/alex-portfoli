import { useState } from 'react';
import { css } from 'emotion';
import { withRouter } from 'next/router'
import classNames from 'classnames';
import Carousel from './Carousel';
import LinkButton from '../LinkButton';

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
  height: 100vh;
  width: 100vw;
`;

const archiveList = css`
  text-align: center;
`

const ArchiveGallery = withRouter(props => {
  const [isHovered, handleHover] = useState(false);
  const [currentPos, handlePosition] = useState(0);
  const onHover = (index, hovered) => {
    handleHover(hovered)
    handlePosition(index)
  }
  return (
    <div className={archiveWrapper}>
      <LinkButton href={'/archive'} name={'Back to Archive'}/>
      <Carousel {...props} images={props.archiveData}/>
    </div>
  )
})

export default ArchiveGallery;
