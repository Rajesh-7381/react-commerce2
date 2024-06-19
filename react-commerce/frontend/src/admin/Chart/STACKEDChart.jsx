import axios from 'axios';
import React, { useEffect, useState } from 'react';
import STACK from 'react-apexcharts';
import fetchDataEntity from '../CRUDENTITY/FetchDataEntity';

const STACKEDChart = () => {
  const [counts, setCounts] = useState({
    userCount: 0,
    adminCount: 0,
    subAdminCount: 0,
    categoriesCount: 0,
    allProductCount: 0,
    allBrandCount: 0,
});

useEffect(() => {
    const getCounts = async () => {
        const data = await fetchDataEntity();
        if (data) setCounts(data);
    };

    getCounts();
}, []);

  return (
    <div>
      <STACK type='bar' width={575} height={700}
        series={[
          {
            name: "Admin",
            data: [counts.adminCount]
          },
          {
            name: "SubAdmin",
            data: [counts.subAdminCount]
          },
          {
            name: "User",
            data: [counts.userCount]
          },
          {
            name: "Categories",
            data: [counts.categoriesCount]
          },
          {
            name: "Products",
            data: [counts.allProductCount]
          },
          {
            name: "Brands",
            data: [counts.allBrandCount]
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