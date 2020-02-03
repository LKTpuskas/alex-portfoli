import { DialogOverlay, DialogContent } from "@reach/dialog";
import {useTransition, animated} from 'react-spring'
import { css } from 'emotion';

const modalCss = css`
  position: fixed;
  top: 0;
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
          const labelId = `label--${key}`
          return item && (
            <AnimatedDialogOverlay className={modalCss} style={{ opacity: styles.opacity }}>
              <AnimatedDialogContent
                aria-labelledby={labelId}
                style={{
                  transform: styles.y.interpolate(
                    value => `translate3d(0px, ${value}px, 0px)`
                  ),
                  border: "4px solid hsla(0, 0%, 0%, 0.5)",
                  borderRadius: 10
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