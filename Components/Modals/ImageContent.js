import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
function ImageContent(props) {
  const handler=()=>{
    props.handler()
  }
    // console.log(props.image)
  return (
    <div className={`col-12 d-flex d-flex-column gap-8`} >
      <CloseIcon className={'text-primary'} onClick={handler}/>
      <div>
        <img src={props.image} alt=''/>
      </div>
    </div>
  )
}

export default ImageContent