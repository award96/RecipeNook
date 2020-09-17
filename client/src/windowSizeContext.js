import React, {useLayoutEffect, useState, createContext} from 'react'

const WindowSizeContext = createContext({
  size: [0, 0],
})

const WindowSizeContextProvider = (props) => {
  /*
    https://stackoverflow.com/questions/
    19014250/rerender-view-on-browser-resize-with-react
  */
  const [size, setSize] = useState([0, 0])

  useLayoutEffect(() => {
    let updateSize = () => {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return (
    <WindowSizeContext.Provider value={{size}}>
      {props.children}
    </WindowSizeContext.Provider>
  )
}

export {WindowSizeContext, WindowSizeContextProvider}
