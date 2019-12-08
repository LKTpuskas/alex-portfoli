import React from 'react';
import { css } from 'emotion';

const getRightImageIndex = (images, currentImageIndex) => {
  const lastIndex = images.length - 1;
  const shouldResetIndex = currentImageIndex === 0;
  const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;
  return index;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ImageSlide = ({ selectedImage, images, currentIndex, opacity }) => {
  React.useEffect(() => {
    console.log('image did mount');
    getRightImageIndex(images, currentIndex)
  },[])

  const imageWrapper = css`
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; 
    height: 100%; 
  `

  const leftStyle = css`
    width: 100%;
    height: auto;
    opacity: 1;
    transition: all 2s ease-in-out;
    transform: perspective(500px) translateZ(-200px) rotateY(${getRandomInt(178, 185)}deg);
    float: left;
  `;

  const rightStyle = css`
    width: 100%;
    height: auto;
    opacity: 1;
    transition: all 2s ease-in-out;
    transform: perspective(500px) rotateY(${getRandomInt(170, 175)}deg);
    float: left;
  `;

  const imageExist = selectedImage && selectedImage.image;
  const nextImageRight = images[getRightImageIndex(images, currentIndex)]
  const nextImageLeft = selectedImage.length - 1;
  return imageExist ? (
    <div className={imageWrapper}>
      <img className={leftStyle} src={imageExist} />
      <img className={rightStyle} src={nextImageRight.image} />
    </div>
  ) : 'NO IMAGES';
}

export default ImageSlide;
