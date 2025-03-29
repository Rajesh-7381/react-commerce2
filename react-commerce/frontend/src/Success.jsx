import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Success = () => {
    const navigate=useNavigate();
    const [searchParams]=useSearchParams();

    useEffect(()=>{
        const token=searchParams.get('token')
        const role=searchParams.get('role')
        const email=searchParams.get('email')
        const id=searchParams.get('id')
        
        if(token){
            localStorage.setItem('token',token)
            localStorage.setItem('email',email)
            sessionStorage.setItem('id',id)
            sessionStorage.setItem('role',role)
            if(role === 'admin'){
                navigate("/admindashboard1")
            }else if(role === 'user'){
                navigate("/userdashboard2")
            }else{
                navigate("/")
            }
        }

    },[])
  return (
    <div>
        <img src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif" alt="Loading......." />
    </div>
  )
}

export default Success
