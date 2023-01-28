import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function Signup() {
  const [first, setfirst] = useState(false);
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [phone, setphone] = useState();
  const router = useRouter();
    useEffect(() => {
      if(localStorage.getItem("token")){
        router.push("/")
      }
    }, [])
  const onchange = () => {
    if (first === true) {
      setfirst(false);
    } else {
      setfirst(true);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const data1 = {
      email: email,
      username: name,
      PhoneNumber: phone,
      password: password,
    };
    let res = await fetch(`https://goupsc-backend.onrender.com/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data1),
    });
    const data = await res.json();
    console.log(data);
    if (!data.error) {
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("name", data.user.username);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("imp",data.user.id)
      toast.success("sign-up successfull!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/");
    }else {
      if ("This attribute must be unique"===data.error.message) {
        toast.error("Phone number already taken!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }else{
      toast.error(data.error.message, {
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
  }
  };
  const change = (e) => {
    if (e.target.name == "name") {
      setname(e.target.value);
    } else if (e.target.name == "email") {
      setemail(e.target.value);
    } else if (e.target.name == "password") {
      setpassword(e.target.value);
    } else if (e.target.name == "phone") {
      setphone(e.target.value);
    }
  };
  return (
    <div>
      <ToastContainer />
      <form
        onSubmit={onSubmit}
        className="block shadow-2xl text-left w-full md:w-1/2 lg:w-2/5 mx-auto rounded-xl md:my-16 mb-5 py-5 md:py-10 md:px-20 px-10"
      >
        <h1 className="text-xl md:text-3xl md:m-5 my-5 font-extrabold text-center">
          Create an account
        </h1>
        <div className="mb-3">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your name
          </label>
          <input
            onChange={change}
            type="text"
            id="name"
            name="name"
            value={name || ""}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Your name"
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            onChange={change}
            type="email"
            id="email"
            name="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            value={email || ""}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="phoneno"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone Number
          </label>
          <input
            onChange={change}
            type="phone"
            id="phone"
            name="phone"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="9999999999"
            value={phone || ""}
            required
            min={10}
            maxLength={10}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            onChange={change}
            name="password"
            type="password"
            id="password"
            value={password || ""}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Password"
            required
            min={6}
          />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              onChange={onchange}
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="terms"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
          </label>
        </div>
        {first ? (
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create an account
          </button>
        ) : (
          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 cursor-not-allowed dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Create an account
          </button>
        )}
        <div className="flex text-xs text-gray-500 mt-6">
          Already have an account ?
          <Link
            className="no-underline border-blue text-blue-600"
            href="/login"
          >
            <p>&nbsp; Login here.</p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
