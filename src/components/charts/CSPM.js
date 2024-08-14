import React, { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { FaPlus, FaTimes } from "react-icons/fa";
import Sidebar from "../sidebar";
import { useChart } from "../context/ChartContext";

export const CSPM = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedCharts, toggleChart } = useChart();

  const [charts] = useState([
    {
      id: 1,
      title: "Cloud Account Risk Assessment",
      series: [1689, 681, 38, 7253],
    },
    { id: 2, title: "Connectivity Status", series: [2, 2] },
  ]);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(updateTotal(charts));
  }, [charts]);

  useEffect(() => {
    setChartData(updateTotal(charts));
  }, [selectedCharts]);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const updateTotal = (charts) => {
    return charts.map((chart) => ({
      ...chart,
      total: chart.series.reduce((acc, val) => acc + val, 0),
    }));
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

  const handleRemoveChart = (id) => {
    toggleChart(id);
  };

  return (
    <div className="p-4">
      <p className="font-bold mb-3">CSPM Executive Dashboard:</p>
      <div className="flex flex-col lg:flex-row gap-4 p-4 rounded-3xl bg-gray-400">
        {chartData
          .filter((chart) => selectedCharts.includes(chart.id))
          .map((chart) => {
            const options = {
              chart: {
                type: "donut",
              },
              labels: chart.series.map((_, i) => `Label ${i + 1}`),
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 200,
                    },
                    legend: {
                      position: "bottom",
                    },
                  },
                },
              ],
              legend: {
                position: "right",
                offsetY: 0,
                fontSize: "14px",
                markers: {
                  width: 10,
                  height: 10,
                  radius: 12,
                },
                itemMargin: {
                  vertical: 5,
                },
              },
              plotOptions: {
                pie: {
                  donut: {
                    size: "70%",
                    labels: {
                      show: true,
                      name: {
                        show: true,
                        fontSize: "16px",
                        fontFamily: "Helvetica, Arial, sans-serif",
                        color: "#373d3f",
                        offsetY: -10,
                        formatter: () => "Total",
                      },
                      value: {
                        show: true,
                        fontSize: "24px",
                        fontFamily: "Helvetica, Arial, sans-serif",
                        color: "#373d3f",
                        offsetY: 10,
                        formatter: () => chart.total,
                      },
                    },
                  },
                },
              },
              dataLabels: {
                enabled: true,
                formatter: (val) => `${val.toFixed(2)}%`,
                dropShadow: {
                  enabled: false,
                },
              },
            };

            return (
              <div
                key={chart.id}
                className="relative flex-1 border rounded-3xl bg-white p-4 "
              >
                <button
                  onClick={() => handleRemoveChart(chart.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <FaTimes size={20} />
                </button>
                <p className="font-bold text-lg mb-2">{chart.title}</p>
                <ReactApexChart
                  options={options}
                  series={chart.series}
                  type="donut"
                  height={250}
                />
              </div>
            );
          })}
        <div className="flex-1 border rounded-3xl bg-white p-4 flex flex-col items-center justify-center cursor-pointer">
          <div
            ref={notificationRef}
            onClick={toggleSidebar}
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
