import { css, keyframes } from 'emotion';
import LinkButton from '../LinkButton';

import { modalWrapper } from '../Overlay/ModalStyle'

const aboutWrapper = css`
    height: 100vh;
    width: 100vw;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AboutContent = props => (
  <div className={aboutWrapper} >
    <br/>
    <h2>{props.aboutMe}</h2>
    <h2>{props.email}</h2>
    <h2>{props.phone}</h2>
  </div>
)

export default AboutContent;
