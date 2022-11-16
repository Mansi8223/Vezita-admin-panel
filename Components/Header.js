import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import styles from '../styles/css/Header.module.css';
import { useRouter } from 'next/router'
import { useState } from 'react';
import ChangePwModal from './Modals/ChangePwModal';
import ChangePwModalContent from './Modals/ChangePwModalContent';
import ProfileEditModal from './Modals/ProfileEditModal';
import ProfileEditModalContent from './Modals/ProfileEditModalContent';
import { useEffect } from 'react';
import {getOnBoardFromCookie} from '../auth/userCookies';
import {getUserIdFromCookie} from '../auth/userCookies'
import { Avatar } from '@material-ui/core';
import useFirebaseAuth from '../auth/useFirebaseAuth'
import Loader from './Loader';
function Header(props) {
  const [dropdown,setDropdown] = useState(false)
  const [active , setIsActive] =useState(false)
  const[changePw, setChange]=useState(false)
  const[edit,setEdit]=useState(false)
  const[data,setData]=useState("")
  const[loading,setLoading]=useState(false)
  const router = useRouter();
  const {signOut} = useFirebaseAuth()
  var Id = getUserIdFromCookie()
  var token = getOnBoardFromCookie()

    useEffect(()=>{
      setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("token",token);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`https://vezita-backend.herokuapp.com/api/v1/user/${Id}/detail`, requestOptions)
        .then(response => response.text())
        .then(result => {
          var res = JSON.parse(result);
          setData(res.user)
          setLoading(false)
        })
        .catch(error => {
          console.log('error', error)
          setLoading(false)
        });
    },[])

  const profileHandler = () =>{
    setEdit(prev => !prev)
  }
  const passwordHandler=()=>{
    setChange(prev => !prev)
  }
  const dropdownHandler = () =>{
    setDropdown(prev => !prev)
  }
  const notificationHandler =()=>{
    setIsActive(prev => !prev)
  }
  const myElement=(e)=>{
      var element=document.getElementById("sb")
      element.classList.remove('sidebar')
      element.classList.add('sidebar-active')
  }
  const logoutHandler=()=>{
    signOut()
      .catch((error)=>{
        console.log('error', error.message)
        // toast.error("Error while logout"+error.message,{
        //   position: "bottom-center",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        //   toastId:"2"
        // });
      })
      router.push("/Login")
  }
  return (
    <>
      {loading?<Loader loading={loading}/>:<>
        <div className={`${styles["wrapper"]} p-relative col-10 col-md-12 col-lg-12 col-xl-9 col-xxl-10 pt-5 pr-5 mt-5 ml-3 pl-5 pb-3 d-flex d-flex-row d-align-center gap-2`}>
          <div className={`d-flex d-flex-row d-align-center gap-3`}>
              <div className={`menu-icon text-primary`} onClick={myElement}><MenuIcon/></div>
          </div>
          <div className={`col-12 p-relative d-flex d-align-center d-justify-space-between ${styles["header-height"]}`}>
            <h2 className={`l-32 f-600 ${styles["header-wrapper-heading"]}`}>{props.title}</h2>
            <div className={`d-flex d-align-center ${styles["noti-profile-wrapper"]}`}>
              <div className={`p-relative d-flex d-flex-column d-align-center `}>
                <div onClick={notificationHandler} className={`p-relative d-flex d-align-center d-justify-center ${styles["header-noti"]}`} >
                  <img  src='/assets/BellIcon.svg'></img>
                </div>
                {active && 
                  <div className={`${styles["notification"]} self-end mt-popup p-absolute d-flex d-flex-column oy-scroll p-5 bg-white rounded-16`}>
                    <div className={`bg-white d-flex d-flex-row d-align-center d-justify-space-between`}>
                      <h2 className={`font-normal f-600 l-32 text-black`}>Notifications</h2>
                      <h6 className='font-13 f-600 l-20 text-teal text-uppercase cursor'>Mark all as read</h6>
                    </div>
                      <div className={`d-flex d-flex-row d-align-start gap-2 mt-5 pb-4 border-bottom`}>
                          <img src='/assets/bx_bxs-calendar-check.svg' alt='plus-circle-icon'/>
                          <div className={`d-flex d-flex-column d-align-start`}>
                            <h3 className={`font-normal f-500 l-26 text-darker mt-1`}>Title</h3>
                            <h5 className={`font-normal f-400 l-22 text-darker-grey`}>body</h5>
                            <span className={`font-normal font-13 f-700 l-18 text-blue`}>Yestarday 10:30 PM</span>
                          </div>
                      </div>
                  </div>
                }
              </div>
              <div>
                <div className={`cursor-pointer d-flex d-align-center ${styles["profile-wrapper"]}`}>
                  {data.avatar?<img className={`${styles["profile-image"]}`} src={data.avatar}></img>:<Avatar/>}
                  <h5 className='f-400 l-22'>{data.name}</h5>
                  <img onClick={dropdownHandler} className={`${styles["profile-arrow"]}`} src='/assets/ph_caret-right-bold.svg'></img>
                </div>
                {dropdown &&
                  <div className={`p-absolute d-flex d-flex-column ${styles["profile-dropdown"]}`}>
                    <div className={`d-flex d-align-center mb-5 ${styles["doctor-profile-wrapper"]}`}>
                      {data.avatar?<img className={`${styles["doctor-profile-img"]}`} src={data.avatar}></img>:<Avatar/>}
                      <div className={`d-flex d-flex-column ${styles["profile-name-wrapper"]}`}>
                        <h4 className='f-500 l-26'>{data.name}</h4>
                        <span className='text-grey-3 h5 f-400 l-22'>Admin</span>
                      </div>
                    </div>

                    <div onClick={profileHandler} className={`cursor-pointer d-flex d-align-center d-justify-space-between ${styles["edit-profile-wrapper"]}`}>
                      <div className={`d-flex d-align-center ${styles["user-icon-text"]}`}>
                        <img src='/assets/bx_bxs-user-circle.svg'></img>
                        <span className='h5'>Edit Profile</span>
                      </div>
                      <img src='/assets/ph_caret-right-bold-right.svg'></img>
                    </div>
                    <div onClick={passwordHandler} className={`d-flex d-align-center d-justify-space-between ${styles["edit-profile-wrapper"]}`}>
                      <div className={`d-flex d-align-center ${styles["user-icon-text"]}`}>
                        <img src='/assets/ph_key-fill.svg'></img>
                        <span className='h5'>Change password</span> 
                      </div>
                      <img src='/assets/ph_caret-right-bold-right.svg'></img>
                    </div>
                    <div onClick={logoutHandler} className={`d-flex d-align-center d-justify-center rounded-12 bg-blue-3 mt-5 pl-4 pr-4 pt-3 pb-3`}>
                      <h5 className={`f-500 l-22 text-secondary`}>Logout</h5>
                    </div>
                    {/* <div className={`d-flex d-align-center d-justify-space-between ${styles["edit-profile-wrapper"]}`}>
                      <div className={`d-flex d-align-center ${styles["user-icon-text"]}`}>
                        <img src='/assets/bx_bxs-bell.svg'></img>
                        <span className='h5'>Notifications</span> 
                      </div>
                      <img src='/assets/ph_caret-right-bold-right.svg'></img>
                    </div> */}
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        {changePw && <ChangePwModal modalClass="modal-verify">
            <ChangePwModalContent handler={passwordHandler}></ChangePwModalContent>
          </ChangePwModal>}
          {edit && <ProfileEditModal modalClass="modal-verify">
            <ProfileEditModalContent handler={profileHandler} id={Id} data={data}></ProfileEditModalContent>
          </ProfileEditModal>
          }
      </>}
    </>
  )
}

export default Header