import React from 'react'

const Intro = () => {
  return (
    <div className="intro">
      <h3>The weather app that only shows you fair weather days. </h3>
      <h4>What are fair weather days? They have:</h4>
      <ul>
        <li>Under 25% chance of rain</li>
        <li>Under 70% cloud cover</li>
        <li>A temperature of over 10 degrees C</li>
      </ul>
    </div>
  )
}

export default Intro