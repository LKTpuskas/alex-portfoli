import { css } from 'emotion';
import { useState, useEffect } from 'react';
import { useCursorContext } from '../CursorContext'

const imageWrapper = (isHorizontal, imageLoaded) => css`
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
   /*  margin: ${isHorizontal ? `125px 0` : `0 10px`}; */
  
    width: 100%; 
    height: 100%; 
    background: blue;
    @media (min-height: 660px) and (min-width: 360px) { /* Iphone 6/7/8 */
   /*  margin: ${isHorizontal ? `150px 0` : `0 10px`}; */
    }
    @media (min-height: 800px) and (min-width: 370px) { /* IPhone X */
  /*     margin: ${isHorizontal ? `25vh 0` : `65px 10px`}; */
    }
    @media (min-width: 760px) {
 /*      width: ${isHorizontal ? '100vw' : '70vw'}; */
 /*      margin: ${isHorizontal ? `20vh 0` : `65px 10px`}; */
    }
    @media (min-width: 1300px) {  /* laptop */
/*       width: ${imageLoaded && isHorizontal ? '50vw' : '30vw'};
      margin: ${isHorizontal ? `15vh 0` : `35px 10px`}; */
      width: 30vw;
    }
    @media (min-width: 2000px) {  /* Desktop big monitor */
   /*    width: ${isHorizontal ? '50vw' : '30vw'}; */
  /*     margin: ${isHorizontal ? `15vh 0` : `65px 10px`}; */
    }
  `

const newimgwrapper = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; 
    height: 100%; 
    padding-bottom: 100%;
    margin-bottom: 25%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;

    
    animation: fadein 1s;
    @keyframes fadein {
    from { filter: blur(3px); }
    to   { filter: blur(0px); }
}
  `

const useProgressiveImage = src => {
  const [sourceLoaded, setSourceLoaded] = useState(null)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setSourceLoaded(src)
  }, [src])

  return sourceLoaded
}

const imagetext = css`
  position: absolute;
  bottom: 0;
`

const ImageSlide = ({ projectTitle, projectSize, selectedImage, currentIndex, opacity }) => {
  const { bindHoverable } = useCursorContext()
  const loaded = selectedImage && useProgressiveImage(selectedImage.url)

  return loaded ? (
    <div {...bindHoverable()} style={{ backgroundImage: `url(${loaded})` }} className={newimgwrapper} >
      
    </div>

  ) : null
}

export default ImageSlide;
