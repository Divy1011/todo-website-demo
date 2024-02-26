import React from 'react'
import "./Homepage.css"
import image from "./home.svg"
const HomePage = () => {
  return (
    <div className="container">
    <h1>Home page </h1>
     <img src={image} alt='' />
    </div>
  )
}

export default HomePage