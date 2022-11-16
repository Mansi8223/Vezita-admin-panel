import React from 'react'

function ChangePwModalContent(props) {
    const closeHandler=()=>props.handler()
  return (
    <form onSubmit={closeHandler} className={`col-12 d-flex d-flex-column d-align-start gap-5`}>
        <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between`}>
            <h2 className={`f-600 l-28 text-black`}>Change password</h2>
            <button type='submit' className={`col-4 self-center btn`}>Save</button>
        </div>
        <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
            <h6>Current password</h6>
            <input className={`col-12 search-input pt-3 pb-3 pl-4 pr-4 rounded-8`} type='text'/>
        </div>
        <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
            <h6>New password</h6>
            <input className={`col-12 search-input pt-3 pb-3 pl-4 pr-4 rounded-8`} type='text'/>
        </div>
        <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
            <h6>Confirm new password</h6>
            <input className={`col-12 search-input pt-3 pb-3 pl-4 pr-4 rounded-8`} type='text'/>
        </div>
    </form>
  )
}

export default ChangePwModalContent