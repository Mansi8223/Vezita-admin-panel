import React from 'react'
import { Fragment } from 'react'
import Base from '../Layout/Base'
import Header from '../Components/Header'
import AddDoctorForm from '../Components/AddDoctorForm'
function AddDoctor() {
  return (
    <Fragment>
      <Base>
        <Header title={"Add Doctor"}></Header>
        <AddDoctorForm/>
      </Base>
    </Fragment>
  )
}

export default AddDoctor