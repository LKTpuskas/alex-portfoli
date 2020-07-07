import Link from "next/link";
import React from 'react'
const Testsfc = function testsfc(props) {
 /*  const [windowWidth, setWindowWidth] = React.useState(0);
  React.useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [windowWidth]) */
  
  return (
    <div>
      <h1>DUBOKO</h1>

  <img src={props.projectData[0].images[0].url} style={{ height: '100px', width: '100px' }}/>
  
  
  
  
  {[{ title: 'longsocks' }].map((item, index, array) => {
            return (
              <>
                <ul>
                <li >
                 {/*  <button
                    onClick={() => handleOnLinkClick(item.title)}
                    className={projectItem(isHovered, imgIsAnimated)}
                    onMouseEnter={() => onHover(index, true)}
                    onMouseLeave={() => !imgIsAnimated && onHover(index, false)} >{item.title}</button> */}
                  <Link
                    href="/evaduboko"
                   >{item.title}</Link>
                </li>

                </ul>
                
              </>
            )
          })}
    </div>
  )
}

export default React.memo(Testsfc)
