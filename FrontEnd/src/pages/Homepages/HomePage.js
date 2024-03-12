import React, { useEffect } from 'react'
import "./Homepage.css"
import image from "./home.svg"
const HomePage = () => {
  
  useEffect(() => {
    document.title = "Home"
  }, [])
  return (
    
    <div className="container">
      <img src={image} alt='' /><br></br>
    <h1 className="r">Home page </h1><br></br>
    <h3 className="animate-charcter">Demo site by ~DIVY PATEL~</h3>
     
    </div>
  )
}

export default HomePage