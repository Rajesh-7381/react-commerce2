import React from 'react'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <div>
        <div className='d-flex align-items-center justify-content-center' style={{ height: '100vh' }}>
            <img src="./frontend/images/collection/404.jpg" alt="Page Not Found" />
            <br />
            <Link to={"/"}>Back</Link>
        </div>
        
    </div>
  )
}

export default NotFound
