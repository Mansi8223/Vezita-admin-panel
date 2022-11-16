import React from 'react'
import RingLoader from 'react-spinners/RingLoader'
import styles from '../styles/css/Loader.module.css'
function Loader({loading}) {
    return (
        <div className={`${styles["loader"]}`}>
            <RingLoader color={'#3085F4'} loading={loading} size={100} />
        </div>
    )
}

export default Loader