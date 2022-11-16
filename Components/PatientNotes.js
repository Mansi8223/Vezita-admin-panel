import React from 'react'
function PatientNotes({data}) {
  return (
    <div className={`col-12 h-fit-content d-flex d-flex-column d-align-start gap-3 bg-subtle rounded-12 p-4`}>
        <h3 className={`f-500 l-28 text-darker`}>Notes</h3>
        {data&&data.map((item,index)=>(
          <div key={index+1} className={`col-12 d-flex d-flex-column d-align-start gap-1 bg-white rounded-8 p-3`}>
            <h4 className={`f-500 l-26 text-darker`}>{item.content}</h4>
            <h5 className={`f-400 l-22 text-dark-grey`}>{item.date.split('T')[0]}</h5>
          </div>
        ))}
    </div>
  )
}

export default PatientNotes