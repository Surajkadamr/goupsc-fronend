import React from "react";
import Link from "next/link";
import Script from "next/script";

function Navbar({ check ,token }) {
  return (
    <>
      <nav className="bg-white shadow-lg border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
          <a href="/" className="flex items-center ">
            <img
              src="https://goupsc.com/img/logo_2x.png"
              className="h-6 mr-3 sm:h-9 "
              alt="GO-UPSC Logo"
            />
          </a>
          {check == false && !token && (
            <div className="flex items-center">
              <Link
                href="/signup"
                className="text-xs hover:bg-blue-800 font-medium bg-blue-700 text-white rounded-md px-2 py-2 md:text-sm md:px-4 md:py-2 text-center mx-2 dark:text-blue-500 hover:underline"
              >
                Sign-up
              </Link>
              <Link
                href="/login"
                className="text-xs font-medium hover:bg-blue-800 hover:text-white rounded-md px-2 py-2 md:text-sm md:px-4 md:py-2  text-center ml-2 border-gray-300 border-2 text-blue-600 dark:text-blue-500 hover:underline"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>
      {check === false && (
        <nav className="bg-gray-50 dark:bg-gray-700 hidden md:block">
          <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
            <div className="flex items-center">
              <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
                <li>
                  <Link
                    href="/"
                    className="text-gray-600 dark:text-white hover:underline"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-600 dark:text-white hover:underline"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/testseries"
                    className="text-gray-600 dark:text-white hover:underline"
                  >
                    Test-Series
                  </Link>
                </li>
                <li>
                  <Link
                    href="/notes"
                    className="text-gray-600 dark:text-white hover:underline"
                  >
                    Notes-PDF
                  </Link>
                </li>
                <li>
                  <Link
                    href="account"
                    className="text-gray-600 dark:text-white hover:underline"
                  >
                    Account
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
