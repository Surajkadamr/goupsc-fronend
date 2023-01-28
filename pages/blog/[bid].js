import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ErrorPage from "next/error";

function Sblog() {
  const router = useRouter();
  const { bid } = router.query;
  const [data, setd] = useState();
  const [err, seterr] = useState();
  useEffect(() => {
    const fetchdetails = async () => {
      if (bid) {
        let res = await fetch(
          `https://goupsc-backend.onrender.com/api/blogs/${bid}?populate=*`,
          {
            method: "GET",
          }
        );
        let d = await res.json();
        console.log(data, d);
        if (d.data !== null) {
          setd(d.data);
        }
        if (d.error) {
          seterr(d);
        }
      }
    };
    fetchdetails();
  }, [bid]);
  return (
    <div>
      {err && err.error && <ErrorPage statusCode={404} />}
      <div className="my-5 mx-10 ">
        <h2 className="m-5 text-2xl text-center font-bold">
          {!err && data && data.attributes.title}
        </h2>
        <p className="text-justify">{!err && data && data.attributes.desc}</p>
      </div>
    </div>
  );
}

export default Sblog;
