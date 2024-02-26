import React, { useEffect } from 'react'

const ContactUs = () => {
  useEffect(() => {
    document.title = "Contact Us"
  }, [])
  return (
    <div>
        <h1>Contact US Page</h1>
    </div>
  )
}

export default ContactUs