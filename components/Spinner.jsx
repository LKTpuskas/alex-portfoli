/* import { css, keyframes } from 'emotion';

const rotate = keyframes`
100% {
  transform: rotate(360deg);
}
`
const dash = keyframes`
0% {
  stroke-dasharray: 1, 150;
  stroke-dashoffset: 0;
}
50% {
  stroke-dasharray: 90, 150;
  stroke-dashoffset: -35;
}
100% {
  stroke-dasharray: 90, 150;
  stroke-dashoffset: -124;
}
` */

/* const path = css`
stroke: hsl(210, 70, 75);
stroke-linecap: round;
animation: ${dash} 1.5s ease-in-out infinite;
`
const spinner = css`
  animation: ${rotate} 2s linear infinite;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;
  & .path {
    stroke: hsl(210, 70, 75);
    stroke-linecap: round;
    animation: ${dash} 1.5s ease-in-out infinite;
  }
` */
const Spinner = () => (
  <svg viewBox="0 0 50 50">
    <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
  </svg>
)

export default Spinner;
