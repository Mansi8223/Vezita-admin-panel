import React, { useState } from 'react'
import styles from '../styles/css/VerifyBanners.module.css'
import RejectModal from './Modals/RejectModal'
import RejectModalContent from './Modals/RejectModalContent'
function VerifyBanners() {
  const[decline,setDecline]=useState(false)
  const[edit,setEdit]=useState(false)
  const declineHandler=()=>setDecline(prev => !prev)
  const editHandler=()=>setEdit(prev => !prev)
  return (
    <>
      <div className={`col-8 col-md-11 col-xl-8 d-flex d-flex-row d-align-start d-justify-space-between mt-5 ml-12`}>
        <div className={`d-flex d-flex-column d-align-start gap-5`}>
          <div className={`${styles["image-wrapper"]} d-flex d-align-center d-justify-center bg-light-grey rounded-8`}>
            <h5 className={`f-400 l-22 text-darker`}>Image</h5>
          </div>
          {/* <img/> */}
          <div className={`d-flex d-flex-row d-align-center gap-3`}>
            <div  onClick={declineHandler} className={`d-flex d-flex-row d-align-center d-justify-center gap-1 bg-warn rounded-100 pl-3 pt-3 pb-3 pr-3 pointer`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.0311 11.9688C13.1011 12.0385 13.1565 12.1213 13.1944 12.2125C13.2322 12.3036 13.2517 12.4014 13.2517 12.5001C13.2517 12.5988 13.2322 12.6965 13.1944 12.7877C13.1565 12.8789 13.1011 12.9617 13.0311 13.0313C12.8896 13.171 12.6988 13.2494 12.4999 13.2494C12.301 13.2494 12.1102 13.171 11.9686 13.0313L7.99989 9.06258L4.03114 13.0313C3.88961 13.171 3.69875 13.2494 3.49989 13.2494C3.30103 13.2494 3.11017 13.171 2.96864 13.0313C2.89872 12.9617 2.84324 12.8789 2.80539 12.7877C2.76753 12.6965 2.74805 12.5988 2.74805 12.5001C2.74805 12.4014 2.76753 12.3036 2.80539 12.2125C2.84324 12.1213 2.89872 12.0385 2.96864 11.9688L6.93739 8.00008L2.96864 4.03133C2.82774 3.89043 2.74859 3.69934 2.74859 3.50008C2.74859 3.40142 2.76802 3.30372 2.80578 3.21257C2.84353 3.12142 2.89887 3.0386 2.96864 2.96883C3.0384 2.89907 3.12123 2.84373 3.21238 2.80597C3.30353 2.76821 3.40123 2.74878 3.49989 2.74878C3.69915 2.74878 3.89024 2.82793 4.03114 2.96883L7.99989 6.93758L11.9686 2.96883C12.1095 2.82793 12.3006 2.74878 12.4999 2.74878C12.6991 2.74878 12.8902 2.82793 13.0311 2.96883C13.172 3.10973 13.2512 3.30082 13.2512 3.50008C13.2512 3.69934 13.172 3.89043 13.0311 4.03133L9.06239 8.00008L13.0311 11.9688Z" fill="white"/>
              </svg>
              <span className={`font-12 f-600 l-14 text-white`}>Decline</span>
            </div>
            <div className={`d-flex d-flex-row d-align-center d-justify-center gap-1 bg-green rounded-100 pl-3 pt-3 pb-3 pr-3 pointer`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7617 4.20171C14.0646 4.48434 14.0809 4.95893 13.7983 5.26174L6.79829 12.7617C6.65951 12.9104 6.46629 12.9964 6.26293 12.9999C6.05956 13.0034 5.86349 12.9242 5.71967 12.7803L2.21967 9.28033C1.92678 8.98744 1.92678 8.51257 2.21967 8.21967C2.51256 7.92678 2.98744 7.92678 3.28033 8.21967L6.2314 11.1707L12.7017 4.23826C12.9843 3.93545 13.4589 3.91909 13.7617 4.20171Z" fill="white"/>
              </svg>
              <span className={`font-12 f-600 l-14 text-white`}>Accept</span>
            </div>
          </div>
        </div>
        <div className={`d-flex d-flex-row d-align-center gap-4`}>
          <h3 className={`f-500 l-22 text-darker-grey`}>$30</h3>
          <div className={`p-relative d-flex d-justify-end gap-5`}>
            <h5 onClick={editHandler} className={`p-relative pl-4 pr-4 pt-2 pb-2 bg-light-grey rounded-12 f-500 l-22 text-darker pointer`}>Edit</h5>
            {edit&&<form className={`${styles["pop-up"]} p-absolute d-flex d-flex-column gap-2 bg-subtle p-3`}>
              <h5 className={`f-500 l-22 text-darker`}>Edit amount</h5>
              <input className={`${styles["input"]} border-none rounded-8 pl-4 pr-4 pt-3 pb-3 bg-white`} type='number' placeholder="$ Enter amount" />
              <button type="submit" onClick={editHandler} className={`${styles["button"]}`}>Save</button>
            </form>}
          </div>
        </div>
      </div>
      {decline && <RejectModal modalClass="modal-verify">
        <RejectModalContent handler={declineHandler}></RejectModalContent>
      </RejectModal>}
    </>
  )
}

export default VerifyBanners