import React, { useEffect } from 'react'

const Alert = ({ show, msg, type, removeAlert }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert()
    }, 3000)
    return () => clearTimeout(timeOut)
  }, [])
  return <p className={`alert alert-${show && type}`}>{msg}</p>
}

export default Alert
