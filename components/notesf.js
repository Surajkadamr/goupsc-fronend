import React from "react";
import Link from "next/link";
function Notesf({title,MainTitle,id}) {
  return (
    <div>
      <div className="max-w-full mx-4 my-3 md:mx-10 p-4 md:p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-5 text-sm md:text-xl py-4 font-bold tracking-tight px-3 rounded-md bg-blue-100 text-gray-900 dark:text-white">
          {MainTitle}
        </h5>
        <div className="flex justify-between">
          <h5 className="mb-2 text-base md:text-xl font-bold tracking-tight px-3 rounded-md text-gray-900 dark:text-white">
            {title}
          </h5>
          <Link
            href={`/notes/${id}`}
            className="inline-flex  items-center mx-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Notesf;
