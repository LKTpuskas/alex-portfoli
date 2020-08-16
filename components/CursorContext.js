import React, { useState, useEffect, createContext, useContext } from 'react'
import { useSpring } from 'react-spring'
import { css } from 'emotion'
import classnames from 'classnames';
import { useGesture } from 'react-use-gesture';
import { Router } from 'next/router';
import dynamic from 'next/dynamic'

/* export function CursorContextProvider({ children }) {
  const [mousePosition, setMousePosition] = useState(null)
  useEffect(() => {
    document.addEventListener('mousemove', move)
    
    return () => {
      document.removeEventListener('mousemove', move)
    }
  })
  
  const move = event => {
    const { pageX: x, pageY: y } = event
    // console.log(event.pageX)
    setMousePosition({ x, y })
  }
  
  return (
    <CursorContext.Provider
      value={mousePosition}
    >
    {children}
    </CursorContext.Provider>
    )
}

export function useCursorContext() {
  return useContext(CursorContext)
} */

const CursorContext = createContext({
  bindHoverable: () => ({}),
  hoveredElement: null,
  mouseCoordinate: null,
  modalMounted: false
})

export function CursorContextProvider({ children }) {
  // const [hoveredElement, setHoveredElement] = useState(null)
  const [hoveredElement, setHoveredElement] = useState(null);
  const [mouseCoordinate, setEventOnMove] = useState({ x: 0, y: 0 })
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


  
  return (
    <CursorContext.Provider
    value={{
      bindHoverable () {
        return {
          onMouseEnter: event => setHoveredElement(event.currentTarget),
          onMouseLeave: () => setHoveredElement(null)
        }
      },
      hoveredElement,
      mouseCoordinate
    }} >
      {children}
    </CursorContext.Provider>
  );
}

export function withCursorContext(Component) {
  return <CursorContext.Consumer>{(value) => <Component {...value} />}</CursorContext.Consumer>
}

export function useCursorContext() {
  return useContext(CursorContext);
}