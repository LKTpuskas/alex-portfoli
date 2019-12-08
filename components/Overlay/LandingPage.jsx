/* eslint-disable no-unused-expressions */
import { css } from 'emotion';

const backdropStyle = (opacityOn, fadeOut) => css`
  background-color: rgb(255, 255, 255);
  display: block;
  left: 0;
  position: fixed;
  top: 0;
  -webkit-transition: opacity 1s;
  transition: opacity 2s;
  z-index: ${opacityOn || fadeOut ? 1 : -1};
  opacity: ${opacityOn && fadeOut ? 1 : 0};
`;

const LandingPage = ({ isOpen, fadeOutOverlay, children, showOverlay }) => {
  console.log(fadeOutOverlay && isOpen)
  return (
    <div className={backdropStyle(isOpen, fadeOutOverlay)} onClick={showOverlay}>
      {children}
    </div>
  );
};

export default LandingPage;
