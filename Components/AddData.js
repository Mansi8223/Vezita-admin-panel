import React from 'react'
import styles from '../styles/css/PatientDetails.module.css'
import AddSpecialization from './AddSpecialization'
import AddSymptoms from './AddSymptoms'
import AddDrugs from './AddDrugs'
import AddAllergies from './AddAllergies'
function AddData() {
  return (
    <>
      <div className={`col-11 ${styles["wrapper"]} d-flex d-flex-column d-align-start gap-6 mt-5 ml-7`}>
        <div className={`col-5 col-md-12 col-xl-9 col-xxl-5 d-flex d-flex-column d-align-center gap-6`}>
          <AddSpecialization/>
          <AddSymptoms/>
        </div>
        <div className={`col-5 col-md-12 col-xl-9 col-xxl-5 d-flex d-flex-column d-align-center gap-6`}>
          <AddDrugs/>
          <AddAllergies/>
        </div>
      </div>
    </>
  )
}

export default AddData