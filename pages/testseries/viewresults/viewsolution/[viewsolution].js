import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "next/error";

function Viewsolution({ token }) {
  const router = useRouter();
  const { viewsolution } = router.query;
  const [count, setcount] = useState(0);
  const [pname, setpname] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [question, setquestion] = useState();
  const [kq, setkq] = useState();
  const [eq, seteq] = useState();
  const [err, seterr] = useState();

  useEffect(() => {
    const kda = async (id) => {
      let resk = await fetch(`https://goupsc-backend.onrender.com/api/test/kannada/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      let dk = await resk.json();
      if (dk.data) {
        setquestion(dk.data);
        setpname(dk.data[0].test.title);
        setkq(dk.data);
      }
    };
    const eda = async (id) => {
      let rese = await fetch(`https://goupsc-backend.onrender.com/api/test/english/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      let de = await rese.json();
      if (de.answer === "found" && de.data) {
        seteq(de.data);
      }
    };
    const fetchdetails = async () => {
      let res = await fetch(
        `https://goupsc-backend.onrender.com/api/answers/${viewsolution}?populate=*`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let d1 = await res.json();
      if (d1.data !== null) {
        setSelectedOptions(d1.data.attributes.answerarray);
        kda(d1.data.attributes.testpid);
        eda(d1.data.attributes.testpid);
      } else if (d1.error) {
        seterr(d1);
        toast.error(d1.error.message, {
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
    };
    if (viewsolution && localStorage.getItem("token")) {
      fetchdetails();
    } else if (!localStorage.getItem("token")) {
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
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  }, [viewsolution]);
  const onnext = () => {
    if (count < question.length - 1) {
      setcount(count + 1);
    }
  };
  const onback = () => {
    if (count >= 0) {
      setcount(count - 1);
    }
  };
  const handleselect = (e) => {
    if (e.target.value === "Kannada") {
      setquestion(kq);
    } else {
      setquestion(eq);
    }
  };
  return (
    <div>
      <ToastContainer />
      {err && err.error && <ErrorPage statusCode={404} />}
      {question && selectedOptions && (
        <div className="select-none">
          <div className="time flex m-3 px-5 py-2 text-xs bg-gray-200 rounded-lg text-center justify-between">
            <p className="m-2">{pname.slice(0, 23)}...</p>
          </div>
          {selectedOptions[count].answerByUser === "notanswered" && (
            <p className="m-3 px-5 py-3 text-xs bg-red-300 rounded-lg">
              Not Answered
            </p>
          )}
          <div className="questiontab my-5 mx-5">
            <div className="flex justify-between mb-4">
              <p className="m-2">Question {count + 1}: </p>
              <select
                onChange={handleselect}
                name="Language"
                defaultValue={"Kannada"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="English">English</option>
                <option value="Kannada">Kannada</option>
              </select>
            </div>{" "}
            <hr className=" h-0.5 bg-gray-200" />
            <div className="question my-4">
              <p className="text-base text-justify">{question[count].qtitle}</p>
            </div>
            <div className="options mt-10">
              <div
                className={`${
                  "op1" === question[count].correctop && "bg-green-400 "
                } ${
                  "op1" !== question[count].correctop &&
                  selectedOptions[count].answerByUser === "op1" &&
                  "bg-red-400"
                } flex items-center my-4  px-2 rounded-xl`}
              >
                <input
                  type="radio"
                  className="w-6 h-6 bg-black"
                  checked={"op1" === selectedOptions[count]?.answerByUser}
                  readOnly
                />
                <label
                  htmlFor="default-radio-1"
                  className="ml-2 text-base p-2 font-medium text-gray-900 dark:text-gray-300"
                >
                  {question[count].op1}
                </label>
              </div>
              <div
                className={`${
                  "op2" === question[count].correctop && "bg-green-500 "
                } ${
                  "op2" !== question[count].correctop &&
                  selectedOptions[count].answerByUser === "op2" &&
                  "bg-red-400"
                } flex items-center my-4  px-2 rounded-xl`}
              >
                <input
                  type="radio"
                  className="w-6 h-6 bg-black"
                  checked={"op2" === selectedOptions[count]?.answerByUser}
                  readOnly
                />
                <label
                  htmlFor="default-radio-1"
                  className="ml-2 text-base p-2 font-medium text-gray-900 dark:text-gray-300"
                >
                  {question[count].op2}
                </label>
              </div>
              <div
                className={`${
                  "op3" === question[count].correctop && "bg-green-400 "
                } ${
                  "op3" !== question[count].correctop &&
                  selectedOptions[count].answerByUser === "op3" &&
                  "bg-red-400"
                }  flex items-center my-4  px-2 rounded-xl`}
              >
                <input
                  type="radio"
                  className="w-6 h-6 bg-black"
                  checked={"op3" === selectedOptions[count]?.answerByUser}
                  readOnly
                />
                <label
                  htmlFor="default-radio-1"
                  className="ml-2 text-base p-2 font-medium text-gray-900 dark:text-gray-300"
                >
                  {question[count].op3}
                </label>
              </div>
              <div
                className={`${
                  "op4" === question[count].correctop && "bg-green-400 "
                } ${
                  "op4" !== question[count].correctop &&
                  selectedOptions[count].answerByUser === "op4" &&
                  "bg-red-400"
                }  flex items-center my-4 px-2 rounded-xl`}
              >
                <input
                  type="radio"
                  className="w-6 h-6 bg-black"
                  checked={"op4" === selectedOptions[count]?.answerByUser}
                  readOnly
                />
                <label
                  htmlFor="default-radio-1"
                  className="ml-2 text-base p-2 font-medium text-gray-900 dark:text-gray-300"
                >
                  {question[count].op4}
                </label>
              </div>
            </div>
            <div className="bottom">
              <div className="">
                <section
                  id="bottom-navigation"
                  className="block fixed inset-x-0 md:bottom-0 bottom-10 z-10 bg-gray-100 py-2 shadow"
                >
                  <div id="tabs" className="flex justify-between px-5">
                    {count === 0 ? (
                      <button
                        onClick={onback}
                        type="button"
                        className="text-white bg-blue-200 hover:bg-blue-300 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        disabled
                      >
                        &#60;&#60; BACK
                      </button>
                    ) : (
                      <button
                        onClick={onback}
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        &#60;&#60; BACK
                      </button>
                    )}
                    {!(count < question.length - 1) ? (
                      <button
                        onClick={() => {
                          router.push(
                            `http://localhost:3000/testseries/viewresults/${viewsolution}`
                          );
                        }}
                        type="button"
                        className="text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        View Results
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={onnext}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        NEXT &#62;&#62;
                      </button>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Viewsolution;
