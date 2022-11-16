import React, { useState } from 'react'
import styles from '../styles/css/AddDoctorForm.module.css'
function AddDoctorForm() {
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[speciality,setSpeciality]=useState("")
    const[degree, setDegree]=useState("")
    const[address, setAddress]=useState("")
    const[number, setNumber]=useState("")
    const nameHandler=(e)=>{
        setName(e.target.value)
    }
    const emailHandler=(e)=>{
        setEmail(e.target.value)
    }
    const passwordHandler=(e)=>{
        setPassword(e.target.value)
    }
    const specialityHandler=(e)=>{
        setSpeciality(e.target.value)
    }
    const degreeHandler=(e)=>{
        setDegree(e.target.value)
    }
    const addressHandler=(e)=>{
        setAddress(e.target.value)
    }
    const numberHandler=(e)=>{
        setNumber(e.target.value)
    }
    const formSubmit=(e)=>{
        e.preventDefault();
    }
  return (
    <form onSubmit={formSubmit} className={`col-9 col-md-11 col-xl-8 ${styles["wrapper"]} ml-12 d-flex d-flex-column d-align-start gap-5`}>
        <div className={`col-12 pr-5 d-flex d-justify-end mt-5`}>
          <button type='submit' className={`btn-save`}>
            Save
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1209 7.84638 17.2635 5.78216 15.7407 4.25932C14.2178 2.73648 12.1536 1.87913 10 1.875ZM13.8672 8.57812L9.28907 12.9531C9.17071 13.0645 9.01406 13.126 8.85157 13.125C8.77214 13.1261 8.69328 13.1115 8.61953 13.082C8.54578 13.0525 8.47861 13.0087 8.42188 12.9531L6.13282 10.7656C6.06933 10.7102 6.01769 10.6426 5.98102 10.5667C5.94434 10.4909 5.92338 10.4084 5.9194 10.3242C5.91542 10.24 5.92849 10.1559 5.95784 10.077C5.98719 9.99798 6.03221 9.92575 6.09019 9.86461C6.14816 9.80347 6.2179 9.75469 6.29522 9.72119C6.37253 9.68769 6.45582 9.67017 6.54007 9.66968C6.62433 9.66919 6.70781 9.68574 6.78551 9.71834C6.86321 9.75094 6.93351 9.79891 6.99219 9.85938L8.85157 11.6328L13.0078 7.67188C13.1293 7.56585 13.2871 7.51091 13.4482 7.51853C13.6093 7.52615 13.7612 7.59575 13.8722 7.71277C13.9832 7.8298 14.0446 7.98519 14.0437 8.14646C14.0428 8.30773 13.9795 8.4624 13.8672 8.57812Z" fill="#186ADE"/>
            </svg>
          </button>
        </div>
        <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
            <h6 className={`f-600 l-20 text-darker`}>Name</h6>
            <input className={`${styles['input']} col-5 pl-4 pr-4 pt-3 pb-3 bg-light-grey rounded-8 border-none`} type="text" value={name} placeholder="Enter your name" onChange={nameHandler}/>
        </div>
        <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
            <h6 className={`f-600 l-20 text-darker`}>Email id</h6>
            <input className={`${styles['input']} col-5 pl-4 pr-4 pt-3 pb-3 bg-light-grey rounded-8 border-none`} type="email" value={email} placeholder="Enter your email" onChange={emailHandler}/>
        </div>
        <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
            <h6 className={`f-600 l-20 text-darker`}>Password</h6>
            <input className={`${styles['input']} col-5 pl-4 pr-4 pt-3 pb-3 bg-light-grey rounded-8 border-none`} type="text" value={password} placeholder="Enter your password" onChange={passwordHandler}/>
        </div>
        <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
            <h6 className={`f-600 l-20 text-darker`}>Speciality</h6>
            <input className={`${styles['input']} col-5 pl-4 pr-4 pt-3 pb-3 bg-light-grey rounded-8 border-none`} type="text" value={speciality} placeholder="Enter text" onChange={specialityHandler}/>
        </div>
        <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
            <h6 className={`f-600 l-20 text-darker`}>Degree</h6>
            <input className={`${styles['input']} col-5 pl-4 pr-4 pt-3 pb-3 bg-light-grey rounded-8 border-none`} type="text" value={degree} placeholder="Enter text" onChange={degreeHandler}/>
        </div>
        <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
            <h6 className={`f-600 l-20 text-darker`}>Address</h6>
            <input className={`${styles['input']} col-5 pl-4 pr-4 pt-3 pb-3 bg-light-grey rounded-8 border-none`} type="text" value={address} placeholder="Enter your address" onChange={addressHandler}/>
        </div>
        <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
            <h6 className={`f-600 l-20 text-darker`}>Phone no.</h6>
            <input className={`${styles['input']} col-5 pl-4 pr-4 pt-3 pb-3 bg-light-grey rounded-8 border-none`} type="tel" value={number} placeholder="Enter your number" onChange={numberHandler}/>
        </div>
    </form>
  )
}

export default AddDoctorForm