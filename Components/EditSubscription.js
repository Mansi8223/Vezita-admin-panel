import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {getOnBoardFromCookie} from '../auth/userCookies';
import AddListModal from './Modals/AddListModal';
import AddListModalContent from './Modals/AddListModalContent';
import styles from '../styles/css/EditSubscription.module.css'
import Benefits from './Benefits';
import Loader from './Loader'
function EditSubscription() {
  const[edit,setEdit]=useState(false)
  const[monthEdit,setMonthEdit]=useState(false)
  const[checked,setChecked]=useState(false)
  const[monthlyPlan,setMonthlyPlan]=useState("")
  const[yearlyPlan,setYearlyPlan]=useState("")
  const[yList,setYList]=useState([])
  const[mList,setMList]=useState([])
  const[yOpen,setYOpen]=useState(false)
  const[mOpen,setMOpen]=useState(false)
  const[yPackageAmt,setYPackageAmt]=useState("")
  const[ySaleAmt,setYSaleAmt]=useState("")
  const[mPackageAmt,setMPackageAmt]=useState("")
  const[mSaleAmt,setMSaleAmt]=useState("")
  const[yID,setYID]=useState("")
  const[mID,setMID]=useState("")
  const[loading,setLoading]=useState(false)
  var token = getOnBoardFromCookie()
  useEffect(()=>{
    setLoading(true)
    var myHeaders = new Headers();
      myHeaders.append("token", token);

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("https://vezita-backend.herokuapp.com/api/v1/plan", requestOptions)
      .then(response => response.text())
      .then(result => {
        var res = JSON.parse(result);
        // console.log(res)
        if(res.plans[1])setYPackageAmt(res.plans[1].packagePrice)
        if(res.plans[1])setYSaleAmt(res.plans[1].salePrice)
        if(res.plans[1])setYList(res.plans[1].benefits)
        if(res.plans[1])setYID(res.plans[1]._id)
        if(res.plans[1])setYearlyPlan(res.plans[1])

        if(res.plans[0])setMPackageAmt(res.plans[0].packagePrice)
        if(res.plans[0])setMSaleAmt(res.plans[0].salePrice)    
        if(res.plans[0])setMList(res.plans[0].benefits)
        if(res.plans[0])setMID(res.plans[0]._id)
        if(res.plans[0])setMonthlyPlan(res.plans[0])
        setLoading(false)
        
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  },[])

  const editHandler=()=>setEdit(prev => !prev)
  const monthlyEditHandler=()=>setMonthEdit(prev => !prev)
  const checkHandler=()=>setChecked(prev => !prev)

  const yearlyDeleteHandler=(e)=>{
    let ind=e.currentTarget.getAttribute("index")
    console.log(ind)
    let arr=yList.filter((item,index)=>index!=ind)
    console.log(arr)
    setYList(arr)
  }
  const monthlyDeleteHandler=(e)=>{
    let ind=e.currentTarget.getAttribute("index")
    console.log(ind)
    let arr=yList.filter((item,index)=>index!=ind)
    console.log(arr)
    setMList(arr)
  }

  const yearHandler=()=>setYOpen(prev => !prev)
  const monthHandler=()=>setMOpen(prev => !prev)

  const yearDataHandler=(benefit)=>{
    const data = benefit
    console.log(data,"yerly")
    if(benefit){setYList((cl)=>[...cl,data])}
  }
  const monthDataHandler=(benefit)=>{
    const data = benefit   
    console.log(data,"monthly")
    if(benefit){setMList((cl)=>[...cl,data])}
  }

  const ypHandler=(e)=>setYPackageAmt(e.target.value)
  const ysHandler=(e)=>setYSaleAmt(e.target.value)

  const mpHandler=(e)=>setMPackageAmt(e.target.value)
  const msHandler=(e)=>setMSaleAmt(e.target.value)

  const submitYear=(e)=>{
    setLoading(true)
    e.preventDefault()
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "packageType": "yearly",
      "packagePrice": yPackageAmt,
      "salePrice": ySaleAmt,
      "benefits":yList
    });

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`https://vezita-backend.herokuapp.com/api/v1/plan/${yID}`, requestOptions)
      .then(response => response.text())
      .then(result =>{ 
        console.log(result)
        setEdit(prev => !prev)
        setLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  }

  const submitMonth=(e)=>{
    setLoading(true)
    e.preventDefault()
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "packageType": "monthly",
      "packagePrice": mPackageAmt,
      "salePrice": mSaleAmt,
      "benefits":mList
    });

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`https://vezita-backend.herokuapp.com/api/v1/plan/${mID}`, requestOptions)
      .then(response => response.text())
      .then(result =>{ 
        console.log(result)
        setMonthEdit(prev => !prev)
        setLoading(false)
      })
      .catch(error => {
        console.log('error', error)
        setLoading(false)
      });
  }
    return (
      <>
        {loading?<Loader loading={loading}/>:<>
          <div className={`col-9 d-flex d-flex-column d-align-center d-justify-center gap-5 ml-12 mt-5`}>
            <div className={``}>
              <label className={`switch`}>
                <input type='checkbox' onChange={checkHandler}/>
                <span className={`slider`}/>
              </label>
            </div>
            {checked?
            <>
              <div className={`col-7 col-md-10 col-lg-9 col-xxl-7 d-flex d-flex-column d-align-start gap-4 bg-secondary p-5 rounded-24`}>
                <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between pb-3 border-dashed`}>
                  <div className={`d-flex d-flex-column d-align-start gap-4`}>
                    <span className={`${styles["strike"]}`}>
                      <h2 className={` f-600 l-32 text-blue-3`}>${yearlyPlan.packagePrice}/per year</h2>
                    </span>
                    <h1 className={`f-600 l-40 text-blue-3 `}>${yearlyPlan.salePrice}/per year</h1>
                  </div>
                  <div className={`col-5 d-flex d-flex-row d-align-center d-justify-space-between gap-4`}>
                    <div className={`p-relative d-flex d-align-center d-justify-center`}>
                      <img className={`p-relative`} src='/assets/Star 1.png' alt=''/>
                      <div className={`${styles["vector-text"]} p-absolute d-flex d-flex-column d-align-center`}>
                        <h4 className={`f-500 l-26 text-green`}>Save</h4>
                        <h4 className={`f-700 l-26 text-green`}>{yearlyPlan.discountPercent}%</h4>
                      </div>
                    </div>
                    <button onClick={editHandler} className={`col-5 pl-4 pr-4 pt-2 pb-2 bg-light-grey rounded-12 f-500 l-22 text-darker pointer border-none`}>Edit</button>
                  </div>
                </div>
                <div className={`d-flex d-flex-column d-align-start gap-4`}>
                  <h4 className={`f-600 l-26 text-white`}>Benefits</h4>
                  {yearlyPlan.benefits&&yearlyPlan.benefits.map((item,index)=>(
                    <div key={index+1} className={`d-flex d-flex-row d-align-center gap-2`}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1209 7.84638 17.2635 5.78216 15.7407 4.25932C14.2178 2.73648 12.1536 1.87913 10 1.875ZM13.8672 8.57812L9.28907 12.9531C9.17071 13.0645 9.01406 13.126 8.85157 13.125C8.77214 13.1261 8.69328 13.1115 8.61953 13.082C8.54578 13.0525 8.47861 13.0087 8.42188 12.9531L6.13282 10.7656C6.06933 10.7102 6.01769 10.6426 5.98102 10.5667C5.94434 10.4909 5.92338 10.4084 5.9194 10.3242C5.91542 10.24 5.92849 10.1559 5.95784 10.077C5.98719 9.99798 6.03221 9.92575 6.09019 9.86461C6.14816 9.80347 6.2179 9.75469 6.29522 9.72119C6.37253 9.68769 6.45582 9.67017 6.54007 9.66968C6.62433 9.66919 6.70781 9.68574 6.78551 9.71834C6.86321 9.75094 6.93351 9.79891 6.99219 9.85938L8.85157 11.6328L13.0078 7.67188C13.1293 7.56585 13.2871 7.51091 13.4482 7.51853C13.6093 7.52615 13.7612 7.59575 13.8722 7.71277C13.9832 7.8298 14.0446 7.98519 14.0437 8.14646C14.0428 8.30773 13.9795 8.4624 13.8672 8.57812Z" fill="white"/>
                      </svg>
                      <span className={`f-400 l-22 text-white`}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              {edit&&<form onSubmit={submitYear} className={`mt-5 col-7 col-md-10 col-lg-9 col-xxl-7 d-flex d-flex-column d-align-start gap-4 bg-subtle p-5 rounded-24`}>
                <div className={`col-12 d-flex d-flex-row d-align-center gap-4`}>
                  <h4 className={`col-5 f-600 l-26 text-darker`}>Edit package amount</h4>
                  <input className={`col-7 search-input pt-3 pb-3 pl-3 pr-3 rounded-8`} type='number' placeholder='$ Enter amount' value={yPackageAmt} onChange={ypHandler} />
                </div>
                <div className={`col-12 d-flex d-flex-row d-align-center gap-4`}>
                  <h4 className={`col-5 f-600 l-26 text-darker`}>Edit sale amount</h4>
                  <input className={`col-7 search-input pt-3 pb-3 pl-3 pr-3 rounded-8`} type='number' placeholder='$ Enter amount' value={ySaleAmt} onChange={ysHandler}/>
                </div>
                <div className={`col-12 d-flex d-flex-column d-align-start gap-4`}>
                  <h4 className={`f-600 l-26 text-darker`}>Benefits</h4>
                  {yList&&yList.map((item,index)=>(
                      <Benefits  key={index+1} index={index} item={item} handler={yearlyDeleteHandler}/>
                    ))}
                  <div onClick={yearHandler} className={`self-end d-flex d-flex-row d-align-center gap-2 bg-green pt-2 pb-2 pl-4 pr-3 rounded-100 pointer`}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H10.9375V16.875C10.9375 17.1236 10.8387 17.3621 10.6629 17.5379C10.4871 17.7137 10.2486 17.8125 10 17.8125C9.75136 17.8125 9.5129 17.7137 9.33709 17.5379C9.16127 17.3621 9.0625 17.1236 9.0625 16.875V10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H9.0625V3.125C9.0625 2.87636 9.16127 2.6379 9.33709 2.46209C9.5129 2.28627 9.75136 2.1875 10 2.1875C10.2486 2.1875 10.4871 2.28627 10.6629 2.46209C10.8387 2.6379 10.9375 2.87636 10.9375 3.125V9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z" fill="white"/>
                    </svg>
                    <h4 className={`f-600 l-26 text-white`}>Add</h4>
                  </div>
                </div>
                <button type='submit' className={`col-3 btn self-center pointer`}>Save</button>
              </form>}
            </>:
            <>
              <div className={`col-7 col-md-10 col-lg-9 col-xxl-7 d-flex d-flex-column d-align-start gap-4 bg-secondary p-5 rounded-24`}>
                <div className={`col-12 d-flex d-flex-row d-align-center d-justify-space-between pb-3 border-dashed`}>
                  <div className={`d-flex d-flex-column d-align-start gap-4`}>
                    <span className={`${styles["strike"]}`}>
                      <h2 className={` f-600 l-32 text-blue-3`}>${monthlyPlan.packagePrice}/per month</h2>
                    </span>
                    <h1 className={`f-600 l-40 text-blue-3 `}>${monthlyPlan.salePrice}/per month</h1>
                  </div>
                  <div className={`col-5 d-flex d-flex-row d-align-center d-justify-space-between gap-4`}>
                    <div className={`p-relative d-flex d-align-center d-justify-center`}>
                      <img className={`p-relative`} src='/assets/Star 1.png' alt=''/>
                      <div className={`${styles["vector-text"]} p-absolute d-flex d-flex-column d-align-center`}>
                        <h4 className={`f-500 l-26 text-green`}>Save</h4>
                        <h4 className={`f-700 l-26 text-green`}>{monthlyPlan.discountPercent}%</h4>
                      </div>
                    </div>
                    <button onClick={monthlyEditHandler} className={`col-5 pl-4 pr-4 pt-2 pb-2 bg-light-grey rounded-12 f-500 l-22 text-darker pointer border-none`}>Edit</button>
                  </div>
                </div>
                <div className={`d-flex d-flex-column d-align-start gap-4`}>
                  <h4 className={`f-600 l-26 text-white`}>Benefits</h4>
                  {monthlyPlan.benefits&&monthlyPlan.benefits.map((item,index)=>(
                    <div key={index+1} className={`d-flex d-flex-row d-align-center gap-2`}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 1.875C8.39303 1.875 6.82214 2.35152 5.486 3.24431C4.14985 4.1371 3.10844 5.40605 2.49348 6.8907C1.87852 8.37535 1.71762 10.009 2.03112 11.5851C2.34463 13.1612 3.11846 14.6089 4.25476 15.7452C5.39106 16.8815 6.8388 17.6554 8.4149 17.9689C9.99099 18.2824 11.6247 18.1215 13.1093 17.5065C14.594 16.8916 15.8629 15.8502 16.7557 14.514C17.6485 13.1779 18.125 11.607 18.125 10C18.1209 7.84638 17.2635 5.78216 15.7407 4.25932C14.2178 2.73648 12.1536 1.87913 10 1.875ZM13.8672 8.57812L9.28907 12.9531C9.17071 13.0645 9.01406 13.126 8.85157 13.125C8.77214 13.1261 8.69328 13.1115 8.61953 13.082C8.54578 13.0525 8.47861 13.0087 8.42188 12.9531L6.13282 10.7656C6.06933 10.7102 6.01769 10.6426 5.98102 10.5667C5.94434 10.4909 5.92338 10.4084 5.9194 10.3242C5.91542 10.24 5.92849 10.1559 5.95784 10.077C5.98719 9.99798 6.03221 9.92575 6.09019 9.86461C6.14816 9.80347 6.2179 9.75469 6.29522 9.72119C6.37253 9.68769 6.45582 9.67017 6.54007 9.66968C6.62433 9.66919 6.70781 9.68574 6.78551 9.71834C6.86321 9.75094 6.93351 9.79891 6.99219 9.85938L8.85157 11.6328L13.0078 7.67188C13.1293 7.56585 13.2871 7.51091 13.4482 7.51853C13.6093 7.52615 13.7612 7.59575 13.8722 7.71277C13.9832 7.8298 14.0446 7.98519 14.0437 8.14646C14.0428 8.30773 13.9795 8.4624 13.8672 8.57812Z" fill="white"/>
                      </svg>
                      <span className={`f-400 l-22 text-white`}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              {monthEdit && <form onSubmit={submitMonth} className={`mt-5 col-7 col-md-10 col-lg-9 col-xxl-7 d-flex d-flex-column d-align-start gap-4 bg-subtle p-5 rounded-24`}>
                <div className={`col-12 d-flex d-flex-row d-align-center gap-4`}>
                  <h4 className={`col-5 f-600 l-26 text-darker`}>Edit package amount</h4>
                  <input className={`col-7 search-input pt-3 pb-3 pl-3 pr-3 rounded-8`} type='number' placeholder='$ Enter amount' value={mPackageAmt} onChange={mpHandler}/>
                </div>
                <div className={`col-12 d-flex d-flex-row d-align-center gap-4`}>
                  <h4 className={`col-5 f-600 l-26 text-darker`}>Edit sale amount</h4>
                  <input className={`col-7 search-input pt-3 pb-3 pl-3 pr-3 rounded-8`} type='number' placeholder='$ Enter amount'value={mSaleAmt} onChange={msHandler}/>
                </div>
                <div className={`col-12 d-flex d-flex-column d-align-start gap-4`}>
                  <h4 className={`f-600 l-26 text-darker`}>Benefits</h4>
                  {mList&&mList.map((item,index)=>(
                      <Benefits  key={index+1} index={index} item={item} handler={monthlyDeleteHandler}/>
                    ))}
                  <div onClick={monthHandler} className={`self-end d-flex d-flex-row d-align-center gap-2 bg-green pt-2 pb-2 pl-4 pr-3 rounded-100 pointer`}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H10.9375V16.875C10.9375 17.1236 10.8387 17.3621 10.6629 17.5379C10.4871 17.7137 10.2486 17.8125 10 17.8125C9.75136 17.8125 9.5129 17.7137 9.33709 17.5379C9.16127 17.3621 9.0625 17.1236 9.0625 16.875V10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H9.0625V3.125C9.0625 2.87636 9.16127 2.6379 9.33709 2.46209C9.5129 2.28627 9.75136 2.1875 10 2.1875C10.2486 2.1875 10.4871 2.28627 10.6629 2.46209C10.8387 2.6379 10.9375 2.87636 10.9375 3.125V9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z" fill="white"/>
                    </svg>
                    <h4 className={`f-600 l-26 text-white`}>Add</h4>
                  </div>
                </div>
                <button type='submit' className={`col-3 btn self-center pointer`}>Save</button>
              </form>}
            </>}
          </div>
          {yOpen&&<AddListModal modalClass="modal-verify">
            <AddListModalContent handler={yearHandler} title='yearly' dataHandler={yearDataHandler}></AddListModalContent>
            </AddListModal>}
          {mOpen&&<AddListModal modalClass="modal-verify">
          <AddListModalContent handler={monthHandler} title='monthly' dataHandler={monthDataHandler}></AddListModalContent>
          </AddListModal>}
        </>}
      </>
  )
}

export default EditSubscription