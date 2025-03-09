import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import ReactApexChart from "react-apexcharts";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getGraph } from "@/network/analytics";
import { Query } from "@/network/constant";

export default function Chart() {
  const [filter, setFilter] = useState<string>("month");
  const { data, isPending } = useQuery({
    queryFn: getGraph,
    queryKey: [Query.GET_GRAPH_QUERY],
  });
  const shipmentGraph =
    data && !("error" in data) && data.data ? data.data : [];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const categories = Object.entries(shipmentGraph).map(([key, value]) => {
    if (typeof key !== "string") return { month: "Unknown", value };
    const monthIndex = monthNames.findIndex(
      (month) => month.toLowerCase() === key.slice(0, 3).toLowerCase() // Match first 3 letters
    );
    return { month: monthNames[monthIndex] || "Unknown", value };
  });
  const seriesData = Object.values(shipmentGraph);
  //   const categories = ["Nov", "Dec"];
  //   const seriesData = [4, 6];
  const isEmpty = categories?.length === 0 || seriesData?.length === 0;
  const maxValue = Math.max(...seriesData);
  const minValue = Math.min(...seriesData);
  const numberOfSteps = 5;
  const stepSize = Math.ceil((maxValue - minValue) / numberOfSteps);
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      width: 100,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    yaxis: {
      show: false,
      stepSize: stepSize,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#2044FF", "rgba(238, 242, 255, 0.1)"],
  };
  const formattedSeriesData = seriesData?.map((amount, index) => ({
    x: categories && categories[index],
    y: amount,
  }));

  if (isPending) {
    return (
      <SkeletonTheme baseColor="#ffffff" highlightColor="#f5f5f5">
        <Skeleton
          style={{
            width: "100%",
            height: "30rem",
            borderRadius: "1rem",
            border: "1px solid #E4E4E7",
          }}
        />
      </SkeletonTheme>
    );
  }
  return (
    <div className="mt-[4rem]">
      <div className="flex justify-between mb-[1rem]">
        <p className="text-[2rem]">Sales History</p>
        <div className={`flex items-center gap-x-[1.5rem]`}>
          <p
            className={`text-[1.5rem] cursor-pointer ${
              filter === "day" && "font-bold"
            }`}
            onClick={() => setFilter("day")}
          >
            Day
          </p>
          <p
            className={`text-[1.5rem] cursor-pointer ${
              filter === "week" && "font-bold"
            }`}
            onClick={() => setFilter("week")}
          >
            Week
          </p>
          <p
            className={`text-[1.5rem] cursor-pointer ${
              filter === "month" && "font-bold"
            }`}
            onClick={() => setFilter("month")}
          >
            Month
          </p>
        </div>
      </div>

      <div className="border-statBorderGrey border-[.1rem] border-solid bg-white rounded-[1rem] p-[1.5rem] w-[100%] h-[30rem] ">
        <div className="flex items-center justify-between"></div>
        <div
          className={` w-[100%] ${
            isEmpty && "h-[31rem] flex justify-center items-center"
          }`}
        >
          {!isEmpty || shipmentGraph.length !== 0 ? (
            <ReactApexChart
              series={[{ name: "Shipment Stat", data: formattedSeriesData }]}
              type="area"
              options={options}
              height="230px"
            />
          ) : (
            <p className="text-black text-[1.4rem] font-[500] text-center italic">
              {data && "error" in data
                ? "Error fetching impressions"
                : "No impresssion yet"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
