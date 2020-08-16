import React, { useState, useEffect, createContext, useContext } from 'react'
import { useSpring } from 'react-spring'
import { css } from 'emotion'
import classnames from 'classnames';
import { useGesture, useHover } from 'react-use-gesture';
import { Router } from 'next/router';
import dynamic from 'next/dynamic'

import { useCursorContext } from './CursorContext'


export const cursorBackground = (isMobile, mousePosZero) => css`
  pointer-events: none;
  position: ${isMobile ? 'relative' : 'absolute'};
  z-index: 100;
  transition: 200ms;

 /*  transition-delay: ${mousePosZero ? '300ms' : '0ms'}; */
 /*  opacity: ${mousePosZero ? 0 : 1}; */
`
// export const CursorContext = createContext()

const PADDING_X = 1;
const PADDING_Y = 10;

const CustomCursor = function CustomCursor({ style, children, childrenXPos, childrenYPos, clickScale }) {
  const globalWindow = global.window || {}
  const { hoveredElement, mouseCoordinate } = useCursorContext();
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [moveEvent, setEventOnMove] = useState(null)
  const [textColor, setTextColor] = useState(null)
  const [backgroundColor, setBackgroundColor] = useState(null)
  const [cursorShape, setCursorShape] = useState(1)

  useEffect(() => {
    document.addEventListener('mousemove', handleMoveEvent)
    return () => {
      document.removeEventListener('mousemove', handleMoveEvent)
    }
  })
  const handleMoveEvent = event => {
    const { pageX, pageY } = event
    setEventOnMove({ x: pageX, y: pageY })
  }

/*   useEffect(() => {
    console.log(hoveredElement)
    if (hoveredElement !== null) {
      setTextColor('white')
      setBackgroundColor('black')
    } else {
      setTextColor('black')
      setBackgroundColor('white')
    }
  }, [hoveredElement]) */


  const bind = useGesture(
    {
      onHover: state => {
      },
      onMove: state => {
        
        let x
        let y
        if (mouseCoordinate !== null) {
          x = state.xy[0]
          y = state.xy[1]
          setPosition({ x: x - 35, y: y - 30 })
        } else {
          /* const clientRect = mouseCoordinate.getBoundingClientRect()
          x = clientRect.x
          y = clientRect.y
          setPosition({
            x: x + 600,
            y: y - PADDING_Y / 2,
            config: { duration: undefined }
          }) */
        }
      },
      onClick: () => {
        setTimeout(() => setCursorShape(1), 300)
        setCursorShape(clickScale)
      }
    },
    { domTarget: globalWindow }
  )
  useEffect(bind, [bind])

  const showCursor = moveEvent === null

  const positionCheck = {
    x: childrenXPos ? position.x - childrenXPos : position.x,
    y: childrenYPos ? position.y - childrenYPos : position.y
  }


  return (
    <div className={classnames(cursorBackground(false, showCursor), style)} style={{ 
      color: textColor,
      background: backgroundColor,
      transform: `scale(${cursorShape})`,
      left: `${positionCheck.x}px`,
      top: `${positionCheck.y}px` }}>
      <div style={{ left: `${positionCheck.x}px`, top: `${positionCheck.y}px` }}>{children}</div>
    </div>
  )
}

export default CustomCursor