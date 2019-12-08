import { useState, useMemo, useCallback, memo } from 'react';
import { debounce } from 'lodash';
import { css } from 'emotion';
import LinkButton from '../LinkButton';

const photoOverlay = (isHovered, xPosition, yPosition) => css`
  position: absolute;
  width: 300px;
  height: auto;
  left: ${xPosition}px;
  top: ${yPosition}px;
  transition-duration: 400ms;
  transition-timing-function: ease-out;
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

const projectItem = (isHovered) => css`
  font-size: 5rem;
  color: black;
  letter-spacing: 8px;
  align-items: center;
  justify-content: center;
  transition: opacity 0.5s;
  text-shadow: ${isHovered ? '-2px -1px 0 pink' : 'none'};
`;

const sectionWrapper = css`
  align-items: center;
  justify-content: center;
  margin-top: 10rem;
`;

const archiveList = css`
  font-family: 5rem;
  color: black;
  letter-spacing: 8px;
  text-align: center;
`;

const Archive = memo(props => {
  const [isHovered, handleHover] = useState(false);
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [currentPos, handlePosition] = useState(0);
  const onHover = (index, hovered) => {
    handleHover(hovered)
    handlePosition(index)
  }
  // const projectExists = props.archiveData && props.archiveData.data;

  const mouseMovement = (event) => {
    console.log('horizontal', event.clientX)
    console.log('vertical', event.clientY)/*  useCallback(() => setXPosition(event.clientX + 20), [xPosition])
    useCallback(() => setYPosition(event.clientY + 20), [yPosition]) */
    setXPosition(event.clientX + 20, [xPosition])
    setYPosition(event.clientY + 20, [yPosition])
  }
  // https://kentcdodds.com/blog/usememo-and-usecallback
  return (
    <div className={archiveWrapper}>
      <LinkButton href={'/'} name={'Home'}/>
      <section className={sectionWrapper} >
        {
          props.archiveData ? props.archiveData.map((a, index) => {
            // const titleWithoutSpaces = a.title.replace(/\s+/g, '');
            return (
              <li className={archiveList} key={index} >
                <LinkButton
                  href={`archive/gallery?id=${a.id}`}
                  name={a.title}
                  className={projectItem(isHovered)}
                  onMouseMove={(e) => mouseMovement(e)}
                  onMouseEnter={() => onHover(index, true)}
                  onMouseLeave={() => onHover(index, false)}/>
                {currentPos === index // a.image
                  ? <img src={a.image} alt="" className={photoOverlay(isHovered, xPosition, yPosition)} /> : null
                }
              </li>
            )
          }) : []
        }
      </section>
    </div>
  )
})

export default Archive;
