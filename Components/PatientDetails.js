import React, { useEffect } from 'react'
import PatientsProfile from './PatientsProfile'
import PatientsMoreDetail from './PatientsMoreDetail'
import Appointments from './Appointments'
import PatientNotes from './PatientNotes'
import PatientDocuments from './PatientDocuments'
import styles from '../styles/css/PatientDetails.module.css'
import {getOnBoardFromCookie} from '../auth/userCookies';
import { useRouter } from 'next/router'
import { useState } from 'react'
import Loader from './Loader'
function PatientDetails() {
  const router = useRouter();
  const Id = router.query["id"];
  var token = getOnBoardFromCookie()
  const[data,setData]=useState("")
  const[medData,setMedData]=useState("")
  const[doctDocs,setDoctDocs]=useState("")
  const[patDocs,setPatDocs]=useState("")
  const[notes,setNotes]=useState("")
  const[appointment, setAppointment]=useState("")
  const[loading,setLoading]=useState(false)
  useEffect(()=>{
     setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("token",token);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`https://vezita-backend.herokuapp.com/api/v1/patient/admin/${Id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
          var res = JSON.parse(result);
          // console.log(res.prevAppointments)
          setMedData(res.patientMedicalDetail)
          setData(res.patient)
          setDoctDocs(res.documentsByDocter)
          setPatDocs(res.documentsByPatient)
          setAppointment(res.prevAppointments)
          setNotes(res.notes)
          setLoading(false)
        })
        .catch(error => {
          console.log('error', error)
          setLoading(false)
        });
  },[])
  return (
    <>
      {loading?<Loader loading={loading}/>:<>
        <div className={`col-11 ${styles["wrapper"]} d-flex d-flex-column d-align-start gap-6 mt-5 ml-7`}>
          <div className={`col-5 col-md-12 col-xl-9 col-xxl-5 d-flex d-flex-column d-align-center gap-6`}>
            <PatientsProfile data={data} medData={medData}/>
            <PatientsMoreDetail data={medData}/>
            <PatientDocuments patDocs={patDocs} doctDocs={doctDocs}/>
          </div>
          <div className={`col-5 col-md-12 col-xl-9 col-xxl-5 d-flex d-flex-column d-align-center gap-6`}>
            <Appointments data={appointment}/>
            <PatientNotes data={notes}/>
          </div>
        </div>
      </>}
    </>
  )
}

export default PatientDetails