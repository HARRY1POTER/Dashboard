import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useChart } from "./context/ChartContext";

const Sidebar = ({ isOpen, onClose }) => {
  const { selectedCharts, toggleChart, selectedChart, toggleCharts } =
    useChart();

  const [activeSection, setActiveSection] = useState(null);

  const handleSectionClick = (section) => {
    setActiveSection(section === activeSection ? null : section);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className={`fixed inset-y-0 right-0 w-[23rem] lg:w-[35rem] bg-white s transition-transform duration-500 ease-in-out transform z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-4 bg-blue-800 px-8 py-4">
          <h2 className="text-white text-2xl font-bold">Add Widget</h2>
          <button
            onClick={onClose}
            className="text-white"
            aria-label="Close sidebar"
          >
            <IoCloseSharp size={25} />
          </button>
        </div>
        <div className="px-8 py-4">
          <p className="mb-2 font-semibold">
            Personalise Your dashboard by adding the folloing widget
          </p>
          <div className="text-black mb-4 flex gap-5">
            <div
              className={`cursor-pointer ${
                activeSection === "CSPM"
                  ? "font-bold border-b border-black"
                  : ""
              }`}
              onClick={() => handleSectionClick("CSPM")}
            >
              CSPM
            </div>
            <div
              className={`cursor-pointer ${
                activeSection === "Registry"
                  ? "font-bold border-b border-black"
                  : ""
              }`}
              onClick={() => handleSectionClick("Registry")}
            >
              Registry
            </div>
            <div
              className={`cursor-pointer ${
                activeSection === "Image"
                  ? "font-bold border-b border-black"
                  : ""
              }`}
              onClick={() => handleSectionClick("Image")}
            >
              Image
            </div>
            <div
              className={`cursor-pointer ${
                activeSection === "Ticket"
                  ? "font-bold border-b border-black"
                  : ""
              }`}
              onClick={() => handleSectionClick("Ticket")}
            >
              Ticket
            </div>
          </div>

          {activeSection === "CSPM" && (
            <div className="text-black mb-4 flex flex-col space-y-3">
              <label className="flex items-center gap-2 border p-2">
                <input
                  type="checkbox"
                  checked={selectedCharts.includes(1)}
                  onChange={() => toggleChart(1)}
                />
                Cloud Account Risk Assessment
              </label>
              <label className="flex items-center gap-2 border p-2">
                <input
                  type="checkbox"
                  checked={selectedCharts.includes(2)}
                  onChange={() => toggleChart(2)}
                />
                Connectivity Status
              </label>
            </div>
          )}

          {activeSection === "Registry" && (
            <div className="text-black mb-4 flex flex-col space-y-3">
              <label className="flex items-center gap-2 border p-2">
                <input
                  type="checkbox"
                  checked={selectedChart.includes(1)}
                  onChange={() => toggleCharts(1)}
                />
                Cloud Risk
              </label>
              <label className="flex items-center gap-2 border p-2">
                <input
                  type="checkbox"
                  checked={selectedChart.includes(2)}
                  onChange={() => toggleCharts(2)}
                />
                Cloud Status
              </label>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
