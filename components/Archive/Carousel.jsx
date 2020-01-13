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

class Carousel extends React.Component {
  debugger
  state = {
    currentImageIndex: 0 || Number(this.props.router.query.id) - 1,
    isFaded: true,
    isNextPrevious: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextIndex = Number(nextProps.router.query.id)
    console.log('nextIndex', nextIndex)
    console.log('nextIndex', nextIndex, prevState.currentImageIndex)
    if (nextIndex !== this.props.router) {
      return {
        currentImageIndex: nextIndex,

      };
    }
   }

  setIsFaded = (funcType) => {
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
    debugger
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;
    console.log('next index', index)
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
    //console.log(this.props.router)
    const { archiveData, router } = this.props
    const { currentImageIndex, isFaded } = this.state;
    console.log(currentImageIndex)
    // const queryIndex = router.query ? Number(router.query.id) - 1 : null

   
      const selectedImage = currentImageIndex && archiveData[currentImageIndex];
  
    const refId = '[id]';
    const refIdAs = `${String(selectedImage.id)}`;
    // const hrefIdAs = selectedImage && `gallery?id=${selectedImage.id}`
    return !isNaN(currentImageIndex) ? <div className={archiveWrapper}>
    <LinkButton href={'/archive'} name={'Back to Archive'}/>
    <div className={flexRowWrapper}>
      <LinkButton
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
      <LinkButton
        name={'Next'}
        onClick={() => this.setIsFaded(this.nextSlide)}/>
    </div>
  </div> : <div>LOADING</div> /* (
      
    ); */
  }
}

export default Carousel;
