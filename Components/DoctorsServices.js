import React from 'react'

function DoctorsServices({data}) {
  console.log(data)
  return (
    <div className={`col-12 h-fit-content d-flex d-flex-column d-align-start gap-4 bg-subtle rounded-12 p-4`}>
      <h4 className={`f-600 l-26 text-darker`}>Services</h4>
      <div className={`col-12 d-flex d-flex-column gap-3`}>
        {data&&data.map((item,index)=>(<div key={index+1} className={`d-flex d-flex-row d-align-center gap-2`}>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="8" height="8" rx="4" fill="#60606C"/>
          </svg>
          <h5 className={`f-400 l-22 text-darker-grey`}>{item.serviceId.name}</h5>
        </div>))}
      </div>
    </div>
  )
}

export default DoctorsServices