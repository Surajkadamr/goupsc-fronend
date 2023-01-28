import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";

function Testp({ name, title, id, token, email }) {
  const [check, setcheck] = useState(false);
  const [rid, setid] = useState();
  useEffect(() => {
    const check = async () => {
      let res = await fetch(`https://goupsc-backend.onrender.com/api/answer/check`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          id: id,
        }),
      });
      let d = await res.json();
      console.log(d);
      if (d.answer === "found") {
        setcheck(true);
        setid(d.order.id);
      } else {
        setcheck(false);
      }
    };
    check();
  }, []);

  return (
    <div className="max-w-full mx-4 my-3 md:mx-10 p-4 md:p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-5 text-sm md:text-xl py-4 font-bold tracking-tight px-3 rounded-md bg-blue-100 text-gray-900 dark:text-white">
        {name} Test-Series
      </h5>
      <h5 className="mb-2 text-base md:text-xl font-bold tracking-tight px-3 rounded-md text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="mb-1 px-3  font-normal text-gray-700 dark:text-gray-400">
        Language: English/Kannada
      </p>
      <p className="mb-4 px-3 font-normal text-gray-700 dark:text-gray-400">
        Question: 100, Time: 90.0 min
      </p>
      {check === false ? (
        <Link
          href={`/test-page/${id}`}
          className="inline-flex  items-center mx-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Take Test
        </Link>
      ) : (
        <Link
          href={`/testseries/viewresults/${rid}`}
          className="inline-flex  items-center mx-3 px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          View Result
        </Link>
      )}
    </div>
  );
}

export default Testp;
