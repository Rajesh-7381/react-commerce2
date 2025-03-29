import React, { useState } from "react";
var arr=["anil","rajesh","som"];

const Pratice1 =()=>{
  const [arrcopy,setarrcopy]=useState(arr);
  const [checked,setchecked]=useState(new Array(arr.length).fill(false));

  function handlechange(index){
    const newchecked=[...checked];
    newchecked[index]=checked;
    setchecked(newchecked)
  }

  function handledelete(index){
    const newarr=[...arrcopy];
    newarr.splice(index,1);
    setarrcopy(newarr)
  }

  return (

    <div>
      {
       arrcopy.map((ele,index)=>(
        <div key={index}>
        <input type="checkbox" name="" id="" checked={checked[index]} onChange={(e)=>{handlechange(index)}} />
          <label htmlFor="">{ele}</label>
          {
            checked[index] && <button onClick={(e)=>{handledelete(index)}}>delete</button>
          }
        </div>
       ))
      }
    </div>
  )
}
export default Pratice1;