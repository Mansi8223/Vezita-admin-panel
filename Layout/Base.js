import React from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import style from '../styles/css/Base.module.css'
function Base(props) {
  return (
    <div className="row d-flex d-flex-row">
        <div className="d-flex">
          <Sidebar></Sidebar>
          <main className={`${style["main-class2"]} col-12`}>
            {props.children}
          </main>
        </div>
    </div>
  )
}

export default Base