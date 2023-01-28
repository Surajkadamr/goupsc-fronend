import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Testc({ title, id, email, home, token, price }) {
  const router = useRouter();
  const [check, setcheck] = useState(false);
  useEffect(() => {
    const check = async () => {
      if (token) {
        let res = await fetch(
          `https://goupsc-backend.onrender.com/api/order/check`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              id: id,
              email: email,
            }),
          }
        );
        let d = await res.json();
        if (d.answer === "found" && d.status === "paid") {
          setcheck(true);
        } else {
          setcheck(false);
        }
      } else {
        setcheck(false);
      }
    };
    check();
  }, []);
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("Script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  const makePayment = async (e) => {
    e.preventDefault();
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    let res1 = await fetch(
      `https://goupsc-backend.onrender.com/api/order/preorder`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          token: token,
          imp: localStorage.getItem("imp"),
          email: email,
          price: price,
          testid: id,
        }),
      }
    );
    let d = await res1.json();
    if (d.id) {
      var options = {
        key: "rzp_live_xuQSaeqS5c2Dzq", // Enter the Key ID generated from the Dashboard
        name: "GO-UPSC Pvt Ltd",
        currency: d.currency,
        amount: d.amount,
        order_id: d.order_id,
        description: "Thankyou",
        image: "https://goupsc.com/img/logo_2x.png",
        handler: async function (response) {
          // Validate payment at server - using webhooks is a better idea.
          // const d1 = { oid: response.razorpay_order_id,pid:response.razorpay_payment_id, response,id:data.id ,sid:response.razorpay_signature };
          let res2 = await fetch(
            `https://goupsc-backend.onrender.com/api/order/postorder`,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                oid: response.razorpay_order_id,
                pid: response.razorpay_payment_id,
                response: response,
                id: d.id,
                sid: response.razorpay_signature,
              }),
            }
          );
          let d1 = await res2.json();
          if (d1.success) {
            toast.success("Payment Successfull!", {
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
              router.push("/testseries");
            }, 3000);
          } else {
            toast.error("Payment Un-Successfull!", {
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
              router.push("/testseries");
            }, 3000);
          }
        },
      };
    } else {
      toast.error("Payment Un-Successfull!", {
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
        router.push("/testseries");
      }, 3000);
    }

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  return (
    <div>
      <ToastContainer />
      <div className="max-w-sm md:mx-auto m-5 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <img
            className="rounded-full h-20 w-20 mx-auto mb-5"
            src="https://vajiramias.com/static/vajiramandravi/images/2131040.svg"
            alt=""
          />
          <h5 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          {!home && (
            <>
              <hr className="bg-gray-200 w-full my-2" />
              <div className="flex my-3 justify-center">
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  LANGUAGE :
                </p>
                <p className=" ml-3 font-normal  text-gray-700 dark:text-gray-400">
                  Kannada,English
                </p>
              </div>
              <hr className="bg-gray-200 w-full my-3" />
              <div className="flex my-3 justify-center">
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Price :
                </p>
                <p className=" ml-2 font-normal  text-gray-700 dark:text-gray-400">
                  ₹{price}
                </p>
              </div>
              <hr className="bg-gray-200 w-full my-3" />
            </>
          )}
          <div className="flex my-5 justify-around">
            {!home && (
              <>
                <Link
                  href={`http://localhost:3000/testseries/testdetails/${id}`}
                  className="inline-flex mx-2 px-3 py-2 text-xs md:text-base font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  See Details
                </Link>
                {!token && (
                  <button
                    onClick={() => {
                      router.push("/login");
                    }}
                    className="inline-flex mx-2 items-center px-4 py-2 text-xs md:text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Buy Now
                  </button>
                )}
                {check && token && (
                  <Link
                    href={`http://localhost:3000/testseries/test-paper/${id}`}
                    className="inline-flex mx-2 items-center px-4 py-2 text-xs md:text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Start Test
                  </Link>
                )}
                {!check && token && (
                  <button
                    onClick={makePayment}
                    className="inline-flex mx-2 items-center px-4 py-2 text-xs md:text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Buy Now
                  </button>
                )}
              </>
            )}
            {home && (
              <Link
                href={`http://localhost:3000/testseries`}
                className="inline-flex mx-2 items-center px-4 py-2 text-xs md:text-base font-medium text-center text-white bg-green-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                See Details
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testc;
