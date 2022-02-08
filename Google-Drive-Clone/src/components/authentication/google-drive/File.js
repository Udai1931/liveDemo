import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFile} from '@fortawesome/free-solid-svg-icons'
import {withRouter} from 'react-router-dom'
const File=function({file}) {
    const handleClick =function(e) {
        if (e.type === 'click') {
            window.open(`${file.url}`, "_blank")
        //   console.log('Left click');
        } else if (e.type === 'contextmenu') {
            e.preventDefault()
        //   console.log('Right click');
          const xPos = e.pageX + "px";
          const yPos = e.pageY + "px";
        }
       
     }
    return (
     
        <>
        
       <a onClick={handleClick} onContextMenu={handleClick} target="_blank" className="btn btn-outline-dark text-truncate w-100" >
           <FontAwesomeIcon icon={faFile} className='mr-2'/>
           {file.name}
       </a>
      
        </>
    )
}
export default withRouter(File);