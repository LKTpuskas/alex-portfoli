/* eslint-disable no-unused-expressions */
import { css } from 'emotion';

const backdropStyle = (opacityOn) => css`
  background-color: blue;
  display: block;
  left: 0;
  position: fixed;
  top: 0;
  -webkit-transition: opacity 1s;
  transition: opacity 2s;
  z-index: ${setTimeout(() => {
    opacityOn ? 1 : -1;
  }, 2000)};
  opacity: ${opacityOn ? 1 : 0};
`;

const TransitionPage = ({ isOpen, children, showOverlay }) => {
  return (
    <div className={backdropStyle(isOpen)} onClick={showOverlay}>
      {children}
    </div>
  );
};

export default TransitionPage;
