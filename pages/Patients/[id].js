import React from 'react'
import { Fragment } from 'react'
import Base from '../../Layout/Base'
import Header from '../../Components/Header'
import PatientDetails from '../../Components/PatientDetails'

function ViewPatientDetails() {
  return (
    <Fragment>
      <Base>
        <Header title={"Patient details"}></Header>
        <PatientDetails/>
      </Base>
    </Fragment>
  )
}

export default ViewPatientDetails