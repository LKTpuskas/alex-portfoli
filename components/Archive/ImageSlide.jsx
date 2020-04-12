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

const ImageSlide = ({ selectedImage, currentIndex, opacity }) => {

  const imageWrapper = (isHorizontal) => css`
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: ${isHorizontal ? `150px 0` : `0 10px`};
    padding: 10px;
    width: 100%; 
    height: 100%; 
    @media (min-width: 1020px) {
      
    }
  `

  const leftStyle = css`
    width: 100%;
    height: auto;
    opacity: 1;
    transition: all 2s ease-in-out;
  
  `;

  const rightStyle = css`
    width: 100%;
    height: auto;
    opacity: 1;
    transition: all 2s ease-in-out;
    transform: perspective(500px) rotateY(${getRandomInt(170, 175)}deg);
    float: left;
  `;

  // const imageExist = selectedImage && selectedImage.image;
  // const nextImageRight = images[getRightImageIndex(images, currentIndex)]
  // const nextImageLeft = selectedImage.length - 1;
  return selectedImage ? (
    <div className={imageWrapper(selectedImage.isHorizontal)}>
      <img className={leftStyle} src={selectedImage.url} />
     {/*  <img className={rightStyle} src={nextImageRight.image} /> */}
    </div>
  ) : null
}

export default ImageSlide;
