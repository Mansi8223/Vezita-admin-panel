import React, { useState } from 'react'
import styles from '../../styles/css/RejectModalContent.module.css'
function RejectModalContent(props) {
    const[reason, setReason]=useState("")
    const reasonHandler=(e)=>setReason(e.target.value)
    const closeHandler=()=>props.handler()
  return (
    <div className={`col-12 d-flex d-flex-column gap-2`}>
        <h2 className={`f-600 l-32 text-black`}>Reason for denying</h2>
        <form onSubmit={closeHandler} className={`col-12 d-flex d-flex-column gap-2 pr-1`}>
            <h3 className={`f-500 l-28 text-darker`}>Give us a reason why you can't accept the banner.</h3>
            <textarea className={`${styles["textarea"]} border-none bg-light-grey rounded-8 pl-3 pr-3 pt-2 pb-2 outline-none`} value={reason} onChange={reasonHandler}/>
            <button type='submit' className={`col-4 self-center btn`}>Send</button>
        </form>
    </div>
  )
}

export default RejectModalContent