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
    <p>{props.aboutMe}</p>
    <p>{props.email}</p>
    <p>{props.phone}</p>
  </div>
)

export default AboutContent;
