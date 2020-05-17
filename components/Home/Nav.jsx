import { useState, memo } from 'react'
import { mainNav, navLinks, mainBtn, sideLinks, mobileSideLinks, archiveFooter} from './NavStyle';
import LinkButton from '../LinkButton';


{/* <ul className={mainNav} >
<li className={showSideLinks} onMouseLeave={() => setMouseMove(false)}>
  <LinkButton href={'/about'} name={'Contact'} className={navLinks} />
</li>
<li className={mainBtn(mouseMoved)} onMouseEnter={() => setMouseMove(true)}>
  <LinkButton href={'/'} name={'ALEXANDERHANA'} className={navLinks} />
</li>
<li className={showSideLinks} onMouseLeave={() => setMouseMove(false)}>
  <LinkButton href={'/prints'} name={'Instagram'} className={navLinks} />
</li>
</ul> */}

function homeButton() {
  return <li className={mainBtn}>
  <LinkButton href={'/'} name={'ALEXANDERHANA'} className={navLinks} />
</li>
}

function sideLinkButton(href, name, showSideLinksStyle, setMouseMove) {
  return  <li className={showSideLinksStyle} onMouseLeave={() => setMouseMove(false)}>
  <button href={href} name={name} className={navLinks}>{name}</button>
</li>
}

function projectButton(name, setMouseMove, showSideLinksStyle, onClick) {
  return <li className={showSideLinksStyle} onMouseLeave={() => setMouseMove(false)}>
  <button className={navLinks} onClick={onClick}>{name}</button> 
</li>
}

const Nav = memo(function Nav({ router, mouseMoved, isMobile, triggerModal, setOnHoverFooter }) {
  const [isHovered, setMouseMove] = useState(false);
  const showSideLinksStyle = isMobile ? mobileSideLinks : sideLinks
  const isIndex = router.route === '/'
  return <footer onMouseEnter={() => setOnHoverFooter(true)} onMouseLeave={() => setOnHoverFooter(false)} className={archiveFooter}>
      <ul className={mainNav}>
       
        <li className={showSideLinksStyle}>
        {isIndex ? <button href={'/about'} name={'About'} className={navLinks}>About</button>
        : <button name={'Description'} className={navLinks} onClick={() => triggerModal('description')}>Description</button> }
        </li>
       <li className={mainBtn}>
       <LinkButton href={'/'} name={'ALEXANDERHANA'} className={navLinks} />
       </li>
       <li className={showSideLinksStyle}>
        {isIndex ? <button href={'www.instagram.com/alexanderhana'} name={'Instagram'} className={navLinks}>Instagram</button>
        : <button name={'Thumbnails'} className={navLinks} onClick={() => triggerModal('thumbnails')}>Thumbnails</button> }
        </li>
  </ul> 
  </footer>
});

export default Nav;

/* {isIndex ? sideLinkButton('www.instagram.com/alexanderhana/', 'Instagrham', showSideLinksStyle, setMouseMove) : projectButton('Thumbnails', setMouseMove, showSideLinksStyle, () => triggerModal('thumbnails'))} */