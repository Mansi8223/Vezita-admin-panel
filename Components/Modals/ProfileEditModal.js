import React from 'react'

function ProfileEditModal(props) {
    return (
        <div className={`modal-container`}>
          <div className={`col-12 d-flex d-justify-center props.modalClass`}>
            <div className={`col-3 col-md-5 col-lg-4 col-xxl-3 bg-white p-5 rounded-12`}>
              {props.children}
            </div>
          </div>
        </div>
      )
}

export default ProfileEditModal