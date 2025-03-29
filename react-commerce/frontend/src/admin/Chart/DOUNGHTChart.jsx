import axios from "axios";
import React, { useEffect, useState } from "react";
import DoughnutChart from "react-apexcharts";
import fetchData from "../CRUDENTITY/FetchDataEntity";

const DoughnutChartComponent = () => {
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
      <DoughnutChart
        type="donut"
        width={575}
        height={700}
        series={[
          {
            name: "",
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
          title: { text: "developed by me", style: { fontSize: 30 } },
          colors: ["#ff0000"],
          theme: { mode: "light" },
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
      ></DoughnutChart>
    </div>
  );
};

export default DoughnutChartComponent;
