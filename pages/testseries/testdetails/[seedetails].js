import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const SeeDetails = () => {
  const router = useRouter();
  const { seedetails } = router.query;
  const [name, setname] = useState("");
  const [paper, setpaper] = useState("");

  useEffect(() => {
    const fetchdetails = async () => {
      let res = await fetch(`https://goupsc-backend.onrender.com/api/seriestests/${seedetails}?populate=*`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer 9a924164aa4f1087c884e81f27984325671c3b6f5e7e17a0229d01f61a074b2533bb1e69cbb1573da9c8c70fc86cd552253667ea449c5b85d39128880fbc97f8629be0bf0c4375d638538a2ec42cbada6728ce5faa603544a36074e43e4d0d60571852a708c6e81ce46d9ceb44968b134d7497a5bdf1af3c17a6d02a274a249e",
        },
      });
      let d = await res.json();
      if(d.data!==null){
        setname(d.data.attributes.title);
        setpaper(d.data.attributes.tests.data);
      }
    };
    fetchdetails();
  }, [seedetails]);

  return (
    <div className="md:m-5">
      <div className="m-5 p-5 shadow-2xl">
        <div className="pricing text-center">
          <p className="text-2xl font-bold m-3">{name} </p>
          <p className="text-xl font-thin mb-3">Price : ₹ 4130.0</p>
          <Link
            href="/testseries"
            className="inline-flex mx-2 items-center px-3 py-2 text-xs md:text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Buy Now
          </Link>
        </div>
        <div className="testdetails text-justify mt-10 md:p-10 p-3">
          <p>
            <span className="block font-semibold my-2">Details : </span> Current
            affairs play a critical role in clearing the prelims stage of the
            civil service examination. Our current affairs test series is a
            dedicated and intensive program subjectively curated to cover the
            development of the current affair in each month comprehensively. The
            Test papers are prepared by thorough research and analysis by our
            academic team to ensure that the most exam centric and probable
            topics are included and that students do not miss anything. Specific
            emphasis is paid to ensuring that different newspapers and magazines
            Like The Hindu, Indian Express, Yojna, Kurukhestra, Down to Earth,
            PIB etc. are covered thoroughly, and that topics are earmarked and
            picked based on the extensive assessment of prior year's UPSC
            question papers.
            <span className="block my-3"> Mode: Online</span>
            Fees: 3500 + GST
          </p>
        </div>
        <div className="testpaper mt-2 md:px-10 px-2 py-2">
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Serial No.
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Test Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {paper.length !== 0 &&
                  paper.map((item, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="py-4 px-6">{item.attributes.title}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeDetails;
