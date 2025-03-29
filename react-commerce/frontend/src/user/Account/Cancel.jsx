import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div>
    <div className='cancel-page'>
    <div className='container'>
      <div className='row'>
          <div className="card cancel-card">
              <div style={{borderRadius:"200px",height:"200px", width:"200px", margin:"0 auto"}}>
              <i class="checkmark checkmark-tick">x</i>
              </div>
                  
                  <h1 className='cancel-tick'>Cancel</h1> 
                  <p className='recived-msg'>😭 We are not received your purchase request;<br/> we'll be in touch shortly!</p>
                  <button><Link to={"/userdashboard2"} style={{textDecoration:"none"}}>Continue Shopping</Link></button>
          </div>
          
      </div>
    </div>
    </div>
    </div>
  )
}

export default Cancel
