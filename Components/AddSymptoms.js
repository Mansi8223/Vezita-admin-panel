import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import {getOnBoardFromCookie} from '../auth/userCookies';
import Loader from './Loader'
import AddSymptomsContent from './Modals/AddSymptomsContent';
import AddSymptomsModal from './Modals/AddSymptomsModal';
function AddSymptoms() {
    const[data,setData]=useState("")
    const[searchTerm,setSearchTerm]=useState("")
    const[loading,setLoading]=useState(false)
    const[open,setOpen]=useState(false)
    var token = getOnBoardFromCookie()
    var Id = ""
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
                setData(res.specialization)
                setLoading(false)
            })
            .catch(error =>{ 
                console.log('error', error)
                setLoading(false)
            });
    },[])
    
    const searchHandler=(e)=>{
        setSearchTerm(e.target.value)
    } 
    const handler=()=>setOpen(prev => !prev)

    const triggerHandler=()=>{
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
                setData(res.specialization)
                setLoading(false)
            })
            .catch(error =>{ 
                console.log('error', error)
                setLoading(false)
            });
    }

    const deleteHandler=()=>{
        var myHeaders = new Headers();
        myHeaders.append("token", token);

        var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`https://vezita-backend.herokuapp.com/api/v1/service/${Id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
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
                    setData(res.specialization)
                    setLoading(false)
                })
                .catch(error =>{ 
                    console.log('error', error)
                    setLoading(false)
                });
        })
        .catch(error => console.log('error', error));
    }
    return (
        <>
            {loading?<Loader loading={loading}/>:<>
                <div className={`col-12 h-fit-content d-flex d-flex-column d-align-start gap-8 bg-subtle rounded-12 p-4`}>
                    <div className={`col-12 d-flex d-flex-row d-justify-space-between d-align-center`}>
                        <h3 className={`f-500 l-28 text-black`}>Symptoms</h3>
                        <div className={`d-flex d-flex-row d-align-center d-justify-space-between`}>
                            <div className={`col-10 border-bottom-line`}></div>
                            <div onClick={handler} className={`self-end d-flex d-flex-row d-align-center gap-2 bg-green pt-2 pb-2 pl-4 pr-3 rounded-100 pointer`}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H10.9375V16.875C10.9375 17.1236 10.8387 17.3621 10.6629 17.5379C10.4871 17.7137 10.2486 17.8125 10 17.8125C9.75136 17.8125 9.5129 17.7137 9.33709 17.5379C9.16127 17.3621 9.0625 17.1236 9.0625 16.875V10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H9.0625V3.125C9.0625 2.87636 9.16127 2.6379 9.33709 2.46209C9.5129 2.28627 9.75136 2.1875 10 2.1875C10.2486 2.1875 10.4871 2.28627 10.6629 2.46209C10.8387 2.6379 10.9375 2.87636 10.9375 3.125V9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z" fill="white"/>
                                </svg>
                                <h4 className={`f-600 l-26 text-white`}>Add</h4>
                            </div>
                        </div>
                    </div>
                    <div className={`col-6 col-md-6 col-lg-5 col-xxl-6 d-flex d-flex-column d-align-start gap-3`}>
                        <div className={`col-12 d-flex d-flex-row d-align-center gap-1 bg-light-grey rounded-8 p-3 mb-1`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.775 20.6848L17.6204 16.539C19.0867 14.793 19.8225 12.5481 19.6742 10.2727C19.5259 7.99733 18.5051 5.86701 16.8247 4.32609C15.1442 2.78517 12.9338 1.95262 10.6546 2.00208C8.37531 2.05155 6.20313 2.9792 4.59107 4.59157C2.97901 6.20394 2.05154 8.37653 2.00208 10.6562C1.95263 12.9359 2.78502 15.1467 4.32565 16.8275C5.86627 18.5083 7.99618 19.5293 10.2712 19.6776C12.5461 19.8259 14.7905 19.09 16.5362 17.6234L20.6812 21.7788C20.8279 21.9207 21.024 22 21.2281 22C21.4322 22 21.6283 21.9207 21.775 21.7788C21.9191 21.6332 22 21.4366 22 21.2318C22 21.0269 21.9191 20.8303 21.775 20.6848ZM3.57356 10.8673C3.57356 9.42483 4.00123 8.01471 4.80249 6.8153C5.60376 5.61589 6.74263 4.68107 8.07509 4.12904C9.40754 3.57701 10.8737 3.43258 12.2883 3.714C13.7028 3.99542 15.0021 4.69006 16.0219 5.71007C17.0418 6.73008 17.7363 8.02966 18.0176 9.44446C18.299 10.8593 18.1546 12.3257 17.6027 13.6584C17.0507 14.9912 16.1161 16.1302 14.9169 16.9317C13.7177 17.7331 12.3079 18.1608 10.8656 18.1608C8.93244 18.1583 7.07915 17.3891 5.71216 16.0218C4.34518 14.6546 3.57609 12.8009 3.57356 10.8673Z" fill="#7F8C8D"/>
                            </svg>
                            <input type="text" placeholder={`Search`} className={`search-input border-none`} value={searchTerm} onChange={searchHandler}/>
                        </div>
                        <div className={`col-12 d-flex d-flex-column d-align-start gap-3`}>
                        {data && data.filter((val)=>{
                            if(searchTerm == ""){
                            return val
                            }else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                            return val
                            }
                            }).map((item,index)=>(
                            <div key={index+1} className={`col-12 d-flex d-flex-column d-align-start gap-2`}>
                                {item.service.length>0&&<h5 className={`col-12 f-500 l-22 text-darker`}>{item.name}</h5>}
                                {item.service&&item.service.map((item,index)=>(
                                    <div key={index+1} className={`col-12 d-flex d-flex-row d-align-center gap-3`}>
                                        <div className={`col-12 d-flex d-flex-row d-align-center d-justify-center bg-white rounded-8 p-3`}>
                                            <h6 className={`f-500 l-20 text-darker-grey`}>{item.name}</h6>
                                        </div>
                                        <div onClick={()=>{
                                            Id = item._id
                                            deleteHandler()}} className={`d-flex d-justify-center bg-light-red rounded-100 p-2`}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20.25 4.5H16.5V3.75C16.4975 3.15402 16.2597 2.58316 15.8383 2.16174C15.4168 1.74031 14.846 1.50247 14.25 1.5H9.75C9.15402 1.50247 8.58316 1.74031 8.16174 2.16174C7.74031 2.58316 7.50247 3.15402 7.5 3.75V4.5H3.75C3.55109 4.5 3.36032 4.57902 3.21967 4.71967C3.07902 4.86032 3 5.05109 3 5.25C3 5.44891 3.07902 5.63968 3.21967 5.78033C3.36032 5.92098 3.55109 6 3.75 6H4.5V19.5C4.5 19.8978 4.65804 20.2794 4.93934 20.5607C5.22064 20.842 5.60218 21 6 21H18C18.3978 21 18.7794 20.842 19.0607 20.5607C19.342 20.2794 19.5 19.8978 19.5 19.5V6H20.25C20.4489 6 20.6397 5.92098 20.7803 5.78033C20.921 5.63968 21 5.44891 21 5.25C21 5.05109 20.921 4.86032 20.7803 4.71967C20.6397 4.57902 20.4489 4.5 20.25 4.5ZM10.5 15.75C10.5 15.9489 10.421 16.1397 10.2803 16.2803C10.1397 16.421 9.94891 16.5 9.75 16.5C9.55109 16.5 9.36032 16.421 9.21967 16.2803C9.07902 16.1397 9 15.9489 9 15.75V9.75C9 9.55109 9.07902 9.36032 9.21967 9.21967C9.36032 9.07902 9.55109 9 9.75 9C9.94891 9 10.1397 9.07902 10.2803 9.21967C10.421 9.36032 10.5 9.55109 10.5 9.75V15.75ZM15 15.75C15 15.9489 14.921 16.1397 14.7803 16.2803C14.6397 16.421 14.4489 16.5 14.25 16.5C14.0511 16.5 13.8603 16.421 13.7197 16.2803C13.579 16.1397 13.5 15.9489 13.5 15.75V9.75C13.5 9.55109 13.579 9.36032 13.7197 9.21967C13.8603 9.07902 14.0511 9 14.25 9C14.4489 9 14.6397 9.07902 14.7803 9.21967C14.921 9.36032 15 9.55109 15 9.75V15.75ZM15 4.5H9V3.75C9 3.55109 9.07902 3.36032 9.21967 3.21967C9.36032 3.07902 9.55109 3 9.75 3H14.25C14.4489 3 14.6397 3.07902 14.7803 3.21967C14.921 3.36032 15 3.55109 15 3.75V4.5Z" fill="#D91F11"/>
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                            </div>))}
                        </div>
                    </div>
                </div>
                {open&&<AddSymptomsModal modalClass="modal-verify">
                    <AddSymptomsContent handler={handler} trigger={triggerHandler}></AddSymptomsContent>
                </AddSymptomsModal>}
            </>}
        </>
    )
}

export default AddSymptoms