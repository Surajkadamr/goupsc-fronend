import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "next/error";


function Result({ token, email }) {
  const router = useRouter();
  const { testid } = router.query;
  const [resultdata, setresultdata] = useState("");
  const [link, setlink] = useState("");
  const [l, setl] = useState(0);
  const [err, seterr] = useState();

  const [na, setna] = useState(0);

  useEffect(() => {
    const fetchdetails = async () => {
      let res = await fetch(
        `https://goupsc-backend.onrender.com/api/answers/${testid}?populate=*`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let d = await res.json();
      if (d.data !== null && d.data.attributes.email === email) {
        setresultdata(d.data.attributes);
        setlink(d.data.id);
        setl(d.data.attributes.answerarray.length);
        for (let i = 0; i < l; i++) {
          if (resultdata.answerarray[i].answerByUser === "notanswered") {
            setna(na + 1);
          }
        }
      } else if(d.error){
        seterr(d);
        toast.error("Method Not Allowed", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    };
    if (testid && token) {
      fetchdetails();
    } else {
      if (!token) {
        toast.error("Method Not Allowed!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setTimeout(() => {
        if (email) {
          router.push("/");
        } else {
          router.push("/login");
        }
      }, 3000);
    }
  }, [testid]);
  const onsubmit = async () => {
    router.push(
      `http://localhost:3000/testseries/viewresults/viewsolution/${link}`
    );
  };
  return (
    <div className="w-full md:w-1/3 mx-auto">
      <ToastContainer />
      {err && err.error && <ErrorPage statusCode={404} />}
      <h2 className=" text-center font-bold text-2xl m-5">Results Page</h2>
      <div className="m-5 p-5 text-xs text-white text-center font-semibold shadow-xl bg-blue-400 rounded-xl">
        <p className="mb-1">Candidate Name : Suraj Kadam R</p>
        <p className="">Exam Name: {resultdata.tname}</p>
      </div>
      <div className="mx-5 p-5 rounded-xl shadow-xl  text-center">
        <h3 className="my-5 text-xl">Your Score</h3>
        <p className="text-3xl">{resultdata.score}</p>
        <p className="text-gray-400 mb-8">out of {l}</p>
        <button
          className="px-5 bg-blue-600 text-white rounded-lg py-2 font-thin text-xs "
          onClick={onsubmit}
        >
          VIEW SOLUTION
        </button>
      </div>
      <div className="m-5 mb-20 p-5 rounded-xl shadow-xl  text-center">
        <h3 className="my-5 text-xl">Report</h3>
        <div>
          <p className="text-3xl ">{l}</p>
          <p className="text-gray-400 mb-8">Questions</p>
        </div>
        <div>
          <p className="text-3xl text-green-500">{resultdata.score}</p>
          <p className="text-gray-400 mb-8">Correct</p>
        </div>
        <div>
          <p className="text-3xl text-red-500">
            {l - resultdata.score - na || 0}
          </p>
          <p className="text-gray-400 mb-8">Incorrect</p>
        </div>
        <div>
          <p className="text-3xl">{na}</p>
          <p className="text-gray-400 mb-8">Not Answered</p>
        </div>
        <div>
          <p className="text-3xl">{resultdata.score}</p>
          <p className="text-gray-400 mb-8">Score</p>
        </div>
      </div>
    </div>
  );
}

export default Result;
