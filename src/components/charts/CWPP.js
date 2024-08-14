import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Sidebar from "../sidebar";
import graph from "../../graph.svg";

export const CWPP = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    <div>
      <div className="font-bold mb-3">CWPP Dashboard :</div>
      <div className="flex flex-col lg:flex-row gap-4 p-4 rounded-3xl bg-gray-400">
        <div className="flex-1 border rounded-3xl bg-white p-4 flex flex-col items-center justify-center cursor-pointer ">
          <div className="flex justify-center items-center">
            <img src={graph} alt="chart" className="h-16 w-16" height={50} />
          </div>
          <div className="mt-5 text-center">
            <p className="font-bold text-4x">No graph data available!</p>
          </div>
        </div>
        <div className="flex-1 border rounded-3xl bg-white p-4 flex flex-col items-center justify-center cursor-pointer">
          <div className="flex justify-center items-center">
            <img src={graph} alt="chart" className="h-16 w-16" height={50} />
          </div>
          <div className="mt-5 text-center">
            <p className="font-bold text-4x">No graph data available!</p>
          </div>
        </div>

        <div className="flex-1 border h-72 rounded-3xl bg-white p-4 flex flex-col items-center justify-center cursor-pointer">
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
