import { DialogOverlay, DialogContent } from "@reach/dialog";
import {useTransition, animated} from 'react-spring'
import { css } from 'emotion';

const modalCss = css`
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  background: white;
`

export default function Modal({ show, children }) {
  const AnimatedDialogOverlay = animated(DialogOverlay);
  const AnimatedDialogContent = animated(DialogContent);
  const transitions = useTransition(show, null, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 }
  });
  return (
    <>
     {transitions.map(
        ({ item, key, props: styles }, keyid) => {
          const labelId = `label--${keyid}`
          return item && (
            <AnimatedDialogOverlay className={modalCss} style={{ opacity: styles.opacity }}>
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
      )}
    </>
  );
}