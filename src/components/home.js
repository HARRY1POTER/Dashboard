import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuRefreshCw } from "react-icons/lu";
import Sidebar from "./sidebar";
import { Registry } from "./charts/Registry";
import { CWPP } from "./charts/CWPP";
import { CSPM } from "./charts/CSPM";
export const Home = () => {
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
      <div className="m-4 sm:m-6 md:m-10">
        <div className="flex flex-col md:flex-row items-center justify-between mt-6">
          <div className="text-2xl font-semibold mb-4 md:mb-0">
            CNAPP Dashboard
          </div>
          <div className="flex items-center gap-2">
            <div
              ref={notificationRef}
              onClick={toggleSidebar}
              className="flex items-center gap-2 border px-3 py-1 bg-white rounded-lg shadow-md cursor-pointer"
            >
              <span className="text-sm font-medium">Add Widget</span>
              <FaPlus size={24} />
            </div>
            <div ref={sidebarRef}>
              <Sidebar
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
              />
            </div>
            <div className="flex items-center border px-1 py-1 bg-white rounded-lg shadow-md cursor-pointer">
              <BsThreeDotsVertical size={24} />
            </div>
            <div className="flex items-center border px-1 py-1 bg-white rounded-lg shadow-md cursor-pointer">
              <LuRefreshCw size={24} />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <CSPM />
        </div>
        <div className="mt-10">
          <CWPP />
        </div>
        <div className="mt-10">
          <Registry />
        </div>
      </div>
    </div>
  );
};
