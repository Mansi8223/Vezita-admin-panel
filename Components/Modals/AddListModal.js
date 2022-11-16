import React from 'react'

function AddListModal(props) {
    return (
        <div className={`modal-container`}>
          <div className={`col-12 d-flex d-justify-center props.modalClass`}>
            <div className={`col-md-6 col-lg-5 col-xl-4 col-xxl-3 bg-white p-5 rounded-12`}>
              {props.children}
            </div>
          </div>
        </div>
      )
}

export default AddListModal