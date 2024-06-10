import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BarChart  from 'react-apexcharts';

const BARChart = () => {
    const [usercount, setUserCount] = useState(0);
    const [admincount, setAdminCount] = useState(0);
    const [subadmincount, setSubadminCount] = useState(0);
    const [categoriescount, setcategoriesCount] = useState(0);
    const [allproductcount,setallproductcount]=useState(0);
    const [allbrandcount,setallbrandcount]=useState(0);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const userResponse = await axios.get("http://localhost:8081/countuser");
          const adminResponse = await axios.get("http://localhost:8081/countadmin");
          const subadminResponse = await axios.get("http://localhost:8081/countsubadmin");
          const uniquecategoriesResponse =await axios.get("http://localhost:8081/uniquecategories");
          const productcountResponse=await axios.get("http://localhost:8081/allproductcount");
          const BrandcountResponse=await axios.get("http://localhost:8081/AllBrandCount");
          setUserCount(userResponse.data.count);
          setAdminCount(adminResponse.data.Admincount);
          setSubadminCount(subadminResponse.data.subaAdmincount);
          setcategoriesCount(uniquecategoriesResponse.data.catcount)
          setallproductcount(productcountResponse.data.productcount);
          setallbrandcount(BrandcountResponse.data.Brandcount);
          // Cookies.get("id",id);
        } catch (error) {
          console.error("Error fetching count data:", error);
        }
      };
  
      fetchData();
    }, []);
  return (
    <div>
    <BarChart type='bar' width={575} height={700}
    series={[
      {
        name:"",
        data:[admincount , subadmincount, usercount,categoriescount,allproductcount,allbrandcount]
      }
    ]}

    options={{
      title:{text :'developed by me',style:{fontSize:30}},
      colors:['#ff0000'],
      theme:{mode:'dark'},
      xaxis:{
        tickPlacement:"on",
        categories:['Admin', 'SubAdmin', 'User','Categories','Products','Brands'],
        title:{text:'e-Commerce',style:{color:'#FFFF00',fontSize:30}}
      }
    }}
  >
  
    </BarChart>
    </div>
  )
}

export default BARChart
