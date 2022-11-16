import React from 'react'

function PatientsProfile({data,medData}) {
  return (
    <div className={`col-12 h-fit-content d-flex d-flex-column d-align-start gap-8 bg-subtle rounded-12 p-4`}>      
        <div className={`d-flex d-flex-row d-align-center gap-4`}>
            {data.avatar&&<img className={`image`} src={data.avatar} alt='patients-profile'/>}
            <div className={`d-flex d-flex-column d-align-start gap-1`}>
                <h3 className={`f-500 l-28 text-darker`}>{data.name}</h3>
                <h5 className={`f-400 l-22 text-dark-grey mb-1`}>ID: 93894</h5>
            </div>
        </div>
        <div className={`col-12 d-flex d-flex-row d-align-center`}>
            <div className={`col-4 d-flex d-flex-column d-align-center d-justify-center border-right-grey3`}>
                <h6 className={`f-500 l-20 text-darker`}>Age</h6>
                <h4 className={`f-400 l-22 text-darker-grey`}>{data.age}</h4>
            </div>
            <div className={`col-4 d-flex d-flex-column d-align-center d-justify-center border-right-grey3`}>
                <h6 className={`f-500 l-20 text-darker`}>Gender</h6>
                <h4 className={`f-400 l-22 text-darker-grey`}>{data.gender}</h4>
            </div>
            <div className={`col-4 d-flex d-flex-column d-align-center d-justify-center border-right-grey3`}>
                <h6 className={`f-500 l-20 text-darker`}>Marital status</h6>
                <h4 className={`f-400 l-22 text-darker-grey`}>{data.martialStatus}</h4>
            </div>
            <div className={`col-4 d-flex d-flex-column d-align-center d-justify-center`}>
                <h6 className={`f-500 l-20 text-darker`}>Blood group</h6>
                {medData&&<h4 className={`f-400 l-22 text-darker-grey`}>{medData.bloodGroup}</h4>}
            </div>
        </div>
    </div>
  )
}

export default PatientsProfile