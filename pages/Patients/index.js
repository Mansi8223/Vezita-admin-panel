import React, { Fragment, useEffect } from 'react'
import Base from '../../Layout/Base'
import Header from '../../Components/Header'
import styles from '../../styles/css/Report.module.css'
import { useState } from 'react'
import Link from 'next/link'
import PatientsTable from '../../Components/PatientsTable'
import {getOnBoardFromCookie} from '../../auth/userCookies';
import Loader from '../../Components/Loader'
function Patients() {
    const[searchTerm, setSearchTerm]=useState("")
    const[data,setData]=useState("")
    const[loading,setLoading]=useState(false)
    useEffect(()=>{
      setLoading(true)
      var token = getOnBoardFromCookie()
      var myHeaders = new Headers();
      myHeaders.append("token",token);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://vezita-backend.herokuapp.com/api/v1/patient/admin", requestOptions)
        .then(response => response.text())
        .then(result => {
          var res = JSON.parse(result);
          // console.log(res.patients)
          setData(res.patients)
          setLoading(false)
        })
        .catch(error => {
          console.log('error', error)
          setLoading(false)
        });
    },[])
    return (
      <>
        {loading?<Loader loading={loading}/>:<Fragment>
            <Base>
                <Header title="Patients"></Header>
                <div className={`col-10 col-md-12 col-xl-9 buttons d-flex d-justify-end gap-2 pr-1 mt-5`}>
                  <div className='border-none bg-blue d-flex d-align-center pt-3 pb-3 pl-5 pr-5 rounded-100'>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.8125 8C15.8125 8.24864 15.7137 8.4871 15.5379 8.66291C15.3621 8.83873 15.1236 8.9375 14.875 8.9375H8.9375V14.875C8.9375 15.1236 8.83873 15.3621 8.66291 15.5379C8.4871 15.7137 8.24864 15.8125 8 15.8125C7.75136 15.8125 7.5129 15.7137 7.33709 15.5379C7.16127 15.3621 7.0625 15.1236 7.0625 14.875V8.9375H1.125C0.87636 8.9375 0.637903 8.83873 0.462087 8.66291C0.286272 8.4871 0.1875 8.24864 0.1875 8C0.1875 7.75136 0.286272 7.5129 0.462087 7.33709C0.637903 7.16127 0.87636 7.0625 1.125 7.0625H7.0625V1.125C7.0625 0.87636 7.16127 0.637903 7.33709 0.462087C7.5129 0.286272 7.75136 0.1875 8 0.1875C8.24864 0.1875 8.4871 0.286272 8.66291 0.462087C8.83873 0.637903 8.9375 0.87636 8.9375 1.125V7.0625H14.875C15.1236 7.0625 15.3621 7.16127 15.5379 7.33709C15.7137 7.5129 15.8125 7.75136 15.8125 8Z" fill="white"/>
                      </svg>
                      <Link href='/AddPatient'><h5 className='ml-2 f-500 l-22 text-white'>Add Patients</h5></Link>
                  </div>
                </div>
                <div className={`${styles["wrapper"]} col-10 col-md-12 col-lg-12 col-xl-9 col-xxl-9 pr-5 mt-5 ml-3 pl-5 mb-3 d-flex d-flex-row d-justify-end`}>
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
                <PatientsTable data={data} searchTerm={searchTerm} />
            </Base>
        </Fragment>}
      </>
    )
}

export default Patients