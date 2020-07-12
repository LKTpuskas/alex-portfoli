import { useState, memo } from 'react'
import { customAboutStyle, mainNav, navLinks, mainBtn, sideLinks, mobileSideLinks, archiveFooter } from './NavStyle';
import LinkButton from '../LinkButton';
import Link from 'next/link';



const MainButton = <li className={mainBtn}>
<LinkButton href={'/'} name={'ALEXANDERHANA'} className={navLinks} />
</li>

const Nav = function Nav({ router, mouseMoved, isMobile, triggerModal, setOnHoverFooter, isAbout }) {
  const [isHovered, setMouseMove] = useState(false);
  const showSideLinksStyle = isMobile ? mobileSideLinks : sideLinks
  const isIndex = router.route === '/'
 
  return <footer onMouseEnter={() => setOnHoverFooter(true)} onMouseLeave={() => setOnHoverFooter(false)} className={archiveFooter}>
    <ul className={mainNav}>{isIndex || isAbout ? (
      <>{!isAbout && (
        <li className={showSideLinksStyle}>
          <Link href='/about' name='About' passHref>
            <a className={customAboutStyle}>
              About
            </a>
          </Link>
        </li>
      )}
      {MainButton}
      <li className={showSideLinksStyle}>
        <a className={navLinks} href='https://instagram.com/alexanderhana'>Instagram</a>
      </li>
      </>
    ) : (
      <>
        <li className={showSideLinksStyle}>
          <a onClick={() => triggerModal('description')} name={'Description'} className={navLinks}>Description</a>
        </li>
        {MainButton}
        <li className={showSideLinksStyle}>
          <a onClick={() => triggerModal('thumbnails')} name={'Thumbnails'} className={navLinks}>Thumbnails</a>
        </li>
      </>
    )
    }</ul>

  </footer>
}

export default Nav

/* {isIndex ? sideLinkButton('www.instagram.com/alexanderhana/', 'Instagrham', showSideLinksStyle, setMouseMove) : projectButton('Thumbnails', setMouseMove, showSideLinksStyle, () => triggerModal('thumbnails'))} */