import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { FaPlus, FaTimes } from "react-icons/fa";
import Sidebar from "../sidebar";
import { useChart } from "../context/ChartContext";

export const Registry = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleCharts, selectedChart } = useChart();
  const [charts, setCharts] = useState([
    {
      id: 1,
      data: {
        title: "Cloud  Risk ",
        series: [
          { name: "Measure", data: [52] },
          { name: "Target", data: [20] },
          { name: "Range1", data: [148] },
          { name: "Range2", data: [14] },
        ],
        categories: ["Metric"],
      },
      options: {
        chart: {
          type: "bar",
          height: 1,
          stacked: true,
          toolbar: { show: false },
        },
        plotOptions: {
          bar: { horizontal: true, barHeight: "25%", borderRadius: 18 },
        },
        xaxis: {
          categories: ["Metric"],
          labels: { formatter: (val) => `${val}` },
        },
        yaxis: { show: false },
        legend: { show: false },
        colors: ["#8884d8", "#82ca9d", "#ff7300", "#bcfc31"],
      },
    },
    {
      id: 2,
      title: "Cloud Status",
      data: {
        series: [
          { name: "Measure", data: [102] },
          { name: "Target", data: [50] },
          { name: "Range1", data: [118] },
          { name: "Range2", data: [140] },
        ],
        categories: ["Metric"],
      },
      options: {
        chart: {
          type: "bar",
          height: 1,
          stacked: true,
          toolbar: { show: false },
        },
        plotOptions: {
          bar: { horizontal: true, barHeight: "25%", borderRadius: 18 },
        },
        xaxis: {
          categories: ["Metric"],
          labels: { formatter: (val) => `${val}` },
        },
        yaxis: { show: false },
        legend: { show: false },
        colors: ["#8884d8", "#82ca9d", "#31bcfc", "#ff7300"],
      },
    },
  ]);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const notificationRef = useRef(null);
  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4">
      <div className="font-bold mb-3 text-xl">Registry Scan :</div>
      <div className="flex flex-col lg:flex-row gap-4 p-4 rounded-3xl bg-gray-400">
        {charts
          .filter((chart) => selectedChart.includes(chart.id))
          .map((chart) => (
            <div
              key={chart.id}
              className="flex-1 border rounded-3xl bg-white p-4 flex flex-col items-center justify-center relative cursor-pointer"
            >
              <div
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => toggleCharts(chart.id)}
              >
                <FaTimes size={16} />
              </div>
              <div className="flex justify-center items-center w-full">
                <Chart
                  options={chart.options}
                  series={chart.data.series}
                  type="bar"
                  height={200}
                  width="100%"
                />
              </div>
            </div>
          ))}
        <div className="flex-1 border h-72 rounded-3xl bg-white p-4 flex flex-col items-center justify-center cursor-pointer ">
          <div
            onClick={toggleSidebar}
            ref={notificationRef}
            className="flex items-center justify-center text-center gap-2 border px-3 py-1 bg-white rounded-lg shadow-md"
          >
            <FaPlus size={24} />
            <span className="text-sm font-medium">Add Widget</span>
          </div>
          <div
            ref={sidebarRef}
            className={`mt-4 ${isOpen ? "block" : "hidden"}`}
          >
            <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};
