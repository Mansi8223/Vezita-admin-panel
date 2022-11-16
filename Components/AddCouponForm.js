import React, { useState } from 'react'
import { useEffect } from 'react'
import styles from '../styles/css/AddCouponForm.module.css'
import {getOnBoardFromCookie} from '../auth/userCookies';
import Loader from './Loader'

function AddCouponForm() {
    const[name,setName]=useState("")
    const[code,setCode]=useState("")
    const[type,setType]=useState("fixed")
    const[show, setShow]=useState(false)
    const[description,setDescription]=useState("")
    const[discount, setDiscount]=useState(0)
    const[maxAmt, setMaxAmt]=useState(0)
    const[minAmt, setMinAmt]=useState(0)
    const[startDate, setStartDate]=useState("")
    const[endDate, setEndDate]=useState("")
    const[maxUseUser, setMaxUseUser]=useState(0)
    const[maxUseTotal, setMaxUseTotal]=useState(0)
    const[checked,isChecked]=useState(false)
    const[isActive, setIsActive]=useState(false);
    const[selected, setSelected]=useState("Select")
    const[id,setId]=useState("")
    const[data,setData]=useState("")
    const[loading,setLoading]=useState(false)
    var token = getOnBoardFromCookie()
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
        //   console.log(res.patients)
          setData(res.patients)
          setLoading(false)
        })
        .catch(error => {
          console.log('error', error)
          setLoading(false)
        });
    },[])
 const types = ['fixed','percentage']
    const nameHandler=(e)=>{
        setName(e.target.value)
    }
    const codeHandler=(e)=>{
        setCode(e.target.value)
    }
    const descriptionHandler=(e)=>{
        setDescription(e.target.value)
    }
    const discountHandler=(e)=>{
        setDiscount(e.target.value)
    }
    const maxAmtHandler=(e)=>{
        setMaxAmt(e.target.value)
    }
    const minAmtHandler=(e)=>{
        setMinAmt(e.target.value)
    }
    const startDateHandler=(e)=>{
        setStartDate(e.target.value)
    }
    const endDateHandler=(e)=>{
        setEndDate(e.target.value)
    }
    const maxUseUserHandler=(e)=>{
        setMaxUseUser(e.target.value)
    }
    const maxUseTotalHandler=(e)=>{
        setMaxUseTotal(e.target.value)
    }
    const checkHandler=()=>isChecked(prev => !prev)

    const formSubmit=(e)=>{
        setLoading(true)
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("token", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "name": name,
        "type": type,
        "code": code,
        "description": description,
        "discount": parseInt(discount),
        "maxAmount": parseInt(maxAmt),
        "minAmount": parseInt(minAmt),
        "startDate": startDate,
        "endDate": endDate,
        "maximumPerCustomerUse": parseInt(maxUseUser),
        "maximumTotalUse": parseInt(maxUseTotal),
        "user":id
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://vezita-backend.herokuapp.com/api/v1/coupon/new", requestOptions)
        .then(response => response.text())
        .then(result =>{ 
            console.log(result)
            setLoading(false)
        })
        .catch(error => {
            console.log('error', error)
            setLoading(false)
        });
    }
  return (
    <>
        {loading?<Loader loading={loading}/>:<form onSubmit={formSubmit} className={`col-9 col-md-11 col-xl-8 ${styles["wrapper"]} ml-12 mb-5 d-flex d-flex-column d-align-start gap-5`}>
            <div className={`col-12 pr-5 d-flex d-justify-end mt-5`}>
            <button type='submit' className={`btn-save`}>
                Save
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1209 7.84638 17.2635 5.78216 15.7407 4.25932C14.2178 2.73648 12.1536 1.87913 10 1.875ZM13.8672 8.57812L9.28907 12.9531C9.17071 13.0645 9.01406 13.126 8.85157 13.125C8.77214 13.1261 8.69328 13.1115 8.61953 13.082C8.54578 13.0525 8.47861 13.0087 8.42188 12.9531L6.13282 10.7656C6.06933 10.7102 6.01769 10.6426 5.98102 10.5667C5.94434 10.4909 5.92338 10.4084 5.9194 10.3242C5.91542 10.24 5.92849 10.1559 5.95784 10.077C5.98719 9.99798 6.03221 9.92575 6.09019 9.86461C6.14816 9.80347 6.2179 9.75469 6.29522 9.72119C6.37253 9.68769 6.45582 9.67017 6.54007 9.66968C6.62433 9.66919 6.70781 9.68574 6.78551 9.71834C6.86321 9.75094 6.93351 9.79891 6.99219 9.85938L8.85157 11.6328L13.0078 7.67188C13.1293 7.56585 13.2871 7.51091 13.4482 7.51853C13.6093 7.52615 13.7612 7.59575 13.8722 7.71277C13.9832 7.8298 14.0446 7.98519 14.0437 8.14646C14.0428 8.30773 13.9795 8.4624 13.8672 8.57812Z" fill="#186ADE"/>
                </svg>
            </button>
            </div>
            <div className={`col-12 d-flex d-flex-row d-align-start d-justify-space-between`}>
                <div className={`col-6 d-flex d-flex-column d-align-start gap-5`}>
                    <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
                        <h6 className={`f-600 l-20 text-darker`}>Name</h6>
                        <input className={`${styles['input']} col-10 pl-4 pr-4 pt-3 pb-3 bg-light-grey rounded-8 border-none`} type="text" value={name} placeholder="Enter coupon name" onChange={nameHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
                        <h6 className={`f-600 l-20 text-darker`}>Code</h6>
                        <input className={`${styles['input']} col-10 pl-4 pr-4 pt-3 pb-3 bg-light-grey rounded-8 border-none`} type="text" value={code} placeholder="Enter coupon code" onChange={codeHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
                        <h6 className={`f-600 l-20 text-darker`}>Type</h6>
                        <div className={`col-7 p-relative`}>
                            <div className={`col-12 p-relative d-flex d-flex-row d-justify-space-between gap-1 bg-white border-medium-grey rounded-8 pl-2 pr-2 pt-2 pb-2`} onClick={()=>setShow(!show)}>
                                <h6 className={`f-500 l-22 text-black`}>{type}</h6>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 8L8 12L12 8" stroke="#2D2D2D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            {show && (
                                <div className={`${styles["dropdown-content"]} col-12 p-absolute bg-white p-1 rounded-8`}>
                                {types.map((item,index) =>(
                                    <div className={`d-flex d-justify-center pointer`} key={index+1} onClick={(e)=>{
                                    setType(item)
                                    setShow(false)}}>
                                        <h6 className={`f-500 l-22 text-black pt-1 pb-1`}>{item}</h6>
                                    </div>
                                ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
                        <h6 className={`f-600 l-20 text-darker`}>Description</h6>
                        <input className={`${styles['input']} col-10 pl-4 pr-4 pt-3 pb-3 bg-light-grey rounded-8 border-none`} type="text" value={description} placeholder="Enter description" onChange={descriptionHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
                        <h6 className={`f-600 l-20 text-darker`}>Discount</h6>
                        <input className={`${styles['input']} col-10 pl-4 pr-4 pt-3 pb-3 bg-light-grey rounded-8 border-none`} type="number" value={discount} placeholder="Enter discount" onChange={discountHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
                        <h6 className={`f-600 l-20 text-darker`}>Max amount</h6>
                        <input className={`${styles['input']} col-10 pl-4 pr-4 pt-3 pb-3 bg-light-grey rounded-8 border-none`} type="number" value={maxAmt} placeholder="Enter amount" onChange={maxAmtHandler}/>
                    </div>
                </div>
                <div className={`col-6 d-flex d-flex-column d-align-start gap-5`}>
                    <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
                        <h6 className={`f-600 l-20 text-darker`}>Min amount</h6>
                        <input className={`${styles['input']} col-10 pl-4 pr-4 pt-3 pb-3 bg-light-grey rounded-8 border-none`} type="number" value={minAmt} placeholder="Enter amount" onChange={minAmtHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
                        <h6 className={`f-600 l-20 text-darker`}>Start date</h6>
                        <input className={`${styles['input']} col-10 pl-4 pr-4 pt-3 pb-3 bg-light-grey rounded-8 border-none`} type="date" value={startDate} placeholder="Enter start date" onChange={startDateHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
                        <h6 className={`f-600 l-20 text-darker`}>End date</h6>
                        <input className={`${styles['input']} col-10 pl-4 pr-4 pt-3 pb-3 bg-light-grey rounded-8 border-none`} type="date" value={endDate} placeholder="Enter end date" onChange={endDateHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
                        <h6 className={`f-600 l-20 text-darker`}>Maximum coupon use per user</h6>
                        <input className={`${styles['input']} col-10 pl-4 pr-4 pt-3 pb-3 bg-light-grey rounded-8 border-none`} type="number" value={maxUseUser} placeholder="Enter number" onChange={maxUseUserHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
                        <h6 className={`f-600 l-20 text-darker`}>Maximum coupon use total</h6>
                        <input className={`${styles['input']} col-10 pl-4 pr-4 pt-3 pb-3 bg-light-grey rounded-8 border-none`} type="number" value={maxUseTotal} placeholder="Enter number" onChange={maxUseTotalHandler}/>
                    </div>
                    <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
                        <h6 className={`f-600 l-20 text-darker`}>Use this coupon for predefined user</h6>
                        <div className={`col-10 d-flex d-flex-row d-align-center d-justify-space-between`}>
                            <div className={'d-flex d-justify-center pl-2'}>
                                <label className={`${styles["rectangle"]}`}>
                                <input type="checkbox" onChange={checkHandler}/> 
                                <span className={`${styles["toggle"]}`}></span>
                                </label>
                            </div>
                        {checked&& <div className={`col-7 p-relative`}>
                                <div className={`col-12 p-relative d-flex d-flex-row d-justify-space-between gap-1 bg-white border-medium-grey rounded-8 pl-2 pr-2 pt-2 pb-2`}onClick={()=>setIsActive(!isActive)}>
                                    <h6 className={`f-500 l-22 text-black`}>{selected}</h6>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 8L8 12L12 8" stroke="#2D2D2D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                {isActive && (
                                    <div className={`${styles["dropdown-content"]} col-12 p-absolute bg-light-grey p-1 rounded-8`}>
                                    {data&&data.map((item,index) =>(
                                        <div className={`d-flex d-justify-center pointer`} key={index+1} onClick={(e)=>{
                                        setId(item._id)
                                        setSelected(item.name)
                                        setIsActive(false)}}>
                                            <h6 className={`f-500 l-22 text-black pt-1 pb-1`}>{item.name}</h6>
                                        </div>
                                    ))}
                                    </div>
                                )}
                            </div>}
                        </div>   
                    </div>
                </div>
            </div>
        </form>}
    </>
  )
}

export default AddCouponForm