import React, { Fragment } from 'react'
import AddData from '../Components/AddData'
import Header from '../Components/Header'
import Base from '../Layout/Base'

function UpdateData() {
  return (
    <Fragment>
      <Base>
        <Header title="Update Data"></Header>
        <AddData/>
      </Base>
    </Fragment>
  )
}

export default UpdateData