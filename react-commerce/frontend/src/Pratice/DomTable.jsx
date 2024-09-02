
import React, { useState } from 'react'
import Pratice1 from './Pratice1';
import Pratice2 from './Pratice2';
import Main from './Main';
import Pratice3 from './Pratice3';
import Chat from './Chat';

const DomTable = () => {
    const [formdata,setformdata]=useState({name:'',email:'',age:''});
    const [tabledata,settabledata]=useState([]);

    function handlesubmit(e){
        e.preventDefault();
        settabledata((prevdata)=>[...prevdata,formdata])
        
    }

    function handlechange(e){
        const {name,value}=e.target;
        setformdata((prevdata)=>({
            ...prevdata,
            [name]:value
        }))
    }
    function handledelete(index){
        settabledata((prevdata)=>prevdata.filter((item,i)=>i !== index)) //The condition i !== index is like asking: "Is the current element's index (i) not equal to the index of the element I want to delete (index)?" 
        // return true or false if true included in array if false excluded
    }
  return (
    <div>
      <form action="" onSubmit={handlesubmit}>
        <div>
            <label htmlFor="name">name</label>
            <input type="text" name="name" id="name" onChange={handlechange} />
        </div>
        <div>
            <label htmlFor="email">email</label>
            <input type="text" name="email" id="email" onChange={handlechange}/>
        </div>
        <div>
            <label htmlFor="age">age</label>
            <input type="text" name="age" id="age" onChange={handlechange}/>
        </div>
        <div>
            <button type='submit'>submit</button>
        </div>
      </form>      
      <table>
        <tr>
            <thead>
                <th>name</th>
                <th>email</th>
                <th>age</th>
            </thead>
            <tbody>
                {
                    tabledata.map((item,index)=>(
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.age}</td>
                            <td onClick={()=>handledelete(index)} style={{cursor:"pointer"}}>delete</td>
                        </tr>
                    ))
                }
            </tbody>
        </tr>
      </table>
      <Pratice1 />
      <Pratice2 />
      
      <Main />
                <hr />
                <hr />
      <Pratice3 />
      <hr />
                <hr />
               
    </div>
  )
}

export default DomTable
