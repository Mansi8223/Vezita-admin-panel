import React, { Fragment } from 'react'
import DoctorsChat from '../Components/DoctorsChat'
import Header from '../Components/Header'
import Base from '../Layout/Base'

function Messages() {
  return (
    <Fragment>
      <Base>
        <Header title="Disputes"></Header>
        <DoctorsChat/>
      </Base>
    </Fragment>
  )
}

export default Messages