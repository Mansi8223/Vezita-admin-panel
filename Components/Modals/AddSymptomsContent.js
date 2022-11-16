import React from 'react'
import { useState } from 'react'
import {getOnBoardFromCookie} from '../../auth/userCookies';
import Loader from '../Loader';
import styles from '../../styles/css/AddSymptomsContent.module.css'
import { useEffect } from 'react'
function AddSymptomsContent(props) {
  const[val,setVal]=useState("")
  const[loading,setLoading]=useState(false)
  const[isActive, setIsActive]=useState(false);
  const[selected, setSelected]=useState("Select")
  const[id,setId]=useState("")
  const[data,setData]=useState("")
  
  var token = getOnBoardFromCookie()

  useEffect(()=>{
    setLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("token",token);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://vezita-backend.herokuapp.com/api/v1/service/specializations", requestOptions)
        .then(response => response.text())
        .then(result => {
            var res = JSON.parse(result);
            // console.log(res.specialization)
            setData(res.specialization)
            setLoading(false)
        })
        .catch(error =>{ 
            console.log('error', error)
            setLoading(false)
        });
   },[])
   
  const valHandler=(e)=>setVal(e.target.value)

  const closeHandler=(e)=>{
    setLoading(true)
    e.preventDefault()
    if(val&&id){
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "name": val,
      "specialization": id,
      "icon": "https://t3.ftcdn.net/jpg/03/09/73/98/360_F_309739884_cGZIpEsHXWPZvo44VL0L1HtGRFmqUruw.jpg"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://vezita-backend.herokuapp.com/api/v1/service/new", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        props.handler()
        props.trigger()
        setLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });}
      else{
        props.handler()
        setLoading(false)
      }
  }
  return (
    <>
      {loading?<Loader loading={loading}/>:<div className={`col-12 d-flex d-flex-column gap-2`}>
          <h2 className={`f-600 l-32 text-black`}>Add Symptoms</h2>
          <form onSubmit={closeHandler} className={`col-12 d-flex d-flex-column d-align-start gap-4 `}>
            <div className={`self-center d-flex d-align-center d-justify-center bg-light-grey p-4 rounded-100`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.0344 7.71564L14.7844 2.46564C14.6415 2.32635 14.4495 2.24889 14.25 2.25001H5.25C4.85218 2.25001 4.47064 2.40805 4.18934 2.68935C3.90804 2.97066 3.75 3.35219 3.75 3.75001V20.25C3.75 20.6478 3.90804 21.0294 4.18934 21.3107C4.47064 21.592 4.85218 21.75 5.25 21.75H18.75C19.1478 21.75 19.5294 21.592 19.8107 21.3107C20.092 21.0294 20.25 20.6478 20.25 20.25V8.25001C20.2511 8.05048 20.1737 7.85851 20.0344 7.71564ZM14.25 15H12.75V16.5C12.75 16.6989 12.671 16.8897 12.5303 17.0303C12.3897 17.171 12.1989 17.25 12 17.25C11.8011 17.25 11.6103 17.171 11.4697 17.0303C11.329 16.8897 11.25 16.6989 11.25 16.5V15H9.75C9.55109 15 9.36032 14.921 9.21967 14.7803C9.07902 14.6397 9 14.4489 9 14.25C9 14.0511 9.07902 13.8603 9.21967 13.7197C9.36032 13.579 9.55109 13.5 9.75 13.5H11.25V12C11.25 11.8011 11.329 11.6103 11.4697 11.4697C11.6103 11.329 11.8011 11.25 12 11.25C12.1989 11.25 12.3897 11.329 12.5303 11.4697C12.671 11.6103 12.75 11.8011 12.75 12V13.5H14.25C14.4489 13.5 14.6397 13.579 14.7803 13.7197C14.921 13.8603 15 14.0511 15 14.25C15 14.4489 14.921 14.6397 14.7803 14.7803C14.6397 14.921 14.4489 15 14.25 15ZM14.25 8.25001V4.05939L18.4406 8.25001H14.25Z" fill="#82829B"/>
              </svg>
            </div>
            <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between`}>
              <h6 className={`f-500 l-22 text-black`}>Name</h6>
              <input className={`col-8 f-700 l-22 border-none bg-light-grey rounded-8 pl-3 pr-3 pt-2 pb-2 outline-none`} placeholder="Enter Symptom" value={val} onChange={valHandler}/>               
            </div>
            <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between`}>    
              <h6 className={`f-500 l-22 text-black`}>Specialization</h6>
              <div className={`col-8 p-relative`}>
                <div className={`col-12 p-relative d-flex d-flex-row d-justify-space-between gap-1 bg-white border-medium-grey rounded-8 pl-2 pr-2 pt-1 pb-1`}onClick={()=>setIsActive(!isActive)}>
                    <h6 className={`f-500 l-22 text-black`}>{selected}</h6>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 8L8 12L12 8" stroke="#2D2D2D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                {isActive && (
                    <div className={`${styles["dropdown-content"]} col-12 p-absolute bg-light-grey p-1 rounded-8`}>
                    {data && data.map((option,index) =>(
                        <div className={`col-12 d-flex pt-1 d-justify-center`} key={index+1} onClick={(e)=>{
                          setId(option._id)
                          setSelected(option.name)
                          setIsActive(false)
                          }}>
                            <h6 className={`f-500 l-22 text-black`}>{option.name}</h6>
                        </div>
                    ))}
                    </div>
                )}
              </div>
            </div>             
            <button type='submit' className={`col-4 self-center btn`}>Send</button>
          </form>
      </div>}
    </>
  )
}

export default AddSymptomsContent