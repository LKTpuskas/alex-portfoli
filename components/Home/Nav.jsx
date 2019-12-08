import { mainNav, navLinks } from './NavStyle';
import LinkButton from '../LinkButton';

const Nav = () => (
  <>
    <ul className={mainNav} >
      <li>
        <LinkButton href={'/about'} name={'About'} className={navLinks} />
      </li>
      <li>
        <LinkButton href={'/archive'} name={'Archive'} className={navLinks} />
      </li>
      <li>
        <LinkButton href={'/prints'} name={'Prints'} className={navLinks} />
      </li>
    </ul>
  </>
)
export default Nav;
