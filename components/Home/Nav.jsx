import { useState, memo } from 'react'
import { mainNav, navLinks, mainBtn, sideLinks, mobileSideLinks} from './NavStyle';
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

function homeButton(mouseMoved, setMouseMove) {
  return <li className={mainBtn(mouseMoved)} onMouseEnter={() => setMouseMove(true)}>
  <LinkButton href={'/'} name={'ALEXANDERHANA'} className={navLinks} />
</li>
}

function sideLinkButton(href, name, showSideLinks, setMouseMove) {
  return  <li className={showSideLinks} onMouseLeave={() => setMouseMove(false)}>
  <LinkButton href={href} name={name} className={navLinks} />
</li>
}

function projectButton(name, setMouseMove, onClick, href) {
  return  <li className={''} onMouseLeave={() => setMouseMove(false)}>
  { href ? <LinkButton href={href} name={name} className={navLinks} /> : <button href={href} className={navLinks} onClick={onClick}>{name}</button> }
</li>
}



function renderNav(currentRoute, showSideLinks, setMouseMove, mouseMoved, triggerModal) {
  const isIndex = '/' === currentRoute;
      return (
        <>
        {isIndex ? sideLinkButton('/about', 'Contact', showSideLinks, setMouseMove) : projectButton('Description', setMouseMove, () => triggerModal('description'))}
        {homeButton(mouseMoved, setMouseMove)}
        {isIndex ? sideLinkButton('www.instagram.com/ThePalmCentre/', 'Instagram', showSideLinks, setMouseMove) : projectButton('Thumbnails', setMouseMove, () => triggerModal('thumbnails'))}
        </>
      )
}

const Nav = memo(({ router, isAnimating, mouseMoved, isMobile, triggerModal }) => {
  const [isHovered, setMouseMove] = useState(false);
  const showSideLinks = isMobile ? mobileSideLinks : sideLinks(isAnimating, isHovered)
  return <ul className={mainNav} >
    {renderNav(router.route, showSideLinks, setMouseMove, mouseMoved, triggerModal)}
   </ul> 
  });

export default Nav;
