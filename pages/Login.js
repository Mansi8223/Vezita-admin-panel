import React from 'react'
import style from '../styles/css/Login.module.css'
import useFirebaseAuth from '../auth/useFirebaseAuth';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {setOnBoardCookie, getOnBoardFromCookie, removeOnBoardCookie, setUserIdCookie} from '../auth/userCookies'
import Loader from '../Components/Loader'
function Login() {
  const[show, setShow]=useState(false)
  const[email, setEmail]=useState("")
  const[password, setPassword]=useState("")
  const[loading,setLoading]=useState(false)
  const router = useRouter();
  const {signInWithEmailAndPassword,signOut,authUser} = useFirebaseAuth()
  const emailHandler=(e)=>{setEmail(e.target.value)}
  const passwordHandler=(e)=>{setPassword(e.target.value)}
  const formSubmit =(e)=>{
    setLoading(true)
    e.preventDefault()
    signInWithEmailAndPassword(email,password)
    .then(authUser => {
      var myHeaders = new Headers();
      myHeaders.append("token", authUser.user.multiFactor.user.accessToken);

      var raw = JSON.stringify({
        "email": email,
        "password": password
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://vezita-backend.herokuapp.com/api/v1/user/login", requestOptions)
        .then(response => response.text())
        .then(result => {
          var res = JSON.parse(result);
          setUserIdCookie(res.user._id)
          setOnBoardCookie( authUser.user.multiFactor.user.accessToken);
          router.push("/DashBoard")
          setLoading(false)
        })
        .catch(error => {
          console.log('error', error)
          setLoading(false)
        });
      })
    }
  return (
    <>
      { loading? <Loader loading={loading}/>:<form onSubmit={formSubmit} className={`row col-12 d-flex d-flex-row d-align-center`}>
        <div className={`col-6 h-100 d-flex d-flex-column d-align-center d-justify-center bg-primary`}>
          <img src="/assets/VezitaLogo.svg" alt='bg-picture'/>
          <img className={`${style["image"]}`} src="/assets/Frame.svg" alt='bg-picture'/>
        </div>
        <div className={`col-6 h-100 d-flex d-justify-center bg-white`}>
          <div className={`col-7 d-flex d-flex-column d-align-start d-justify-center`}>
            <h1 className={`f-600 l-40 mb-56`}>Login</h1>
            <div className={`col-12 d-flex d-flex-column d-align-start gap-5 mb-28`}>
              <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
                <h5 className={`f-600 l-22`}>Email</h5>
                <input className={`${style['input']} col-12 p-4 bg-neutral-grey rounded-8 border-none`} type="text" value={email} placeholder="Enter your email" onChange={emailHandler}/>
              </div>
              <div className={`col-12 d-flex d-flex-column d-align-start gap-1`}>
                <h5 className={`f-600 l-22`}>Password</h5>
                <input onClick={()=>setShow(!show)} className={`${style['input']} col-12 p-4 bg-neutral-grey rounded-8 border-none`} type={show? "text":"password"} value={password} placeholder="Enter your password" onChange={passwordHandler}/>
              </div>
              <h6 className={`self-end f-600 l-20 text-grey pointer`}>Forgot password?</h6>
            </div>
            <button type='submit' className={`col-12 btn pointer`}>Login</button>
          </div>
        </div>
      </form>}
    </>
  )
}

export default Login