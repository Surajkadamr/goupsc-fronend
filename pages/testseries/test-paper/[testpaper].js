import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Testp from "../../../components/testp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "next/error";

function Testpaper({ email, token }) {
  const router = useRouter();
  const { testpaper } = router.query;
  const [name, setname] = useState("");
  const [paper, setpaper] = useState("");
  const [err, seterr] = useState();

  useEffect(() => {
    const fetchdetails = async () => {
      try {
        if (testpaper && localStorage.getItem("token")) {
          let res4 = await fetch(
            `https://goupsc-backend.onrender.com/api/seriestests/${testpaper}`,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
          let d4 = await res4.json();
          if (d4.data.id) {
            let res3 = await fetch(`https://goupsc-backend.onrender.com/api/order/check`, {
              method: "POST",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                id: d4.data.id,
                email: email,
              }),
            });
            let d2 = await res3.json();
            if (d2.answer === "found" && d2.status === "paid") {
              let res = await fetch(
                `https://goupsc-backend.onrender.com/api/seriestests/${testpaper}?populate=*`,
                {
                  method: "GET",
                  headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              let d = await res.json();
              if (d.data !== null) {
                setname(d.data.attributes.title);
                setpaper(d.data.attributes.tests.data);
              } else if (d.error) {
                seterr(d);
                toast.error(d.error.message, {
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
            } else if (!localStorage.getItem("token")) {
              toast.error("Login Required!", {
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
                if (token) {
                  router.push("/");
                } else {
                  router.push("/login");
                }
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
  }, [testpaper]);
  return (
    <div>
      <ToastContainer />
      {err && err.error && <ErrorPage statusCode={404} />}
      {!err &&
        paper.length !== 0 &&
        paper &&
        paper.map((item, index) => (
          <Testp
            key={item.attributes.title}
            name={name}
            title={item.attributes.title}
            id={item.id}
            email={email}
            token={token}
          />
        ))}
    </div>
  );
}

export default Testpaper;
