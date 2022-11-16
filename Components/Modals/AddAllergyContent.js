import React from 'react'
import { useState } from 'react'
import {getOnBoardFromCookie} from '../../auth/userCookies';
import Loader from '../Loader';

function AddAllergyContent(props) {
    const[val,setVal]=useState("")
    const[loading,setLoading]=useState(false)
    var token = getOnBoardFromCookie()
    const valHandler=(e)=>setVal(e.target.value)
    const closeHandler=(e)=>{
        if(val){
            setLoading(true)
            e.preventDefault()
            var myHeaders = new Headers();
            myHeaders.append("token", token);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "name": val
            });

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("https://vezita-backend.herokuapp.com/api/v1/medical-data/allergy", requestOptions)
            .then(response => response.text())
            .then(result => {
                // console.log(result)
                props.handler()
                props.trigger()
                setLoading(false)
            })
            .catch(error => {
                console.log('error', error)
                setLoading(false)
            });
        }
        else{
            props.handler()
            setLoading(false)
        }
    }
  return (
    <>
        {loading?<Loader loading={loading}/>:<div className={`col-12 d-flex d-flex-column gap-2`}>
            <h2 className={`f-600 l-32 text-black`}>Add Allergy</h2>
            <form onSubmit={closeHandler} className={`col-12 d-flex d-flex-column gap-3 pr-1`}>
                <input className={`f-700 l-22 border-none bg-light-grey rounded-8 p-5 outline-none`} placeholder="Enter Allergy" value={val} onChange={valHandler}/>
                <button type='submit' className={`col-4 self-center btn`}>Send</button>
            </form>
        </div>}
    </>
  )
}

export default AddAllergyContent