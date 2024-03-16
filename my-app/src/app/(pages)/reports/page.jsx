"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Reports() {
  const [limit, setLimit] = React.useState(20);
  const [offset, setOffset] = React.useState(0); // (Current page -1 * limit)
  const limitList = [10, 20, 25, 50];
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalCount / limit));
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFetchingInProgress, setDataFetchingInProgress] = useState(false)

  useEffect(() => {
    setTotalPages(Math.ceil(totalCount / limit));
  }, [totalCount]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage]);

  const [data, setData] = React.useState([ //Remove this temp data and replace with empty array
    {
      event_name: "Event 1",
      club_name: "Club A",
      faculty_incharge: "John Doe",
      student_incharge: "Alice",
      view: "link",
    },
    {
      event_name: "Event 2",
      club_name: "Club B",
      faculty_incharge: "Jane Smith",
      student_incharge: "Bob",
      view: "link",
    },
    {
      event_name: "Event 3",
      club_name: "Club C",
      faculty_incharge: "Michael Johnson",
      student_incharge: "Carol",
      view: "link",
    },
  ]);

  const fetchData = () => {
    // Write write to write fetch here
    axios
      .get(`/api/events/reports?offset=${offset}&limit=${limit}`)
      .then((res) => {
        const result = res.data
        // SQL QUERY: select *from report limit (variable of limit => limit) offset (variable of offset=>offset);
        // U can use alias type to get variables in given below specific varible names in object
        // I am expecting an object with the following properties as a response
        // {
        //   code: 1 //Tells status of the event,
        //   message: "Success" //Code and message are optional
        //   data: [
        //   ....
        //     { // I am expecting you to send data object which is an array of objects with the following
        //      event_name: "String",
        //      club_name: "String",
        //      faculty_incharge: "String",
        //      student_incharge: "String",
        //      view: "link",
        //      total_count: "number" //Total number of items in table not in page
        //     }
        //    ....
        //   ]
        // }
        if (result.code == 1) {
          setTotalCount(result.data[0].total_count);
          setData(result.data);
        }
        else {
          //Can show toast to user and navigate them back to home page or else where
        }
      })
      .catch((err) => {
        console.log(err);
        //Can show toast to user and navigate them back to home page or else where
      });
  };

  const handleNextButtonClick = () => {
    setOffset((prevOffset) => prevOffset + limit);
    fetchData();
  };

  const handlePrevButtonClick = () => {
    setOffset((prevOffset) => prevOffset - limit);
    fetchData();
  };

  const handleGoToPage = (page) => {
    if (page == 1)
      setOffset(0)
    else
      setOffset((page - 1) * limit);
    fetchData();
  };

  const handleLimitChange = (value) => {
    setLimit(value)
    fetchData()
  }

  return (
    <body className="reports__body">
      <div className="reports__title">
        <span>Reports</span>
      </div>
      <div className="reports__table_container table-container">
        <table className="custom-table">
          <tr>
            <th className="head__title head__title-1">S.No</th>
            <th className="head__title head__title-2">Event Name</th>
            <th className="head__title head__title-3">Club Name</th>
            <th className="head__title head__title-4">Faculty Incharge</th>
            <th className="head__title head__title-5">Student Incharge</th>
            <th className="head__title head__title-6">{null}</th>
          </tr>
          {!dataFetchingInProgress ? data?.map((event, index) => {
            return (
              <tr className="table__data" key={`${event}-${index}`}>
                <td>{index + 1}</td>
                <td className="event__data event__title">
                  {event["event_name"]}
                </td>
                <td className="event__data event__club">{event.club_name}</td>
                <td className="event__data event__faculty">
                  {" "}
                  {event.faculty_incharge}{" "}
                </td>
                <td className="event__data event__student">
                  {event.student_incharge}
                </td>
                <td className="event__data event__view">
                  <a href={event.view} target="_blank">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="view__symbol"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </a>
                </td>
              </tr>
            );
          }): <span>Loading data ...</span>}
        </table>
      </div>
      <div className="table__footer">
        <div className="table__limit_container">
          <span>Show</span>
          <select
            className="select__dropdown"
            value={limit}
            onChange={(e) => handleLimitChange(e.target.value)}
          >
            {limitList.map((num, index) => {
              return (
                <option value={num} key={num}>
                  {num}
                </option>
              );
            })}
          </select>
          <span>per page</span>
        </div>
        <div className="table__nav_buttons_container">
          <button
            onClick={handlePrevButtonClick}
            disabled={currentPage === 1}
            className="nav__button nav__arrow_button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="prev__nav_icon"
            >
              <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
            </svg>
          </button>
          {totalPages > 0 && currentPage != 1 && (
            <button onClick={()=>handleGoToPage(1)} className="nav__button nav__num_button">1</button>
          )}
          {currentPage != 1 && currentPage != 2 && (
            <span className="prev__signifier">...</span>
          )}
          {
            <button onClick={()=>handleGoToPage(currentPage)} className={`nav__button nav__num_button active__button`}>
              {currentPage}
            </button>
          }
          {totalPages > 0 &&
            currentPage != totalPages - 1 &&
            currentPage != totalPages && (
              <span className="next__signifier">...</span>
            )}
          {totalPages > 1 && currentPage != totalPages && (
            <button onClick={()=>handleGoToPage(totalPages)} className=" nav__button nav__num_button">
              {totalPages}
            </button>
          )}
          <button
            onClick={handleNextButtonClick}
            disabled={currentPage === totalPages}
            className="nav__button nav__arrow_button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="next__nav_icon"
            >
              <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
            </svg>
          </button>
        </div>
      </div>
    </body>
  );
}
