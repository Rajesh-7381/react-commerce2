import React from 'react'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='success-page'>
      <div className='container'>
        <div className='row'>
            <div className="card success-card">
                <div style={{borderRadius:"200px",height:"200px", width:"200px", margin:"0 auto"}}>
                <i class="checkmark checkmark-tick">✓</i>
                </div>
                    
                    <h1 className='success-tick'>Success</h1> 
                    <p className='recived-msg'>We received your purchase request;<br/> we'll be in touch shortly!</p>
                    <button><Link to={"/userdashboard2"} style={{textDecoration:"none"}}>Continue Shopping</Link></button>
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default Success
