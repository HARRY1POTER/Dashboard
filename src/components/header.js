import React from "react";
import { MdNotificationsActive } from "react-icons/md";
import { useSearch } from "./context/SearchContext";

export const Header = () => {
  const { setSearchQuery } = useSearch();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="bg-white  shadow-md py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <form className="flex items-center space-x-2 flex-grow">
          <div className="relative flex-grow ">
            <label htmlFor="default-search" className="sr-only">
              Search
            </label>
            <div className="absolute inset-y-0  left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block  w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search"
              onChange={handleSearchChange}
            />
          </div>
          <div className="ml-2 flex items-center">
            <MdNotificationsActive className="" size={25} />
          </div>
        </form>
      </div>
    </header>
  );
};
