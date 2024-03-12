import React, { useEffect } from 'react'
import "./Homepage.css"
import image from "./home.svg"
const HomePage = () => {
  useEffect(() => {
    document.title = "Home"
  }, [])
  return (
    <div className="container">
    <h1>Home page </h1>
     <img src={image} alt='' />
    </div>
  )
}

export default HomePage