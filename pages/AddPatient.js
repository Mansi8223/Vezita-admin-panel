import React from 'react'
import { Fragment } from 'react'
import Base from '../Layout/Base'
import Header from '../Components/Header'
import AddPatientForm from '../Components/AddPatientForm'
function AddPatient() {
    return (
        <Fragment>
          <Base>
            <Header title={"Add Patient"}></Header>
            <AddPatientForm/>
          </Base>
        </Fragment>
      )
    }

export default AddPatient