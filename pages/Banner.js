import React from 'react'
import { Fragment } from 'react'
import Base from '../Layout/Base'
import Header from '../Components/Header'
import VerifyBanners from '../Components/VerifyBanners'
function Banner() {
  return (
    <Fragment>
      <Base>
        <Header title="Banners"></Header>
            <VerifyBanners/>
      </Base>
    </Fragment>
  )
}

export default Banner