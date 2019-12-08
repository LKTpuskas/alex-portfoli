import { css, keyframes } from 'emotion';
import LinkButton from '../LinkButton';

import { modalWrapper } from '../Overlay/ModalStyle'

const aboutWrapper = css`
  height: 100vh;
  width: 100vw;
  text-align: center;
  ::-webkit-selection {
    background-color: #352e7e;
    color: #fff;
}
`;

const AboutContent = props => (
  <div className={aboutWrapper} >
    <LinkButton href={'/'} name={'Home'}/>
    <br/>
    <h2>{props.aboutMe}</h2>
    <h2>{props.email}</h2>
    <h2>{props.phone}</h2>
  </div>
)

export default AboutContent;
