import modalCss from './ModalStyle';
import { css, keyframes } from 'emotion';
import classNames from 'classnames';

const borderRadius = keyframes`
  0% {
    border-top-left-radius: 25px;
    border-bottom-right-radius: 25px;
    border-top-right-radius: 75px;
    border-bottom-left-radius: 75px;
  }
  100% {
    border-top-left-radius: 75px;
    border-bottom-right-radius: 75px;
    border-top-right-radius: 30px;
    border-bottom-left-radius: 35px;
  }
  `;

const animatedBorder = css`
  animation: ${borderRadius} 4s infinite;
  animation-direction: alternate;
  animation-play-state: running;
`;

const ModalContent = props => (
  <section className={modalCss.modalWrapper}>
    <div className={modalCss.alignerItemTop}>
      <h2>{props.leftTitle}</h2>
    </div>
    <div className={modalCss.alignerImage}>
      <img
        src={`http://localhost:1337${props.overlayImage.url}`}
        className={classNames(modalCss.heroImage, animatedBorder)}
      />
    </div>
    <div className={modalCss.alignerItemBottom}>
      <h2 className={modalCss.headTitleRight}>{props.rightTitle}</h2>
    </div>
  </section>
);

export default ModalContent;
