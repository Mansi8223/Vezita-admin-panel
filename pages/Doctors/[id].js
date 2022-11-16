import React from 'react'
import { Fragment } from 'react'
import Base from '../../Layout/Base'
import DoctorDetails from '../../Components/DoctorDetails'
import Header from '../../Components/Header'
function ViewDetails() {
  return (
    <Fragment>
      <Base>
        <Header title={"Doctor details"}></Header>
        <DoctorDetails/>
      </Base>
    </Fragment>
  )
}

export default ViewDetails