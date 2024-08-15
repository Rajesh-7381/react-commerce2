import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PIECHART from 'react-apexcharts';
import fetchDataEntity from '../CRUDENTITY/FetchDataEntity';

const PIEChart = () => {
  const [counts, setCounts] = useState({
    userCount: 0,
    adminCount: 0,
    subAdminCount: 0,
    categoriesCount: 0,
    allProductCount: 0,
    allBrandCount: 0,
});
// console.log(counts)
useEffect(() => {
    const getCounts = async () => {
        const data = await fetchDataEntity();
        console.log(data)
        if (data) setCounts(data);
    };

    getCounts();
}, []);

  return (
    <div>
      <PIECHART
        type="pie"
        width={575}
        height={700}
        series={[ counts.adminCount,
          counts.subAdminCount,
          counts.userCount,
          counts.categoriesCount,
          counts.allProductCount,
          counts.allBrandCount]}
        options={{
          title: { text: 'e-Commerce Dashboard', style: { fontSize: 30 } }, 
          colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
          stroke: { width: 3, curve: 'smooth' },
          fill: { opacity: 1 },
          theme: { mode: 'dark' },
          labels: ['Admin', 'SubAdmin', 'User', 'Categories', 'Products', 'Brands'],
        }}
      />
    </div>
  );
};

export default PIEChart;