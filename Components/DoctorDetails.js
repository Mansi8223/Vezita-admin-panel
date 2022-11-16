import React, { useEffect, useState } from 'react'
import DoctorsProfile from './DoctorsProfile'
import DoctorsServices from './DoctorsServices'
import ContactDoctors from './ContactDoctors'
import DoctorsReview from './DoctorsReview'
import styles from '../styles/css/PatientDetails.module.css'
import { useRouter } from 'next/router'
import {getOnBoardFromCookie} from '../auth/userCookies';
import Loader from './Loader'
function DoctorDetails() {
  const router = useRouter();
  const Id = router.query["id"];
  const[data,setData]=useState("")
  const[services,setServices]=useState("")
  const[info,setInfo]=useState("")
  const[loading,setLoading]=useState(false)
  useEffect(()=>{
    setLoading(true)
    var token = getOnBoardFromCookie()
      var myHeaders = new Headers();
      myHeaders.append("token", token);

    var requestOptions = {
      headers: myHeaders,
      method: 'GET',
      redirect: 'follow'
      
    };
    
    fetch(`https://vezita-backend.herokuapp.com/api/v1/docter/single/${Id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        var res = JSON.parse(result);
        // console.log(res.docter)
        setData(res.docter)
        setServices(res.docter.service)
        setInfo(res.docter.establishment[0])
        setLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  },[])
  return (
    <>{loading?<Loader loading={loading}/>:<>
        <div className={`col-11 ${styles["wrapper"]} d-flex d-flex-column d-align-start gap-6 mt-5 ml-7`}>
          <div className={`col-5 col-md-12 col-xl-9 col-xxl-5 d-flex d-flex-column d-align-center gap-6`}>
            <DoctorsProfile data={data}/>
            <DoctorsServices data={services}/>
          </div>
          <div className={`col-5 col-md-12 col-xl-9 col-xxl-5 d-flex d-flex-column d-align-center gap-6`}>
            <ContactDoctors data={info}/>
            <DoctorsReview data={data}/>
          </div>
        </div>
      </>}
    </>

  )
}

export default DoctorDetails