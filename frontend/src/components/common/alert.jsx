import React from 'react'

const Alert = ({message,status}) => {
  return (
    <div className={`alert alert-${status} alert-bottom-center`} role="alert" style={{width:"60%"}}>
      {message}
    </div>
  )
}

export default Alert;