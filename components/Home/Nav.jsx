import { mainNav, navLinks } from './NavStyle';
import LinkButton from '../LinkButton';

const Nav = () => (
  <>
    <ul className={mainNav} >
      <li>
        <LinkButton href={'/about'} name={'Contact'} className={navLinks} />
      </li>
      <li>
        <LinkButton href={'/archive'} name={'ALEXANDERHANA'} className={navLinks} />
      </li>
      <li>
        <LinkButton href={'/prints'} name={'Instagram'} className={navLinks} />
      </li>
    </ul>
  </>
)
export default Nav;
