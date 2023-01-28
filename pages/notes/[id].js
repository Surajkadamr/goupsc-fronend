import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import ErrorPage from "next/error";

function Snotes() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setdata] = useState();
  const [err, seterr] = useState();

  useEffect(() => {
    const fetchdetails = async () => {
      if (id) {
        let res = await fetch(`https://goupsc-backend.onrender.com/api/notes/${id}`, {
          method: "GET",
        });
        let d = await res.json();
        if (d.data !== null) {
          setdata(d.data);
        }
        if (d.error) {
          seterr(d);
        }
      }
    };
    fetchdetails();
  }, [id]);
  return (
    <div>
      {err && err.error && <ErrorPage statusCode={404} />}
      {!err && (
        <>
          <h1 className="mt-20 text-center mb-3 text-xl font-bold">
            {data && data.attributes.title}
          </h1>
          <div className="flex justify-center md:mx-52 md:mb-52 mx-32 mb-32">
            <Link
              href={data ? `${data.attributes.DownloadLink}` : "/"}
              className="inline-flex items-center mx-3 px-5 md:px-16 py-3 md:py-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Download
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Snotes;
