import Carousel from 'nuka-carousel';
import { imageWrapper, gallery } from './HomeContentStyle';
import Nav from './Nav';

const HomeContent = props => {
  return (
    <div className={imageWrapper}>
      <Carousel
        className={gallery}
        autoGenerateStyleTag={false}
        disableAnimation
        wrapAround
        autoplay
        transitionMode='fade'
        speed={2000}
        frameOverflow='visible'
        withoutControls >
        {props.homeImages.map((image, index) =>
          <img key={index} src={image.url} className={gallery} />
        )} 
      </Carousel>
      <Nav />
    </div>
  )
}

export default HomeContent;
