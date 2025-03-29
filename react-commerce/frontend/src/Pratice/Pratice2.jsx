import React, { useState } from "react";
var countries=[
    {
        name:"india",value:"in",cities:["mumbai","delhi"]
    },
    {
        name:"pakistan",value:"pk",cities:["lahore","karachi"]
    },
    {
        name:"bangladesh",value:"bn",cities:["chitagong","dhaka"]
    },
]

const Pratice2=()=>{
    const [selectcountry,setselectcountry]=useState("")
    const [selectcity,setselectcity]=useState([])
    const [selectcity2,setselectcity2]=useState("")
    function country(e){
        // alert(e)
        const selectcountry=e.target.value;
        setselectcountry(selectcountry)
        const country=countries.find(country =>country.name === selectcountry);
        setselectcity(country ? country.cities : []);
    }
    function city(e){
        const selectcity=e.target.value
        setselectcity2(selectcity)
        alert("you selected" +JSON.stringify(selectcity))
    
       
        
    }
    return (
        <div>
            <select name="" id="" value={selectcountry} onChange={country}>
                <option value="">select country</option>
                {
                    countries.map((item,index)=>(
                        <option key={index} value={item.name}>{item.name}</option>
                    ))
                }
            </select>
            <select onChange={city}>
            
                {
                    selectcountry && (
                        
                        selectcity.map((city,index)=>(
                            
                            <option key={index}>{city}</option>
                        ))
                    )
                }
            </select>
            <p>you selected country  name is :: {selectcountry} and choosen city is:;{selectcity2}</p>
        </div>
    )
}
export default  Pratice2;