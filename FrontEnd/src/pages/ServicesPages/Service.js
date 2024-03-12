import React, { useEffect } from 'react'

const Service = () => {
  useEffect(() => {
    document.title = "Services"
  }, [])
  return (
    <div><h1>-- Services Page -- </h1></div>
  )
}

export default Service