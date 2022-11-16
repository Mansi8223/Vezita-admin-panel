import React from 'react'
import { useState } from 'react'
import { useRef } from 'react';
import {getOnBoardFromCookie} from '../../auth/userCookies';
import Loader from '../Loader'
function ProfileEditModalContent(props) {
    const fileInputRef = useRef();
    const[url, setUrl]=useState(props.data.avatar)
    const[name, setName]=useState(props.data.name)
    const[loading,setLoading]=useState(false)
    var token = getOnBoardFromCookie()
    
    const fileHandler=(e)=>{
        const file = e.target.files[0];
        if(file&& file.type.substr(0,5)=== "image"){
            setUrl(e.target.files[0])
        }
    }
    const nameHandler=(e)=>{
        setName(e.target.value)
    }
    const submitHandler=(e)=>{
        setLoading(true)
        e.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("token", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "name": name,
        "avatar":url
        });

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`https://vezita-backend.herokuapp.com/api/v1/user/update/${props.id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            // console.log(result)
            props.handler()
            setLoading(false)
        })
        .catch(error => {
            console.log('error', error)
            setLoading(false)
        });
    }
  return (
    <>
        {loading?<Loader loading={loading}/>:<div className={`col-12 d-flex d-flex-column d-align-start`}>
            <h2 className={`f-600 l-32 text-black`}>Profile</h2>
            <form className={`col-12 d-flex d-flex-column`} onSubmit={submitHandler}>
                <div>
                    <div onClick={(event)=>{
                        event.preventDefault();
                        fileInputRef.current.click();
                        }} className={`col-12 d-flex d-justify-center mb-5`}>
                        {url ? 
                        <div className={`p-relative d-flex d-flex-row d-align-end`}>
                                <img className={`w-100px h-100px d-flex d-justify-center rounded-100`} src={url}/>
                        </div>
                        :<div className={`p-relative d-flex d-flex-row d-align-end`}>
                            <div className={`d-flex d-justify-center p-5 bg-light-grey rounded-100`}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.0344 7.71564L14.7844 2.46564C14.6415 2.32635 14.4495 2.24889 14.25 2.25001H5.25C4.85218 2.25001 4.47064 2.40805 4.18934 2.68935C3.90804 2.97066 3.75 3.35219 3.75 3.75001V20.25C3.75 20.6478 3.90804 21.0294 4.18934 21.3107C4.47064 21.592 4.85218 21.75 5.25 21.75H18.75C19.1478 21.75 19.5294 21.592 19.8107 21.3107C20.092 21.0294 20.25 20.6478 20.25 20.25V8.25001C20.2511 8.05048 20.1737 7.85851 20.0344 7.71564ZM14.25 15H12.75V16.5C12.75 16.6989 12.671 16.8897 12.5303 17.0303C12.3897 17.171 12.1989 17.25 12 17.25C11.8011 17.25 11.6103 17.171 11.4697 17.0303C11.329 16.8897 11.25 16.6989 11.25 16.5V15H9.75C9.55109 15 9.36032 14.921 9.21967 14.7803C9.07902 14.6397 9 14.4489 9 14.25C9 14.0511 9.07902 13.8603 9.21967 13.7197C9.36032 13.579 9.55109 13.5 9.75 13.5H11.25V12C11.25 11.8011 11.329 11.6103 11.4697 11.4697C11.6103 11.329 11.8011 11.25 12 11.25C12.1989 11.25 12.3897 11.329 12.5303 11.4697C12.671 11.6103 12.75 11.8011 12.75 12V13.5H14.25C14.4489 13.5 14.6397 13.579 14.7803 13.7197C14.921 13.8603 15 14.0511 15 14.25C15 14.4489 14.921 14.6397 14.7803 14.7803C14.6397 14.921 14.4489 15 14.25 15ZM14.25 8.25001V4.05939L18.4406 8.25001H14.25Z" fill="#82829B"/>
                                </svg>
                            </div>
                        </div>}
                    </div>
                    <input type="file" name='images' style={{display: 'none'}} ref={fileInputRef} accept='images/*' onChange={fileHandler}/>
                </div>
                <div className={`col-12 d-flex d-flex-column gap-5 mt-5`}>
                    <div className={`col-12 d-flex d-flex-row d-align-center gap-5`}>
                        <h3 className={` f-500 l-28 text-darker`}>Name</h3>
                        <input className={`col-9 f-400 font-20 l-28 text-dark-grey border-none bg-light-grey outline-none rounded-8 pl-3 pr-3 pt-2 pb-2`} type='text' placeholder="Enter name" value={name} onChange={nameHandler}/>
                    </div>
                    <button type='submit' className={`col-4 self-center btn`}>Send</button>
                </div>
            </form>
        </div>}
    </>
  )
}

export default ProfileEditModalContent