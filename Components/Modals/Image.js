import React from 'react'

function Image(props) {
   
    return (
        <div className={`modal-container`}>
          <div className={`col-12 d-flex d-justify-center props.modalClass`} >
            <div className={`bg-white p-5 rounded-12`}>
              {props.children}
            </div>
          </div>
        </div>
      )
}

export default Image