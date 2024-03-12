import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import "./Contactus.css"
const ContactUs = () => {
  useEffect(() => {
    document.title = "Contact Us"
  }, [])
  return (
    <div>
        <h1>Contact US Page</h1>
        <div className='phone'>
        <a href='7486852412'><FontAwesomeIcon icon={faPhone} /></a>
        </div>
    </div>
  )
}

export default ContactUs