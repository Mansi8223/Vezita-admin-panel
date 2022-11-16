import React from 'react'
import { Fragment } from 'react'
import Base from '../Layout/Base'
import Header from '../Components/Header'
import AddCouponForm from '../Components/AddCouponForm'

function Coupons() {
  return (
    <Fragment>
      <Base>
            <Header title={"Add Coupon"}></Header>
            <AddCouponForm/>
      </Base>
    </Fragment>
  )
}

export default Coupons