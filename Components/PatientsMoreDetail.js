import React from 'react'

function PatientsMoreDetail({data}) {
  return (
    <div className={`col-12 h-fit-content d-flex d-flex-column d-align-start gap-6 bg-subtle rounded-12 p-4`}>
        <h3 className={`f-500 l-28 text-darker`}>More details</h3>
        <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between`}>
            <h5 className={`col-6 f-400 l-22 text-darker-grey`}>Medical conditions</h5>
            <h5 className={`col-6 f-400 l-22 text-darker`}>Medical conditions</h5>
        </div>
        <div className={`col-12 d-flex d-flex-row d-align-start`}>
            <h5 className={`col-6 f-400 l-22 text-darker-grey`}>Allergies</h5>
            <div className={`col-6 d-flex d-flex-column gap-1`}>
            {data.allergies&&data.allergies.map((item,index)=>(
                <h5 key={index+1} className={`f-400 l-22 text-darker`}>{item}</h5>
            ))}
            </div>
        </div>
        <div className={`col-12 d-flex d-flex-row d-align-start`}>
            <h5 className={`col-6 f-400 l-22 text-darker-grey`}>Current Medications</h5>
            <div className={`col-6 d-flex d-flex-column gap-1`}>
            {data.medications&&data.medications.map((item,index)=>(
                <h5 key={index+1} className={`f-400 l-22 text-darker`}>{item}</h5>
            ))}
            </div>
        </div>
        <div className={`col-12 d-flex d-flex-row d-align-start`}>
            <h5 className={`col-6 f-400 l-22 text-darker-grey`}>Past Medications</h5>
            <div className={`col-6 d-flex d-flex-column gap-1`}>
            {data.pastMedications&&data.pastMedications.map((item,index)=>(
                <h5 key={index+1} className={`f-400 l-22 text-darker`}>{item}</h5>
            ))}
            </div>
        </div>
        <div className={`col-12 d-flex d-flex-row d-align-start`}>
            <h5 className={`col-6 f-400 l-22 text-darker-grey`}>Surgeries</h5>
            <div className={`col-6 d-flex d-flex-column gap-1`}>
            {data.surgeries&&data.surgeries.map((item,index)=>(
                <h5 key={index+1} className={`f-400 l-22 text-darker`}>{item}</h5>
            ))}
            </div>
        </div>
    </div>
  )
}

export default PatientsMoreDetail