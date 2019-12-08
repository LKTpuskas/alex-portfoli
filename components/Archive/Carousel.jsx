import React from 'react';
import ImageSlide from './ImageSlide';
import Link from 'next/link';
import Arrow from './Archive';
import { css } from 'emotion';
import { CSSTransition } from 'react-transition-group';
import LinkButton from '../LinkButton';

const imageEnter = css`
  opacity: 0;
`
const imageEnterActive = css`
  opacity: 1;
  transition: opacity 200ms;
`
const imageExit = css`
  opacity: 1;
`
const imageExitActive = css`
  opacity: 0;
  transition: opacity 200ms;
`
const imageExitDone = css`
  background-color: blue;
`
const flexRowWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 3rem;
`

class Carousel extends React.Component {
  state = {
    currentImageIndex: 0 || this.props.images.findIndex(image => this.props.router.query.id === String(image.id)),
    isFaded: true
  };

  setIsFaded = (funcType) => {
    this.setState({ isFaded: false }, funcType)
  }

  previousSlide = () => {
    const lastIndex = this.props.images.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;
    setTimeout(() => this.setState({
      currentImageIndex: index,
      isFaded: true
    }), 800)
  }

  nextSlide = () => {
    const lastIndex = this.props.images.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;
    setTimeout(() => this.setState({
      currentImageIndex: index,
      isFaded: true
    }), 800)
  }

  render() {
    const { currentImageIndex, isFaded } = this.state;
    const selectedImage = this.props.images[currentImageIndex];
    const hrefId = `gallery?id=${selectedImage.id}`;
    return (
      <div className={flexRowWrapper}>
        <LinkButton
          href={hrefId}
          name={'Previous'}
          onClick={() => this.setIsFaded(this.previousSlide)}/>
        <CSSTransition
          in={isFaded}
          timeout={800}
          classNames={{
            enter: imageEnter,
            enterActive: imageEnterActive,
            exit: imageExit,
            exitActive: imageExitActive,
            exitDone: imageExitDone
          }}
          unmountOnExit
          appear
        >
          <ImageSlide currentIndex={currentImageIndex} images={this.props.images} selectedImage={selectedImage} opacity={isFaded} />
        </CSSTransition>
        <LinkButton
          href={hrefId}
          name={'Next'}
          onClick={() => this.setIsFaded(this.nextSlide)}/>
      </div>
    );
  }
}

export default Carousel;
