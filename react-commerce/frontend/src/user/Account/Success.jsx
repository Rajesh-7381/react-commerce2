import React from 'react'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='success-page'>
      <div className='container'>
        <div className='row'>
          <div className="card success-card" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTcvIcikyjgYcDZuKPzsq8xAZIilsBxUm10g&s")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity:'0.9'
          }}>
            <div style={{borderRadius:"200px",height:"200px", width:"200px", margin:"0 auto"}}>
              <i class="checkmark checkmark-tick">✓</i>
            </div>
            
            <h1 className='success-tick'>Success</h1> 
            <p className='recived-msg'>We received your purchase request;<br/> we'll be in touch shortly!</p>
            <button><Link to={"/userdashboard2"} style={{textDecoration:"none"}}>Continue Shopping</Link></button>
            <br />
            <div className='text-start'>
              <h4>Here Product Details</h4>
              <p>Order Id: <span className='bg-warning text-muted'>ig</span></p>
              <p>product name:<span className='bg-warning text-muted'>ig</span></p>
              <p>Image:<span className='bg-warning text-muted'>ig</span></p>
              <p>Discount:<span className='bg-warning text-muted'>ig</span></p>
              <p>Applied Cuppon:<span className='bg-warning text-muted'>ig</span></p>
              <p>Total Amount:<span className='bg-warning text-muted'>ig</span></p>
              <p>Mode:<span className='bg-warning text-muted'>Cash-On-Delivery</span></p>
            </div>
            
            <div className='text-start'>
              <button className='bg-success'>Track Your Orders</button>
              <h4>Your Addres:</h4>
              <p> Robert Robertson
              <br />
               1234 NW Bobcat Lane St. Robert
               <br />
                MO 65584-567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Success