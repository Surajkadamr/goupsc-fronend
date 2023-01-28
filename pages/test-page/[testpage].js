import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Testpage({ email, token }) {
  const router = useRouter();
  const { testpage } = router.query;
  const [count, setcount] = useState(0);
  const [pname, setpname] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const question = useRef();
  const [kq, setkq] = useState();
  const [eq, seteq] = useState();
  const [timeLeft, setTimeLeft] = useState(); // 600 seconds initial time left (10 minutes)
  const lan = useRef("kannada");
  const handleAnswerOption = (answer) => {
    setSelectedOptions([(selectedOptions[count] = { answerByUser: answer })]);
    setSelectedOptions([...selectedOptions]);
  };
  useEffect(() => {
    const kda = async () => {
      let resk = await fetch(
        `https://goupsc-backend.onrender.com/api/test/kannada/${testpage}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      let dk = await resk.json();
      if (dk.data) {
        question.current = dk.data;
        setpname(dk.data[0].test.title);
        setTimeLeft(dk.data.length * 60);
        setkq(dk.data);
      }
    };
    const eda = async () => {
      let rese = await fetch(
        `https://goupsc-backend.onrender.com/api/test/english/${testpage}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      let de = await rese.json();
      if (de.answer === "found" && de.data) {
        seteq(de.data);
      }
    };
    const fetchdetails = async () => {
      try {
        if (testpage && token) {
          let res4 = await fetch(
            `https://goupsc-backend.onrender.com/api/tests/${testpage}?populate=*`,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
          let d4 = await res4.json();
          let res3 = await fetch(`https://goupsc-backend.onrender.com/api/order/check`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              id: d4.data.attributes.seriestest.data.id,
              email: email,
            }),
          });
          let d2 = await res3.json();
          if (d2.answer === "found" && d2.status === "paid") {
            let res = await fetch(`https://goupsc-backend.onrender.com/api/answer/check`, {
              method: "POST",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                id: testpage,
                email: email,
              }),
            });
            let d = await res.json();
            if (testpage && d.answer !== "found" && token) {
              kda();
              eda();
            } else {
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
                router.push("/");
              }, 3000);
            }
          } else {
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
              router.push("/");
            }, 3000);
          }
        } else {
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
            router.push("/");
          }, 3000);
        }
      } catch (error) {
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
          router.push("/");
        }, 3000);
      }
    };
    fetchdetails();
  }, [testpage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1); // decrement time left by 1 second
    }, 1000);
    if (timeLeft === 0) {
      onsubmit();
      setTimeLeft(0);
      return;
    }

    return () => {
      clearInterval(interval); // clear the interval to stop the countdown
    };
  }, [timeLeft]);

  const onnext = () => {
    if (count < question.current.length - 1) {
      setcount(count + 1);
    }
  };
  const onback = () => {
    if (count >= 0) {
      setcount(count - 1);
    }
  };
  const onsubmit = async () => {
    let ca = 0;
    if (question) {
      for (let i = 0; i < question.current.length; i++) {
        if (!selectedOptions[i]) {
          selectedOptions[i] = { answerByUser: "notanswered" };
        }
        if (question.current[i].correctop === selectedOptions[i].answerByUser) {
          ca = ca + 1;
        }
      }
      let res = await fetch(`https://goupsc-backend.onrender.com/api/answers`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            testpid: testpage,
            answerarray: selectedOptions,
            score: ca,
            tname: pname,
            email: email,
          },
        }),
      });
      let d = await res.json();
      router.push(`http://localhost:3000/testseries/viewresults/${d.data.id}`);
    }
  };
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const handleselect = (e) => {
    lan.current = e.target.value;
    if (lan.current === "Kannada") {
      question.current = kq;
    } else {
      question.current = eq;
    }
  };
  return (
    <div className="select-none">
      <ToastContainer />
      <div className="time flex m-3 px-5 py-2 text-xs bg-gray-200 rounded-lg text-center justify-between">
        <p className="m-2">{pname.slice(0, 23)}...</p>
        <p className="bg-blue-600 text-white py-2 px-5 rounded-full">
          {minutes}:{seconds}
        </p>
      </div>
      {question.current && (
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
          </div>
          <hr className=" h-0.5 bg-gray-200" />
          <div className="question my-4">
            <p className="text-base text-justify">
              {question.current[count].qtitle}
            </p>
          </div>
          <div className="options mt-10">
            <div
              className="flex items-center my-4"
              onClick={(e) => handleAnswerOption("op1")}
            >
              <input
                type="radio"
                className="w-6 h-6 bg-black"
                onChange={(e) => handleAnswerOption("op1")}
                checked={"op1" === selectedOptions[count]?.answerByUser}
              />
              <label
                htmlFor="default-radio-1"
                className="ml-2 text-base font-medium text-gray-900 dark:text-gray-300"
              >
                {question.current[count].op1}
              </label>
            </div>
            <div
              className="flex items-center my-4"
              onClick={(e) => handleAnswerOption("op2")}
            >
              <input
                type="radio"
                className="w-6 h-6 bg-black"
                onChange={(e) => handleAnswerOption("op2")}
                checked={"op2" === selectedOptions[count]?.answerByUser}
              />
              <label
                htmlFor="default-radio-1"
                className="ml-2 text-base font-medium text-gray-900 dark:text-gray-300"
              >
                {question.current[count].op2}
              </label>
            </div>
            <div
              className="flex items-center my-4"
              onClick={(e) => handleAnswerOption("op3")}
            >
              <input
                type="radio"
                className="w-6 h-6 bg-black"
                onChange={(e) => handleAnswerOption("op3")}
                checked={"op3" === selectedOptions[count]?.answerByUser}
              />
              <label
                htmlFor="default-radio-1"
                className="ml-2 text-base font-medium text-gray-900 dark:text-gray-300"
              >
                {question.current[count].op3}
              </label>
            </div>
            <div
              className="flex items-center my-4"
              onClick={(e) => handleAnswerOption("op4")}
            >
              <input
                type="radio"
                className="w-6 h-6 bg-black"
                onChange={(e) => handleAnswerOption("op4")}
                checked={"op4" === selectedOptions[count]?.answerByUser}
              />
              <label
                htmlFor="default-radio-1"
                className="ml-2 text-base font-medium text-gray-900 dark:text-gray-300"
              >
                {question.current[count].op4}
              </label>
            </div>
          </div>
          <div className="bottom">
            <div className="w-full ">
              <section
                id="bottom-navigation"
                className="block fixed inset-x-0 bottom-0 z-10 bg-gray-100 py-2 shadow"
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
                  {!(count < question.current.length - 1) ? (
                    <button
                      type="button"
                      onClick={onsubmit}
                      className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      SUBMIT
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
      )}
      +
    </div>
  );
}

export default Testpage;
