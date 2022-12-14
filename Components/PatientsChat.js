import React from 'react'
import { Avatar } from '@material-ui/core'
import ChatScreen from './ChatScreen'
import Link from 'next/link'
import styles from '../styles/css/Chats.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import {getOnBoardFromCookie} from '../auth/userCookies';
import Loader from './Loader'

function PatientsChat() {
    const[searchTerm,setSearchTerm]=useState("")
    const[data,setData]=useState("")
    const[loading, setLoading]=useState(false)
    var token = getOnBoardFromCookie()
    useEffect(()=>{
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
            setData(res.disputes)
            setLoading(false)
            })
            .catch(error =>{ 
            // console.log('error', error)
            setLoading(false)
            });
    },[])
  return (
    <>
        {loading?<Loader loading={loading}/>:<div className={`col-9 d-flex d-flex-row p-5 bg-white mt-12 ml-7 rounded-16`}>
            <div className={`col-5 d-flex d-flex-column d-align-start gap-5`}>
                <div className={`col-11 d-flex d-flex-row d-align-center gap-8`}>   
                    <Link href='/Messages'>
                        <div className={`d-flex d-flex-row d-align-center gap-1 pb-2`}>
                            <h2 className={`f-500 l-28 text-dark-grey`}>Doctor</h2>
                            <h3 className={`${styles["header-circle"]} d-flex d-align-center d-justify-center rounded-100 bg-red f-700 l-28 text-light-grey`}>2</h3>
                        </div> 
                    </Link>
                    <div className={`d-flex d-flex-row d-align-center gap-1 pb-2 border-bottom-primary`}>
                        <h2 className={`f-500 l-28 text-darker`}>Patient</h2>
                        <h3 className={`${styles["header-circle"]} d-flex d-align-center d-justify-center rounded-100 bg-red f-700 l-28 text-light-grey`}>2</h3>
                    </div> 
                </div>
                <div className={`col-11 d-flex d-flex-row gap-2 pl-4 pr-4 pt-3 pb-3 bg-light-grey rounded-8`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.775 20.6848L17.6204 16.539C19.0867 14.793 19.8225 12.5481 19.6742 10.2727C19.5259 7.99733 18.5051 5.86701 16.8247 4.32609C15.1442 2.78517 12.9338 1.95262 10.6546 2.00208C8.37531 2.05155 6.20313 2.9792 4.59107 4.59157C2.97901 6.20394 2.05154 8.37653 2.00208 10.6562C1.95263 12.9359 2.78502 15.1467 4.32565 16.8275C5.86627 18.5083 7.99618 19.5293 10.2712 19.6776C12.5461 19.8259 14.7905 19.09 16.5362 17.6234L20.6812 21.7788C20.8279 21.9207 21.024 22 21.2281 22C21.4322 22 21.6283 21.9207 21.775 21.7788C21.9191 21.6332 22 21.4366 22 21.2318C22 21.0269 21.9191 20.8303 21.775 20.6848ZM3.57356 10.8673C3.57356 9.42483 4.00123 8.01471 4.80249 6.8153C5.60376 5.61589 6.74263 4.68107 8.07509 4.12904C9.40754 3.57701 10.8737 3.43258 12.2883 3.714C13.7028 3.99542 15.0021 4.69006 16.0219 5.71007C17.0418 6.73008 17.7363 8.02966 18.0176 9.44446C18.299 10.8593 18.1546 12.3257 17.6027 13.6584C17.0507 14.9912 16.1161 16.1302 14.9169 16.9317C13.7177 17.7331 12.3079 18.1608 10.8656 18.1608C8.93244 18.1583 7.07915 17.3891 5.71216 16.0218C4.34518 14.6546 3.57609 12.8009 3.57356 10.8673Z" fill="#7F8C8D"/>
                    </svg>
                    <input className={`${styles["input"]} col-11 h-fit-content border-none bg-light-grey f-500 font-16 l-22 color-gray`} type='text' placeholder='Search in chats' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
                </div>
                <h5 className={`text-uppercase f-600 l-22 text-dark-grey`}>Recents</h5>
                <div className={`col-11 d-flex d-flex-column d-align-center gap-3`}>
                {data && data.filter((val)=>{
                    if(searchTerm == ""){
                    return val
                    }else if(val.user.name.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val
                    }
                    }).map((item,index)=>(<div  key={index+1} className={`col-12 d-flex d-flex-row d-align-start d-justify-space-between bg-blue-2 rounded-12 pl-4 pr-4 pt-3 pb-3 rounded-16 border-lighter-gray`}>
                        <div className='d-flex d-flex-row d-align-center gap-5'>
                            <Avatar src={item.user.avatar}/>
                            <div className={`d-flex d-flex-column d-align-start`}>
                                <h4 className={` f-600 l-26 text-darker`}>{item.user.name}</h4>
                                {/* <h4 className={` f-500 l-26 text-darker`}>You: Hii</h4> */}
                                <h4 className={` f-500 l-26 text-dark-grey`}>You: Hii</h4>
                            </div>
                        </div>
                        <div className={`d-flex d-flex-column d-align-center gap-2`}>
                            <span className={`font-12 f-600 l-14 text-darker-grey`}>6:10</span>
                            <span className={`${styles["circle"]} d-flex d-align-center d-justify-center rounded-100 bg-red font-12 f-600 l-14 text-light-grey`}>1</span>
                        </div>
                    </div>))}
                </div>
            </div>
            <ChatScreen/>
        </div>}
    </>
  )
}

export default PatientsChat