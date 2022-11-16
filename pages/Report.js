import React, { Fragment, useEffect } from 'react'
import Base from '../Layout/Base'
import Header from '../Components/Header'
import styles from '../styles/css/Report.module.css'
import { useState } from 'react'
import ConsultationTable from '../Components/ConsultationTable'
import DisputeTable from '../Components/DisputeTable'
import PatientDisputeTable from '../Components/PatientDisputeTable'
import {getOnBoardFromCookie} from '../auth/userCookies';
import Loader from '../Components/Loader'

function Report() {
  const[searchTerm, setSearchTerm]=useState("")
  const[disputeSearchTerm,setDisputeSearchTerm]=useState("")
  const[isActive, setIsActive]=useState(false);
  const[data,setData]=useState("")
  const[doctorDispute,setDoctorDispute]=useState("")
  const[patientDispute,setPatientDispute]=useState("")
  const[loading, setLoading]=useState(false)
  const[selected, setSelected]=useState("Doctors")
  const options = ['Doctors','Patients']
  var token = getOnBoardFromCookie()
  useEffect(()=>{
    setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("token", token);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://vezita-backend.herokuapp.com/api/v1/doctor-patient/docters", requestOptions)
        .then(response => response.text())
        .then(result => {
          var res = JSON.parse(result);
          // console.log(res.docters)
          setData(res.docters)
          setLoading(false)

        })
        .catch(error =>{ 
          // console.log('error', error)
          setLoading(false)
        });

      var myHeaders = new Headers();
      myHeaders.append("token", token);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`https://vezita-backend.herokuapp.com/api/v1/dispute/all-admin?disputeOf=docter`, requestOptions)
        .then(response => response.text())
        .then(result => {
          var res = JSON.parse(result);
          // console.log(res)
          setDoctorDispute(res.data)
          setLoading(false)

        })
        .catch(error =>{ 
          // console.log('error', error)
          setLoading(false)
        });

      var myHeaders = new Headers();
      myHeaders.append("token", token);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`https://vezita-backend.herokuapp.com/api/v1/dispute?disputeOf=user`, requestOptions)
        .then(response => response.text())
        .then(result => {
          var res = JSON.parse(result);
          setPatientDispute(res.disputes)
          setLoading(false)

        })
        .catch(error =>{ 
          // console.log('error', error)
          setLoading(false)
        });
  },[])
  return (
    <>
      {loading?<Loader loading={loading}/>:<Fragment>
          <Base>
              <Header title="Reports"></Header>
              <div className={`${styles["wrapper"]} col-10 col-md-12 col-lg-12 col-xl-9 col-xxl-9 pr-5 mt-5 ml-3 pl-5 mb-3 d-flex d-flex-row d-align-center d-justify-space-between`}>
                <div className={`col-2 d-flex d-align-start d-justify-space-between gap-4 ml-5 mt-5`}>
                  <h3 className={`l-32 f-600 text-darker`}>Consultations</h3>
                </div>
                <div className={`d-flex d-flex-row gap-3`}>
                  <div className={`d-flex d-flex-row d-align-center gap-3 pl-2 pr-2 bg-grey1 rounded-8`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.775 20.6848L17.6204 16.539C19.0867 14.793 19.8225 12.5481 19.6742 10.2727C19.5259 7.99733 18.5051 5.86701 16.8247 4.32609C15.1442 2.78517 12.9338 1.95262 10.6546 2.00208C8.37531 2.05155 6.20313 2.9792 4.59107 4.59157C2.97901 6.20394 2.05154 8.37653 2.00208 10.6562C1.95263 12.9359 2.78502 15.1467 4.32565 16.8275C5.86627 18.5083 7.99618 19.5293 10.2712 19.6776C12.5461 19.8259 14.7905 19.09 16.5362 17.6234L20.6812 21.7788C20.8279 21.9207 21.024 22 21.2281 22C21.4322 22 21.6283 21.9207 21.775 21.7788C21.9191 21.6332 22 21.4366 22 21.2318C22 21.0269 21.9191 20.8303 21.775 20.6848ZM3.57356 10.8673C3.57356 9.42483 4.00123 8.01471 4.80249 6.8153C5.60376 5.61589 6.74263 4.68107 8.07509 4.12904C9.40754 3.57701 10.8737 3.43258 12.2883 3.714C13.7028 3.99542 15.0021 4.69006 16.0219 5.71007C17.0418 6.73008 17.7363 8.02966 18.0176 9.44446C18.299 10.8593 18.1546 12.3257 17.6027 13.6584C17.0507 14.9912 16.1161 16.1302 14.9169 16.9317C13.7177 17.7331 12.3079 18.1608 10.8656 18.1608C8.93244 18.1583 7.07915 17.3891 5.71216 16.0218C4.34518 14.6546 3.57609 12.8009 3.57356 10.8673Z" fill="#7F8C8D"/>
                    </svg>
                    <input className={`${styles["search-input"]}`} type='text' value={searchTerm} placeholder='Search' onChange={(e)=>setSearchTerm(e.target.value)}/>
                  </div> 
                  <div className={`bg-grey1 rounded-8 pl-2 pr-1`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.125 12C19.125 12.2984 19.0065 12.5845 18.7955 12.7955C18.5845 13.0065 18.2984 13.125 18 13.125H6C5.70163 13.125 5.41548 13.0065 5.2045 12.7955C4.99353 12.5845 4.875 12.2984 4.875 12C4.875 11.7016 4.99353 11.4155 5.2045 11.2045C5.41548 10.9935 5.70163 10.875 6 10.875H18C18.2984 10.875 18.5845 10.9935 18.7955 11.2045C19.0065 11.4155 19.125 11.7016 19.125 12ZM21.75 6.375H2.25C1.95163 6.375 1.66548 6.49353 1.4545 6.7045C1.24353 6.91548 1.125 7.20163 1.125 7.5C1.125 7.79837 1.24353 8.08452 1.4545 8.2955C1.66548 8.50647 1.95163 8.625 2.25 8.625H21.75C22.0484 8.625 22.3345 8.50647 22.5455 8.2955C22.7565 8.08452 22.875 7.79837 22.875 7.5C22.875 7.20163 22.7565 6.91548 22.5455 6.7045C22.3345 6.49353 22.0484 6.375 21.75 6.375ZM14.25 15.375H9.75C9.45163 15.375 9.16548 15.4935 8.9545 15.7045C8.74353 15.9155 8.625 16.2016 8.625 16.5C8.625 16.7984 8.74353 17.0845 8.9545 17.2955C9.16548 17.5065 9.45163 17.625 9.75 17.625H14.25C14.5484 17.625 14.8345 17.5065 15.0455 17.2955C15.2565 17.0845 15.375 16.7984 15.375 16.5C15.375 16.2016 15.2565 15.9155 15.0455 15.7045C14.8345 15.4935 14.5484 15.375 14.25 15.375Z" fill="#7F8C8D"/>
                    </svg>
                  </div>
                </div>
              </div>
              <ConsultationTable data={data} searchTerm={searchTerm}/>
              <div className={`${styles["wrapper"]} col-10 col-md-12 col-lg-12 col-xl-9 col-xxl-9 pr-5 mt-5 ml-3 pl-5 mb-3 d-flex d-flex-row d-align-center d-justify-space-between`}>
                <div className={`col-2 d-flex d-align-start d-justify-space-between gap-4 ml-5 mt-5`}>
                  <h3 className={`l-32 f-600 text-darker`}>Disputes</h3>
                  <div className={`col-6 p-relative`}>
                      <div className={`col-12 p-relative d-flex d-flex-row d-justify-space-between gap-1 bg-white border-medium-grey rounded-8 pl-2 pr-2 pt-1 pb-1`}onClick={()=>setIsActive(!isActive)}>
                          <h6 className={`f-500 l-22 text-black`}>{selected}</h6>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 8L8 12L12 8" stroke="#2D2D2D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                      </div>
                      {isActive && (
                          <div className={`${styles["dropdown-content"]} col-12 p-absolute bg-light-grey p-1 rounded-8`}>
                          {options.map((option,index) =>(
                              <div className={`d-flex d-justify-center pointer`} key={index+1} onClick={(e)=>{
                                setSelected(option)
                                setIsActive(false)}}>
                                  <h6 className={`f-500 l-22 text-black pt-1 pb-1`}>{option}</h6>
                              </div>
                          ))}
                          </div>
                      )}
                  </div>
                </div>
                <div className={`d-flex d-flex-row gap-3`}>
                  <div className={`d-flex d-flex-row d-align-center gap-3 pl-2 pr-2 bg-grey1 rounded-8`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.775 20.6848L17.6204 16.539C19.0867 14.793 19.8225 12.5481 19.6742 10.2727C19.5259 7.99733 18.5051 5.86701 16.8247 4.32609C15.1442 2.78517 12.9338 1.95262 10.6546 2.00208C8.37531 2.05155 6.20313 2.9792 4.59107 4.59157C2.97901 6.20394 2.05154 8.37653 2.00208 10.6562C1.95263 12.9359 2.78502 15.1467 4.32565 16.8275C5.86627 18.5083 7.99618 19.5293 10.2712 19.6776C12.5461 19.8259 14.7905 19.09 16.5362 17.6234L20.6812 21.7788C20.8279 21.9207 21.024 22 21.2281 22C21.4322 22 21.6283 21.9207 21.775 21.7788C21.9191 21.6332 22 21.4366 22 21.2318C22 21.0269 21.9191 20.8303 21.775 20.6848ZM3.57356 10.8673C3.57356 9.42483 4.00123 8.01471 4.80249 6.8153C5.60376 5.61589 6.74263 4.68107 8.07509 4.12904C9.40754 3.57701 10.8737 3.43258 12.2883 3.714C13.7028 3.99542 15.0021 4.69006 16.0219 5.71007C17.0418 6.73008 17.7363 8.02966 18.0176 9.44446C18.299 10.8593 18.1546 12.3257 17.6027 13.6584C17.0507 14.9912 16.1161 16.1302 14.9169 16.9317C13.7177 17.7331 12.3079 18.1608 10.8656 18.1608C8.93244 18.1583 7.07915 17.3891 5.71216 16.0218C4.34518 14.6546 3.57609 12.8009 3.57356 10.8673Z" fill="#7F8C8D"/>
                    </svg>
                    <input className={`${styles["search-input"]}`} type='text' value={disputeSearchTerm} placeholder='Search' onChange={(e)=>setDisputeSearchTerm(e.target.value)}/>
                  </div> 
                  <div className={`bg-grey1 rounded-8 pl-2 pr-1`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.125 12C19.125 12.2984 19.0065 12.5845 18.7955 12.7955C18.5845 13.0065 18.2984 13.125 18 13.125H6C5.70163 13.125 5.41548 13.0065 5.2045 12.7955C4.99353 12.5845 4.875 12.2984 4.875 12C4.875 11.7016 4.99353 11.4155 5.2045 11.2045C5.41548 10.9935 5.70163 10.875 6 10.875H18C18.2984 10.875 18.5845 10.9935 18.7955 11.2045C19.0065 11.4155 19.125 11.7016 19.125 12ZM21.75 6.375H2.25C1.95163 6.375 1.66548 6.49353 1.4545 6.7045C1.24353 6.91548 1.125 7.20163 1.125 7.5C1.125 7.79837 1.24353 8.08452 1.4545 8.2955C1.66548 8.50647 1.95163 8.625 2.25 8.625H21.75C22.0484 8.625 22.3345 8.50647 22.5455 8.2955C22.7565 8.08452 22.875 7.79837 22.875 7.5C22.875 7.20163 22.7565 6.91548 22.5455 6.7045C22.3345 6.49353 22.0484 6.375 21.75 6.375ZM14.25 15.375H9.75C9.45163 15.375 9.16548 15.4935 8.9545 15.7045C8.74353 15.9155 8.625 16.2016 8.625 16.5C8.625 16.7984 8.74353 17.0845 8.9545 17.2955C9.16548 17.5065 9.45163 17.625 9.75 17.625H14.25C14.5484 17.625 14.8345 17.5065 15.0455 17.2955C15.2565 17.0845 15.375 16.7984 15.375 16.5C15.375 16.2016 15.2565 15.9155 15.0455 15.7045C14.8345 15.4935 14.5484 15.375 14.25 15.375Z" fill="#7F8C8D"/>
                    </svg>
                  </div>
                </div>
              </div>
              {selected==="Doctors"?<DisputeTable data={doctorDispute} searchTerm={disputeSearchTerm}/>:<PatientDisputeTable data={patientDispute} searchTerm={disputeSearchTerm}/>}
          </Base>
      </Fragment>}
    </>
  )
}

export default Report