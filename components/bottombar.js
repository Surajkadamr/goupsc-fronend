import React from "react";
import Link from "next/link";

function Bottombar() {
  return (
    <div>
      <div className="">
        <section
          id="bottom-navigation"
          className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-gray-50"
        >
          <div id="tabs" className="flex justify-between">
            <Link
              href="/"
              className="w-full focus:text-blue-600 hover:text-blue-600 justify-center inline-block text-center pt-2 pb-1"
            >
              <img className="w-5 m-auto" src="/home.png" alt="" />
              <span className="tab tab-kategori block text-xs">Home</span>
            </Link>
            <Link
              href="/blog"
              className="w-full focus:text-blue-600 hover:text-blue-600 justify-center inline-block text-center pt-2 pb-1"
            >
              <img className="w-5 m-auto" src="/blogging.png" alt="" />
              <span className="tab tab-kategori block text-xs">Blog</span>
            </Link>
            <Link
              href="/testseries"
              className="w-full focus:text-blue-600 hover:text-blue-600 justify-center inline-block text-center pt-2 pb-1"
            >
              <img className="w-5 m-auto" src="/checklist.png" alt="" />
              <span className="tab tab-kategori block text-xs">
                Test-Series
              </span>
            </Link>
            <Link
              href="/notes"
              className="w-full focus:text-blue-600 hover:text-blue-600 justify-center inline-block text-center pt-2 pb-1"
            >
              <img className="w-5 m-auto" src="/pdf.png" alt="" />
              <span className="tab tab-kategori block text-xs">Notes-PDF</span>
            </Link>
            <Link
              href={"/account"}
              className="w-full focus:text-blue-600 hover:text-blue-600 justify-center inline-block text-center pt-2 pb-1"
            >
              <img className="w-5 m-auto" src="/user.png" alt="" />
              <span className="tab tab-kategori block text-xs">Account</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Bottombar;
