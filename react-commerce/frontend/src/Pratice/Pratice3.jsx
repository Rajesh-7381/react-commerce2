import React, { useState } from "react";
var day=["sunday","monday","tuseday"];
var matches=["football","cricket","vollyball"];

const Pratice3=()=>{
    const [days,setdays]=useState("");
    const [match,setmatch]=useState("");

    function handledaychange(e){
        alert(e)
        setdays(e.target.value)
    }
    function handlematchchange(e){
        setmatch(e.target.value)
    }
    return (

        <div>
            QNS-4:: suppose 2 array given i,e day and matches . day=["sunday","monday","tuseday"]  and matches=["football","cricket","vollyball"]. i want user choose tuseday for cricket .(use radio  button)
            {
                
                day.map((item,index)=>(
                    <div key={index}>
                    
                        <input type="radio" name="days" id="" onChange={handledaychange} value={item} checked={days === item} />
                        <label htmlFor="">{item}</label>
                    </div>
                ))
            }
            <h1>matches are</h1>
            {
                matches.map((item,index)=>(
                    <div key={index}>
                    
                        <input type="radio" name="matches" id="" onChange={handlematchchange} value={item} checked={match === item} />
                        <label htmlFor="">{item}</label>
                    </div>
                ))
            }

            <p>you selected to play {match}   on {days} </p>
        </div>
    )
}
export default Pratice3;