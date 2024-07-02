import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataItems,
  setCurrentPage,
  setItemsPerPage,
  setSearchTerm,
} from "@store/data";
import { RootState } from "@store/store";
import { DataItem } from "@/types/DataItem";
import useDebounce from "@hooks/debounce";

const DataTable: React.FC = () => {
  const dispatch = useDispatch();
  const { dataItems, currentPage, itemsPerPage, searchTerm } = useSelector(
    (state: RootState) => state.data
  );

  const [searchInput, setSearchInput] = useState(searchTerm);
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  useEffect(() => {
    const newData = generateDataItems(1000);
    dispatch(setDataItems(newData));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSearchTerm(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  const processedItems = (() => {
    const searchTermLower = searchTerm.toLowerCase();
    const filteredItems = dataItems.filter((item) => {
      const numberMatch = item.number.toString().includes(searchTerm);
      const idMatch = item.id.toString().includes(searchTerm);
      const valueMatch = item.value.toLowerCase().includes(searchTermLower);
      return numberMatch || idMatch || valueMatch;
    }) as DataItem[];

    return (searchTerm ? filteredItems : filteredItems.slice(
      (currentPage - 1) * itemsPerPage,
      (currentPage - 1) * itemsPerPage + itemsPerPage
    )) as DataItem[];
  })();

  const total = processedItems.reduce((acc, item) => acc + item.number, 0);

  const totalItems = dataItems.reduce((acc, item) => acc + item.number, 0);

  const totalPages = searchTerm ? Math.ceil(processedItems.length / itemsPerPage) : Math.ceil(dataItems.length / itemsPerPage);

  const getPageNumbers = () => {
    const delta = 2;
    const left = currentPage - delta;
    const right = currentPage + delta + 1;
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i < right)) {
        range.push(i);
      }
    }

    let previousNumber: number | undefined;

    range.forEach((currentNumber: number | string) => {
      if (typeof currentNumber === "number" && previousNumber !== undefined) {
        if (currentNumber - previousNumber === 2) {
          rangeWithDots.push(previousNumber + 1);
        } else if (currentNumber - previousNumber !== 1) {
          rangeWithDots.push("...");
        }
      }

      rangeWithDots.push(currentNumber);

      if (typeof currentNumber === "number") {
        previousNumber = currentNumber;
      }
    });

    return rangeWithDots;
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setItemsPerPage(Number(e.target.value)));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-center relative overflow-x-auto mt-10">
        <div className="w-[980px]">
          <input
            type="text"
            placeholder="Filter items..."
            value={searchInput}
            onChange={handleSearchChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <div className="flex justify-center relative overflow-x-auto mt-10">
        <table className="w-[980px] text-sm text-gray-500 dark:text-gray-400 sm:rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Value
              </th>
              <th scope="col" className="px-6 py-3">
                Number
              </th>
            </tr>
          </thead>
          <tbody>
            {processedItems.map((item: DataItem) => (
              <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {item.id}
                </th>
                <td className="px-6 py-4 text-center">{item.value}</td>
                <td className="px-6 py-4 text-center">{item.number}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={2} className="py-4">
                <h3>Total on this Page</h3>
              </td>
              <td className="text-center">{new Intl.NumberFormat().format(total)}</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <h3 className="text-md font-bold">Grand Total</h3>
              </td>
              <td className="text-center font-bold">{new Intl.NumberFormat().format(totalItems)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-center relative overflow-x-auto mt-10">
        <div className="flex w-[980px] mb-4">
          <div className="w-1/2">
            <nav aria-label="Page navigation">
              <ul className="flex items-center -space-x-px h-10 text-base">
                <li>
                  <button
                    className="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <svg
                      className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 5H1m0 0 4 4M1 5l4-4"
                      />
                    </svg>
                    Previous
                  </button>
                </li>
                {getPageNumbers().map((pageNumber, index) => (
                  <li key={index}>
                    <a
                      onClick={() =>
                        typeof pageNumber === "number" &&
                        handlePageChange(pageNumber)
                      }
                      className={`
                        flex items-center justify-center px-4 h-10 leading-tight text-gray-500
                        border border-gray-300 hover:bg-gray-100 hover:text-gray-700 
                        dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 
                        dark:hover:text-white cursor-pointer 
                        ${
                          pageNumber === currentPage
                            ? " active bg-blue-200"
                            : "bg-white"
                        }
                    `}
                    >
                      {pageNumber}
                    </a>
                  </li>
                ))}

                <li>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center px-4 h-10 ms-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                    <svg
                      className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="w-1/2 flex">
            <div className="w-1/3"></div>
            <div className="w-2/3 flex float-right">
              <label className="w-3/4"> </label>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                id="pages"
                className="w-3/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Generates a large array of data items for demonstration purposes
const generateDataItems = (count: number): DataItem[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    value: `Item ${index}`,
    number: Math.floor(Math.random() * 100) * 2,
  }));
};

export default DataTable;
