import React, { useEffect } from 'react'

const Alert = ({ msg, msgType, removeHint, list }) => {
  useEffect(() => {
    const tik = setTimeout(() => {
      removeHint()
    }, 3000)
    return () => {
      clearTimeout(tik)
    }
  }, [list, removeHint])
  return <p className={`alert alert-${msgType}`}>{msg}</p>
}

export default Alert
