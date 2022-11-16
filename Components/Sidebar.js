import React from 'react'
import Menubar from './Menubar'
import CloseIcon from '@mui/icons-material/Close';
function Sidebar() {
  const handler=()=>{
    var ele=document.getElementById("sb")
    ele.classList.remove('sidebar-active')
    ele.classList.add('sidebar')
  }
  return (
    <div id='sb' className={`sidebar d-flex d-flex-column h-100 o-hidden left-none p-5 bg-light-grey`}>
      <div className={`close-icon text-primary self-end`} onClick={handler}>
        <CloseIcon/>
      </div>
      <img className={`mt-3 mb-5`} src='/assets/VezitaSideLogo.svg' alt='logo'/>
      <Menubar/>
    </div>
  )
}

export default Sidebar