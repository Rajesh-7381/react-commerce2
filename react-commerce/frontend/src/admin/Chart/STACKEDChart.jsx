import axios from 'axios';
import React, { useEffect, useState } from 'react';
import STACK from 'react-apexcharts';

const STACKEDChart = () => {
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [subadminCount, setSubadminCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [allProductCount, setAllProductCount] = useState(0);
  const [allBrandCount, setAllBrandCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("http://localhost:8081/countuser");
        const adminResponse = await axios.get("http://localhost:8081/countadmin");
        const subadminResponse = await axios.get("http://localhost:8081/countsubadmin");
        const uniquecategoriesResponse = await axios.get("http://localhost:8081/uniquecategories");
        const productcountResponse = await axios.get("http://localhost:8081/allproductcount");
        const BrandcountResponse = await axios.get("http://localhost:8081/AllBrandCount");
        setUserCount(userResponse.data.count);
        setAdminCount(adminResponse.data.Admincount);
        setSubadminCount(subadminResponse.data.subaAdmincount);
        setCategoriesCount(uniquecategoriesResponse.data.catcount);
        setAllProductCount(productcountResponse.data.productcount);
        setAllBrandCount(BrandcountResponse.data.Brandcount);
      } catch (error) {
        console.error("Error fetching count data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <STACK type='bar' width={575} height={700}
        series={[
          {
            name: "Admin",
            data: [adminCount]
          },
          {
            name: "SubAdmin",
            data: [subadminCount]
          },
          {
            name: "User",
            data: [userCount]
          },
          {
            name: "Categories",
            data: [categoriesCount]
          },
          {
            name: "Products",
            data: [allProductCount]
          },
          {
            name: "Brands",
            data: [allBrandCount]
          }
        ]}

        options={{
          title: { text: 'developed by me', style: { fontSize: 30 } },
          colors: ['#ff0000'],
          theme: { mode: 'dark' },
          xaxis: {
            tickPlacement: "on",
            categories: ['e-Commerce'],
            title: { text: 'e-Commerce', style: { color: '#FFFF00', fontSize: 30 } }
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '50%',
              endingShape: 'rounded',
              stacked: true
            }
          }
        }}
      >
      </STACK>
    </div>
  )
}

export default STACKEDChart