import React, { createContext, useState, useContext } from "react";

const ChartContext = createContext();

export const ChartProvider = ({ children }) => {
  const [selectedCharts, setSelectedCharts] = useState([1, 2]);
  const [selectedChart, setSelectedChart] = useState([1, 2]);

  const toggleChart = (id) => {
    setSelectedCharts((prevSelectedCharts) =>
      prevSelectedCharts.includes(id)
        ? prevSelectedCharts.filter((chartId) => chartId !== id)
        : [...prevSelectedCharts, id]
    );
  };

  const toggleCharts = (id) => {
    setSelectedChart((prevSelectedCharts) =>
      prevSelectedCharts.includes(id)
        ? prevSelectedCharts.filter((chartId) => chartId !== id)
        : [...prevSelectedCharts, id]
    );
  };

  return (
    <ChartContext.Provider
      value={{ selectedCharts, toggleChart, selectedChart, toggleCharts }}
    >
      {children}
    </ChartContext.Provider>
  );
};

export const useChart = () => {
  return useContext(ChartContext);
};
