import { DialogOverlay, DialogContent } from "@reach/dialog";
import {useTransition, animated} from 'react-spring'
import { css } from 'emotion';
import { memo, useRef, useState, useEffect } from 'react'; 
import { createPortal } from 'react-dom'

const modalCss = (isMobile, modalTypeSelected) => css`
  position: fixed;
  top: 0;
  left: 0;
  overflow: scroll;/* ${isMobile ? 'scroll' : 'hidden'}; */
  background: ${modalTypeSelected ? '#ffffff94' : 'white'};
`
const backdropStyle = (opacityOn, modalTypeSelected, isMobile) => css`
  background: ${modalTypeSelected ? '#ffffffd9' : 'white'};
  display: block;
  left: 0;
  position: absolute;
  min-height: 100vh;
  overflow: auto;
  top: 0;
  overflow: scroll;/* ${isMobile ? 'scroll' : 'hidden'}; */
  transition: opacity 800ms ease-out;
 /*  z-index: ${opacityOn ? 1 : -1}; */
  opacity: ${opacityOn ? 1 : 0};
`;

export default function Modal({ show, children, isMobile, modalTypeSelected }) {
 const ref = useRef()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector('#modal')
    setMounted(true)
  }, [])

return mounted ? 
createPortal(<div className={backdropStyle(show, modalTypeSelected, isMobile)}>{children}</div>, ref.current) : null
 
{/*      {transitions.map(
        ({ item, key, props: styles }, keyid) => {
          const labelId = `label--${keyid}`
          console.log('modal ')
          return item && (
            <AnimatedDialogOverlay key={keyid} className={modalCss(isMobile, modalTypeSelected)} style={{ opacity: styles.opacity }}>
              <AnimatedDialogContent
                aria-labelledby={labelId}
                style={{
                  transform: styles.y.interpolate(
                    value => `translate3d(0px, ${value}px, 0px)`
                  ),
                  outline: 'none'
                }}
              >
              
            {children}
              </AnimatedDialogContent>
            </AnimatedDialogOverlay>
          )
        }
      )} */}
}