import React from 'react'
import { Fragment } from 'react'
import Base from '../Layout/Base'
import Header from '../Components/Header'
import EditSubscription from '../Components/EditSubscription'

function Subscription() {
    return (
        <Fragment>
          <Base>
            <Header title="Subscription"></Header>
                <EditSubscription/>
          </Base>
        </Fragment>
      )
}

export default Subscription