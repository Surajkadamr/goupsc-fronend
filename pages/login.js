import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const router = useRouter();
    useEffect(() => {
      if (localStorage.getItem("token")) {
        router.push("/");
      }
    }, []);
  const change = (e) => {
    if (e.target.name == "email") {
      setemail(e.target.value);
    } else if (e.target.name == "password") {
      setpassword(e.target.value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const data1 = {
      identifier: email,
      password: password,
    };
    let res = await fetch(`https://goupsc-backend.onrender.com/api/auth/local/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data1),
    });
    const data = await res.json();
    if (!data.error) {
      toast.success("login successfull!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("name", data.user.username);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("imp",data.user.id)
      router.push("/");
    } else {
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
  };

  return (
    <div>
      <ToastContainer />
      <form
        onSubmit={onSubmit}
        className="block shadow-2xl text-left w-full md:w-1/2 lg:w-1/3  mx-auto rounded-xl my-10  md:my-16 py-10 md:px-20 px-10"
      >
        <h1 className="text-3xl mb-8 font-extrabold">
          Sign in to your account
        </h1>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email 
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={change}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@gmail.com"
            required
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
            type="password"
            id="password"
            name="password"
            value={password}
            min={6}
            onChange={change}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Password"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign in to account
        </button>
        <div className="flex text-xs lg:text-base text-gray-500 mt-6">
          Not registered?
          <Link
            className="no-underline border-blue text-blue-600"
            href="/signup"
          >
            <p>&nbsp; Create an account.</p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
