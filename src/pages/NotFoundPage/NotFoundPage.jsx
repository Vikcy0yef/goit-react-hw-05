import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div>
     <h2>Page Not Found</h2>
      <p>Sorry, we couldn't find the page you're looking for.</p>
      <Link to="/">Go to Home</Link>
    </div>
  )
}

export default NotFoundPage
