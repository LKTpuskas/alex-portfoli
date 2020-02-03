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

const archiveWrapper = css`
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const scrollButton = css`
  height: 10px;
  width: 10px;
  background-color: green;
`

const closeBtn = css`
  text-align: right;
  margin: 0 1rem;
`

class Carousel extends React.Component {
  debugger
  state = {
    currentImageIndex: this.props.currentPos || 0,
    isFaded: true,
    isNextPrevious: false
  };

  setIsFaded = funcType => {
    this.setState({ isFaded: false }, funcType)
  }

  previousSlide = () => {
    const lastIndex = this.props.archiveData.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;
    /* setTimeout(() => this.setState({
      currentImageIndex: index,
      isFaded: true
    }), 800) */
    this.setState({
      currentImageIndex: index,
      isFaded: true,
      sNextPrevious: true,
    })
  }

  nextSlide = () => {
    const lastIndex = this.props.archiveData.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;
    this.setState({
      currentImageIndex: index,
      isNextPrevious: true,
      isFaded: true
    })
   /*  setTimeout(() => this.setState({
      currentImageIndex: index,
      isFaded: true
    }), 800) */
  }



  render() {
    const { archiveData, closeModal } = this.props
    const { currentImageIndex, isFaded } = this.state;

    const selectedImage = archiveData[currentImageIndex];
    return !isNaN(currentImageIndex) ? <div className={archiveWrapper}>
    <h3 className={closeBtn} onClick={closeModal}>X</h3>
    <div className={flexRowWrapper}>
      <a
        className={scrollButton}
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
        <ImageSlide currentIndex={currentImageIndex} images={archiveData} selectedImage={selectedImage} opacity={isFaded} />
      </CSSTransition>
      <a
        className={scrollButton}
        name={'Next'}
        onClick={() => this.setIsFaded(this.nextSlide)}/>
    </div>
  </div> : <div>LOADING</div>
  }
}

export default Carousel;
