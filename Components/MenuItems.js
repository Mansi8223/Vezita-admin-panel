import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import style from '../styles/css/MenuItems.module.css'
const MenuItems = (props) => {
  const [path, setPath] = useState('');
  
  useEffect(()=>{
    setPath(Router.route)
  },[])
  if(path==props.path || (props.multipath=="1" && ((props.haspath1=="1" && path==props.path1) || (props.haspath2=="1" && path==props.path2) || (props.haspath3=="1" && path==props.path3) || (props.haspath4=="1" && path==props.path4)|| (props.haspath5=="1" && path==props.path5)|| (props.haspath6=="1" && path==props.path6)|| (props.haspath7=="1" && path==props.path7) || (props.haspath8=="1" && path==props.path8)))){
    return (
        <Link href={props.path}>
            <div className={`${style["active"]} p-3`}>
                <img src={props.activeImage} alt='icon'/>
                <h5>{props.value}</h5>
            </div>
        </Link>
    )
  }
  else{
    return (
        <Link  href={props.path}>
            <div className={`${style["inactive"]} p-3`}>
                <img src={props.inactiveImage} alt='icon'/>
                <h5>{props.value}</h5>
            </div>
        </Link>
    )
  }
}

export default MenuItems