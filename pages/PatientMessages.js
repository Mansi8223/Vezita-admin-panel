import React from 'react'
import { Fragment } from 'react'
import Base from '../Layout/Base'
import Header from '../Components/Header'
import PatientsChat from '../Components/PatientsChat'

function PatientMessages() {
  return (
    <Fragment>
      <Base>
        <Header title="Disputes"></Header>
        <PatientsChat/>
      </Base>
    </Fragment>
  )
}

export default PatientMessages