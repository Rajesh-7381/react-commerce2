import axios from "axios";
import React, { useEffect, useState } from "react";
import AREAChart from "react-apexcharts";
import fetchData from "../CRUDENTITY/FetchDataEntity";

const AreaChart = () => {
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
      const data = await fetchData();
      if (data) setCounts(data);
    };

    getCounts();
  }, []);
  return (
    <div>
      <AREAChart
        type="area"
        width={575}
        height={700}
        series={[
          {
            name: "e-com",
            data: [
              counts.adminCount,
              counts.subAdminCount,
              counts.userCount,
              counts.categoriesCount,
              counts.allProductCount,
              counts.allBrandCount,
            ],
          },
        ]}
        options={{
          title: { text: "Area Chart", style: { fontSize: 30 } },
          colors: ["#ff0000"],
          stroke: { width: 3, curve: "smooth" },
          // fill:{opacity:1,type:'solid'},
          fill: { opacity: 1 },
          theme: { mode: "dark" },
          xaxis: {
            tickPlacement: "on",
            categories: [
              "Admin",
              "SubAdmin",
              "User",
              "Categories",
              "Products",
              "Brands",
            ],
            title: {
              text: "e-Commerce",
              style: { color: "#FFFF00", fontSize: 30 },
            },
          },
        }}
      ></AREAChart>
    </div>
  );
};

export default AreaChart;
